import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseAppRoute,
  buildAppRoutePath,
  evaluateStudentAnswer,
  estimateCambridgeGrade,
  parsePapaCambridgeFilename,
  parsePaperReference,
  extractWeakTopicsFromResults,
  findMatchingSyllabusTopics,
} from './examLogic';
import {
  buildGoogleDocsViewerUrl,
  FALLBACK_SESSIONS,
  generateSessionPaperFallback,
  isAllowedPapaCambridgePdfUrl,
  parsePapersFromHtml,
  parseSessionsFromHtml,
  resolvePdfIframeUrl,
} from './papacambridge';
import { SYLLABUS_0580, ALL_SUBTOPICS_0580 } from '../data/syllabus0580';
import { PRACTICE_QUESTION_BANK } from '../data/practiceBank';
import { generateMockExamQuestions } from './questionGenerator';
import {
  countTotalStrokes,
  createInitialAnnotationHistory,
  eraseStrokesNearPoint,
  hasPdfHeader,
  normalizePointerToPage,
  parseAnnotationsJson,
  pushAnnotationHistory,
  redoAnnotationHistory,
  undoAnnotationHistory,
  type AnnotationStroke,
} from './pdfAnnotations';
import { handleApiRequest } from './workerApi';

test('parseAppRoute handles root /, exact notes/0580/1/1.16, and other routes', () => {
  assert.deepEqual(parseAppRoute('/'), {
    view: 'notes',
    chapterId: 1,
    topicId: '1.1',
  });
  assert.deepEqual(parseAppRoute('/notes/0580/1/1.16'), {
    view: 'notes',
    chapterId: 1,
    topicId: '1.16',
  });
  assert.deepEqual(parseAppRoute('/notes/0580/6/6.5/'), {
    view: 'notes',
    chapterId: 6,
    topicId: '6.5',
  });
  assert.deepEqual(parseAppRoute('/past-papers/0580/2024-may-june'), {
    view: 'past-papers',
    sessionSlug: '2024-may-june',
    paperFilename: undefined,
  });
  assert.deepEqual(
    parseAppRoute('/past-papers/0580/2024-may-june', '?paper=0580_s24_qp_42.pdf'),
    {
      view: 'past-papers',
      sessionSlug: '2024-may-june',
      paperFilename: '0580_s24_qp_42.pdf',
    }
  );
  assert.deepEqual(parseAppRoute('/practice/0580/mock-extended'), {
    view: 'practice',
    mode: 'mock-extended',
    topicId: undefined,
  });
});

test('buildAppRoutePath serializes routes cleanly', () => {
  assert.equal(
    buildAppRoutePath({ view: 'notes', chapterId: 1, topicId: '1.16' }),
    '/notes/0580/1/1.16'
  );
  assert.equal(
    buildAppRoutePath({ view: 'past-papers', sessionSlug: '2024-may-june' }),
    '/past-papers/0580/2024-may-june'
  );
  assert.equal(
    buildAppRoutePath({
      view: 'past-papers',
      sessionSlug: '2024-may-june',
      paperFilename: '0580_s24_qp_42.pdf',
    }),
    '/past-papers/0580/2024-may-june?paper=0580_s24_qp_42.pdf'
  );
});

test('evaluateStudentAnswer handles currency, fractions, and numeric tolerances', () => {
  assert.equal(
    evaluateStudentAnswer('$140.22', {
      questionType: 'numeric',
      correctAnswer: '140.22',
      numericAnswer: 140.22,
      tolerance: 0.02,
    }),
    true
  );
  assert.equal(
    evaluateStudentAnswer('4/11', {
      questionType: 'text',
      correctAnswer: '4/11',
      acceptedAnswers: ['4/11'],
      numericAnswer: 4 / 11,
      tolerance: 0.0001,
    }),
    true
  );
  assert.equal(
    evaluateStudentAnswer('0.16', {
      questionType: 'text',
      correctAnswer: '4/25',
      acceptedAnswers: ['4/25', '0.16'],
      numericAnswer: 0.16,
      tolerance: 0.001,
    }),
    true
  );
  assert.equal(
    evaluateStudentAnswer('999', {
      questionType: 'numeric',
      correctAnswer: '140.22',
      numericAnswer: 140.22,
      tolerance: 0.02,
    }),
    false
  );
});

test('estimateCambridgeGrade reflects Extended A*-U and Core C-U tiers', () => {
  assert.equal(estimateCambridgeGrade(90, 100, 'Extended').grade, 'A*');
  assert.equal(estimateCambridgeGrade(75, 100, 'Extended').grade, 'A');
  assert.equal(estimateCambridgeGrade(80, 100, 'Core').grade, 'C');
  assert.equal(estimateCambridgeGrade(10, 100, 'Core').grade, 'U');
});

test('parsePapaCambridgeFilename classifies QP, MS, ER, GT and Core/Extended papers', () => {
  const qp = parsePapaCambridgeFilename(
    '0580_s24_qp_12.pdf',
    'https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0580_s24_qp_12.pdf',
    '2024-may-june'
  );
  assert.equal(qp.docType, 'QP');
  assert.equal(qp.paperNumber, '1');
  assert.equal(qp.variant, '2');
  assert.equal(qp.tier, 'Core');

  const ms = parsePapaCambridgeFilename(
    '0580_w23_ms_42.pdf',
    'https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0580_w23_ms_42.pdf',
    '2023-oct-nov'
  );
  assert.equal(ms.docType, 'MS');
  assert.equal(ms.paperNumber, '4');
  assert.equal(ms.tier, 'Extended');
  const ms2005 = parsePapaCambridgeFilename(
    '0580_s05_qp_1.pdf',
    'https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0580_s05_qp_1.pdf',
    '2005-may-june'
  );
  assert.equal(ms2005.docType, 'QP');
  assert.equal(ms2005.paperNumber, '1');
  assert.equal(ms2005.variant, '-');
  assert.equal(ms2005.tier, 'Core');
});

test('All 9 chapters and 72 syllabus subtopics of 0580 have complete, honest study notes', () => {
  assert.equal(SYLLABUS_0580.length, 9);
  assert.equal(ALL_SUBTOPICS_0580.length, 72);

  for (const topic of ALL_SUBTOPICS_0580) {
    assert.ok(topic.title.length > 0, `Missing title on ${topic.id}`);
    assert.ok(topic.coursebookRef, `Missing coursebookRef on ${topic.id}`);
    assert.ok(
      topic.coursebookRef.unit >= 1 && topic.coursebookRef.unit <= 6,
      `Invalid Coursebook unit ${topic.coursebookRef.unit} on ${topic.id}`
    );
    assert.ok(
      topic.coursebookRef.chapter >= 1 && topic.coursebookRef.chapter <= 24,
      `Invalid Coursebook chapter ${topic.coursebookRef.chapter} on ${topic.id}`
    );
    assert.ok(
      topic.coursebookRef.sections.length > 5,
      `Missing Coursebook sections on ${topic.id}`
    );
    assert.ok(
      topic.coursebookTip && topic.coursebookTip.length > 20,
      `Missing coursebookTip on ${topic.id}`
    );
    assert.ok(
      topic.fastForward && topic.fastForward.length > 20,
      `Missing fastForward on ${topic.id}`
    );
    assert.ok(topic.bigIdea && topic.bigIdea.length > 20, `Missing bigIdea on ${topic.id}`);
    assert.ok(
      topic.stepByStepMethod && topic.stepByStepMethod.length >= 3,
      `Expected >=3 stepByStepMethod items on ${topic.id}`
    );
    assert.ok(
      topic.comparisonTable &&
        topic.comparisonTable.headers.length >= 2 &&
        topic.comparisonTable.rows.length >= 2,
      `Missing comparisonTable on ${topic.id}`
    );
    assert.ok(
      topic.rapidSummary && topic.rapidSummary.length >= 2,
      `Expected >=2 rapidSummary rows on ${topic.id}`
    );
    assert.ok(topic.coreObjectives.length > 0, `Missing objectives on ${topic.id}`);
    assert.ok(topic.keyFormulas.length > 0, `Missing keyFormulas on ${topic.id}`);
    assert.ok(topic.studyNotes.length >= 2, `Expected >=2 studyNotes sections on ${topic.id}`);
    assert.ok(topic.workedExamples.length >= 2, `Expected >=2 workedExamples on ${topic.id}`);
    assert.ok(topic.quickCheck.prompt.length > 0, `Missing quickCheck on ${topic.id}`);
    assert.ok(
      typeof topic.quickCheck.marks === 'number' && topic.quickCheck.marks >= 1,
      `Missing quickCheck marks on ${topic.id}`
    );
    assert.ok(
      topic.quickCheck.paperType === 'Calculator' ||
        topic.quickCheck.paperType === 'Non-Calculator',
      `Missing quickCheck paperType on ${topic.id}`
    );

    if (topic.quickCheck.paperCode) {
      const parsed = parsePaperReference(topic.quickCheck.paperCode);
      assert.ok(parsed, `Invalid paperCode ${topic.quickCheck.paperCode} on ${topic.id}`);
      if (topic.tier === 'Extended') {
        assert.equal(
          parsed.tier,
          'Extended',
          `Extended topic ${topic.id} used Core paper ${topic.quickCheck.paperCode}`
        );
      }
      assert.ok(
        FALLBACK_SESSIONS.some((s) => s.slug === parsed.sessionSlug),
        `Session ${parsed.sessionSlug} missing from Past Papers catalog for ${topic.id}`
      );
    }
  }

  // Verify no fabricated paper code on Topic 1.1 and Morrison & Hamshaw textbook alignment details
  const t11 = ALL_SUBTOPICS_0580.find((t) => t.id === '1.1');
  assert.ok(t11);
  assert.equal(t11.quickCheck.paperCode, undefined);
  assert.equal(t11.coursebookRef?.chapter, 1);
  assert.match(t11.studyNotes.map((s) => s.body + (s.bullets || []).join(' ')).join(' '), /Natural numbers/i);

  const t19 = ALL_SUBTOPICS_0580.find((t) => t.id === '1.9');
  assert.ok(t19);
  assert.equal(t19.coursebookRef?.chapter, 1);
  assert.match(t19.coursebookRef?.sections ?? '', /1\.7 Rounding numbers/i);

  const t118 = ALL_SUBTOPICS_0580.find((t) => t.id === '1.18');
  assert.ok(t118);
  assert.equal(t118.coursebookRef?.chapter, 9);
  assert.ok(t118.coursebookRef?.editionNote);

  const t212 = ALL_SUBTOPICS_0580.find((t) => t.id === '2.12');
  assert.ok(t212);
  assert.match(t212.studyNotes.map((s) => s.body + (s.bullets || []).join(' ')).join(' '), /derived[- ]function/i);

  const t213 = ALL_SUBTOPICS_0580.find((t) => t.id === '2.13');
  assert.ok(t213);
  assert.match(t213.studyNotes.map((s) => s.body + (s.bullets || []).join(' ')).join(' '), /domain.*range|range.*domain/i);

  const t96 = ALL_SUBTOPICS_0580.find((t) => t.id === '9.6');
  assert.ok(t96);
  assert.match(t96.summary + ' ' + t96.studyNotes.map((s) => s.body).join(' '), /box-and-whisker/i);

  const serializedAll = JSON.stringify(SYLLABUS_0580);
  assert.equal(/shinglee/i.test(serializedAll), false, 'Should not contain stale Shinglee references');
  assert.equal(/hodder/i.test(serializedAll), false, 'Should not contain Hodder references');
});

test('Practice bank questions span all 9 chapters', () => {
  const chaptersCovered = new Set(PRACTICE_QUESTION_BANK.map((q) => q.chapterId));
  assert.equal(chaptersCovered.size, 9);
});

test('extractWeakTopicsFromResults groups missed questions by topic ordered by marks lost', () => {
  const weak = extractWeakTopicsFromResults(
    [
      {
        question: { chapterId: 4, topicId: '4.6', topicTitle: 'Angles', marks: 2, sourceRef: '0580/11/M/J/24' },
        isCorrect: false,
        marksEarned: 0,
      },
      {
        question: { chapterId: 9, topicId: '9.7', topicTitle: 'Histograms', marks: 4, sourceRef: '0580/43/O/N/24' },
        isCorrect: false,
        marksEarned: 0,
      },
      {
        question: { chapterId: 1, topicId: '1.16', topicTitle: 'Money', marks: 3, sourceRef: '0580/32/M/J/24' },
        isCorrect: true,
        marksEarned: 3,
      },
    ],
    SYLLABUS_0580
  );

  assert.equal(weak.length, 2);
  assert.equal(weak[0].topicId, '9.7');
  assert.equal(weak[0].marksLost, 4);
  assert.equal(weak[0].chapterTitle, 'Statistics');
  assert.equal(weak[1].topicId, '4.6');
  assert.equal(weak[1].marksLost, 2);
  assert.equal(weak[1].chapterTitle, 'Geometry');
});

test('findMatchingSyllabusTopics maps polygon and statistic queries to exact 0580 notes', () => {
  const polyMatches = findMatchingSyllabusTopics('polygon', SYLLABUS_0580);
  assert.ok(polyMatches.length > 0);
  assert.ok(polyMatches.some((m) => m.topic.id === '4.6'));

  const statMatches = findMatchingSyllabusTopics('Statistic', SYLLABUS_0580);
  assert.ok(statMatches.length >= 5);
  assert.ok(statMatches.every((m) => m.chapterId === 9));
});

test('PapaCambridge utilities parse HTML sessions/papers, enforce safe PDF URLs, and provide static fallback', () => {
  assert.ok(FALLBACK_SESSIONS.length >= 15);
  const fallbackPapers = generateSessionPaperFallback('2024-may-june');
  assert.ok(fallbackPapers.length >= 26);
  assert.ok(fallbackPapers.some((p) => p.filename === '0580_s24_qp_42.pdf'));
  assert.ok(fallbackPapers.some((p) => p.filename === '0580_s24_ms_42.pdf'));

  const sampleSessionHtml = `
    <a href="https://pastpapers.papacambridge.com/papers/caie/igcse-mathematics-0580-2025-may-june">May June 2025</a>
    <a href="/papers/caie/igcse-mathematics-0580-syllabus">Syllabus</a>
  `;
  const parsedSessions = parseSessionsFromHtml(sampleSessionHtml);
  assert.equal(parsedSessions.length, 1);
  assert.equal(parsedSessions[0].slug, '2025-may-june');

  const samplePaperHtml = `
    <a href="https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0580_s25_qp_22.pdf">QP</a>
    <a href="https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0695_s25_qp_01.pdf">Other</a>
    <a href="https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/wjec+gcse+spanish.pdf">Other2</a>
  `;
  const parsedPapers = parsePapersFromHtml(samplePaperHtml, '2025-may-june');
  assert.equal(parsedPapers.length, 1);
  assert.equal(parsedPapers[0].paperNumber, '2');
  assert.equal(parsedPapers[0].filename, '0580_s25_qp_22.pdf');

  const nov2002Fallback = generateSessionPaperFallback('2002-nov');
  assert.ok(nov2002Fallback.some((p) => p.filename === '0580_w02_qp_1.pdf'));

  assert.ok(
    isAllowedPapaCambridgePdfUrl(
      'https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0580_s24_qp_12.pdf'
    )
  );
  assert.equal(isAllowedPapaCambridgePdfUrl('https://evil.example.com/test.pdf'), null);
  assert.equal(isAllowedPapaCambridgePdfUrl('http://pastpapers.papacambridge.com/test.pdf'), null);

  const samplePdf =
    'https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0580_s19_qp_11.pdf';
  assert.equal(
    buildGoogleDocsViewerUrl(samplePdf),
    `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(samplePdf)}`
  );
  assert.equal(
    resolvePdfIframeUrl(samplePdf, { apiProxyAvailable: true, viewerMode: 'proxy' }),
    `/api/papacambridge/pdf?url=${encodeURIComponent(samplePdf)}`
  );
  assert.equal(
    resolvePdfIframeUrl(samplePdf, { apiProxyAvailable: false, viewerMode: 'proxy' }),
    `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(samplePdf)}`
  );
  assert.equal(FALLBACK_SESSIONS.some((s) => s.slug === '2002-may-june'), false);
  assert.ok(FALLBACK_SESSIONS.some((s) => s.slug === '2002-nov'));
  assert.ok(FALLBACK_SESSIONS.some((s) => s.slug === '2010-jun'));
  assert.ok(FALLBACK_SESSIONS.some((s) => s.slug === 'may-june-2020'));
  assert.ok(FALLBACK_SESSIONS.some((s) => s.slug === '2026-may-june'));
  const pre2010 = generateSessionPaperFallback('2005-jun');
  assert.ok(pre2010.some((p) => p.filename === '0580_s05_qp_1.pdf' && p.variant === '-'));
  assert.ok(pre2010.some((p) => p.filename === '0580_s05_ms_4.pdf' && p.variant === '-'));
  assert.ok(pre2010.some((p) => p.filename === '0580_s05_er.pdf'));
  assert.equal(pre2010.some((p) => p.docType === 'GT'), false);

  assert.equal(
    resolvePdfIframeUrl(samplePdf, { apiProxyAvailable: true, viewerMode: 'web' }),
    `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(samplePdf)}`
  );
});

test('generateMockExamQuestions generates valid multi-type papers and avoids repeats on retries', () => {
  const modes = ['mock-core-p1', 'mock-core-p3', 'mock-ext-p2', 'mock-ext-p4', 'mock-full'] as const;

  for (const mode of modes) {
    const avoid = new Set<string>();
    const attempt1 = generateMockExamQuestions({ mode, attemptNumber: 1, avoidSignatures: avoid });
    for (const sig of attempt1.signatures) avoid.add(sig);

    const attempt2 = generateMockExamQuestions({ mode, attemptNumber: 2, avoidSignatures: avoid });
    for (const sig of attempt2.signatures) avoid.add(sig);

    const attempt3 = generateMockExamQuestions({ mode, attemptNumber: 3, avoidSignatures: avoid });

    assert.ok(attempt1.questions.length >= 8, `Expected >=8 questions for ${mode}`);
    assert.equal(attempt2.questions.length, attempt1.questions.length);
    assert.equal(attempt3.questions.length, attempt1.questions.length);

    // Every generated question evaluates its own answer cleanly and MCQs include their exact answer
    for (const q of [...attempt1.questions, ...attempt2.questions, ...attempt3.questions]) {
      assert.equal(/0580\/\d{2}\//.test(q.sourceRef), false, `Unexpected fake code in ${q.sourceRef}`);
      assert.equal(
        evaluateStudentAnswer(q.correctAnswer, q),
        true,
        `Generated question ${q.id} (${q.topicId}) failed self-check for answer ${q.correctAnswer}`
      );
      if (q.questionType === 'mcq') {
        assert.ok(q.options && q.options.length === 4, `Expected 4 options on ${q.id}`);
        assert.ok(
          q.options.includes(q.correctAnswer),
          `Correct answer "${q.correctAnswer}" missing from options ${JSON.stringify(q.options)} on ${q.id}`
        );
      }
    }

    // Attempt 2 questions must differ from Attempt 1
    const sig1 = new Set(attempt1.signatures);
    const sig2 = new Set(attempt2.signatures);
    const overlap12 = [...sig2].filter((s) => sig1.has(s));
    assert.ok(
      overlap12.length < attempt1.questions.length,
      `Retry attempt 2 for ${mode} should differ from attempt 1`
    );
  }

  // Full assessment contains both MCQ and written/numeric questions
  const full = generateMockExamQuestions({ mode: 'mock-full', attemptNumber: 1 });
  const types = new Set(full.questions.map((q) => q.questionType));
  assert.ok(types.has('mcq'), 'Full mock should contain MCQ questions');
  assert.ok(types.has('numeric'), 'Full mock should contain numeric questions');
  assert.ok(types.has('text'), 'Full mock should contain exact text/fraction questions');
});

test('PDF annotation helpers normalize coordinates, erase hit strokes, and handle undo/redo & JSON parsing', () => {
  const pt = normalizePointerToPage(350, 200, { left: 100, top: 100, width: 500, height: 400 });
  assert.deepEqual(pt, { x: 0.5, y: 0.25 });

  const clamped = normalizePointerToPage(50, 700, { left: 100, top: 100, width: 500, height: 400 });
  assert.deepEqual(clamped, { x: 0, y: 1 });

  const s1: AnnotationStroke = {
    id: 'stroke-1',
    tool: 'pen',
    color: '#1d4ed8',
    size: 3.5,
    points: [
      { x: 0.1, y: 0.1 },
      { x: 0.4, y: 0.1 },
    ],
  };
  const s2: AnnotationStroke = {
    id: 'stroke-2',
    tool: 'highlighter',
    color: '#facc15',
    size: 18,
    points: [
      { x: 0.8, y: 0.8 },
      { x: 0.9, y: 0.8 },
    ],
  };

  // Erase touches stroke-1 midpoint but preserves stroke-2
  const erased = eraseStrokesNearPoint([s1, s2], { x: 0.25, y: 0.105 }, 0.02);
  assert.equal(erased.removedAny, true);
  assert.equal(erased.remaining.length, 1);
  assert.equal(erased.remaining[0].id, 'stroke-2');

  // History undo/redo cycle
  let hist = createInitialAnnotationHistory({});
  hist = pushAnnotationHistory(hist, { 1: [s1] });
  hist = pushAnnotationHistory(hist, { 1: [s1, s2] });
  assert.equal(countTotalStrokes(hist.present), 2);

  hist = undoAnnotationHistory(hist);
  assert.equal(countTotalStrokes(hist.present), 1);
  assert.equal(hist.present[1][0].id, 'stroke-1');

  hist = redoAnnotationHistory(hist);
  assert.equal(countTotalStrokes(hist.present), 2);

  // Serialization & invalid JSON defense
  const roundtrip = parseAnnotationsJson(JSON.stringify(hist.present));
  assert.equal(countTotalStrokes(roundtrip), 2);
  assert.deepEqual(parseAnnotationsJson('{not-valid-json'), {});

  // PDF magic header validation
  assert.equal(hasPdfHeader(new TextEncoder().encode('%PDF-1.4\n%...')), true);
  assert.equal(hasPdfHeader(new TextEncoder().encode('<!DOCTYPE html><html>')), false);
  assert.equal(hasPdfHeader(new Uint8Array([1, 2, 3])), false);
});

test('Cloudflare Worker handleApiRequest routes /api/* cleanly and passes SPA routes through', async () => {
  // Non-API routes return null so ASSETS.fetch serves the SPA
  const spaRes = await handleApiRequest(new Request('https://igcse.rifkisnote.my.id/notes/0580/1/1.16'));
  assert.equal(spaRes, null);

  // /api/health returns JSON ok:true
  const healthRes = await handleApiRequest(new Request('https://igcse.rifkisnote.my.id/api/health'));
  assert.ok(healthRes);
  assert.equal(healthRes.status, 200);
  assert.match(healthRes.headers.get('content-type') || '', /application\/json/);
  assert.deepEqual(await healthRes.json(), { ok: true, runtime: 'cloudflare-worker' });

  // Invalid session query returns 400
  const badSessionRes = await handleApiRequest(
    new Request('https://igcse.rifkisnote.my.id/api/papacambridge/papers?session=bad/../../')
  );
  assert.ok(badSessionRes);
  assert.equal(badSessionRes.status, 400);

  // Disallowed PDF URL returns 403
  const forbiddenPdfRes = await handleApiRequest(
    new Request('https://igcse.rifkisnote.my.id/api/papacambridge/pdf?url=https://evil.example.com/x.pdf')
  );
  assert.ok(forbiddenPdfRes);
  assert.equal(forbiddenPdfRes.status, 403);

  // Allowed PDF URL returning valid %PDF- bytes proxies application/pdf
  const pdfUrl = 'https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0580_s24_qp_22.pdf';
  const validPdfRes = await handleApiRequest(
    new Request(`https://igcse.rifkisnote.my.id/api/papacambridge/pdf?url=${encodeURIComponent(pdfUrl)}`),
    async () =>
      new Response(new TextEncoder().encode('%PDF-1.7\n1 0 obj\n<<>>\nendobj'), {
        status: 200,
        headers: { 'Content-Type': 'application/pdf' },
      })
  );
  assert.ok(validPdfRes);
  assert.equal(validPdfRes.status, 200);
  assert.equal(validPdfRes.headers.get('content-type'), 'application/pdf');
  assert.match(validPdfRes.headers.get('content-disposition') || '', /0580_s24_qp_22\.pdf/);

  // Allowed PDF URL returning HTML instead of PDF returns 404 JSON
  const htmlPdfRes = await handleApiRequest(
    new Request(`https://igcse.rifkisnote.my.id/api/papacambridge/pdf?url=${encodeURIComponent(pdfUrl)}`),
    async () =>
      new Response('<!doctype html><html>Not Found</html>', {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      })
  );
  assert.ok(htmlPdfRes);
  assert.equal(htmlPdfRes.status, 404);

  // Unknown API path returns 404 JSON (never HTML fallback)
  const unknownApiRes = await handleApiRequest(
    new Request('https://igcse.rifkisnote.my.id/api/unknown-endpoint')
  );
  assert.ok(unknownApiRes);
  assert.equal(unknownApiRes.status, 404);
});

test('Extended topics 4.3, 4.6, 8.3, and 8.4 cover bearings, transversal lines, exclusive/independent events, and tree diagrams', () => {
  const t43 = ALL_SUBTOPICS_0580.find((t) => t.id === '4.3');
  assert.ok(t43);
  assert.ok(t43.extendedObjectives && t43.extendedObjectives.length >= 2);
  assert.equal(t43.sandbox, 'bearings-explorer');
  const t43Blob = JSON.stringify(t43);
  assert.match(t43Blob, /Cosine Rule/i);
  assert.match(t43Blob, /Sine Rule/i);
  assert.match(t43Blob, /co-interior/i);

  const t46 = ALL_SUBTOPICS_0580.find((t) => t.id === '4.6');
  assert.ok(t46);
  assert.ok(t46.extendedObjectives && t46.extendedObjectives.length >= 2);
  assert.equal(t46.sandbox, 'transversal-angles');
  const t46Blob = JSON.stringify(t46);
  assert.match(t46Blob, /transversal/i);
  assert.match(t46Blob, /corresponding/i);
  assert.match(t46Blob, /alternate/i);
  assert.match(t46Blob, /co-interior/i);

  const t83 = ALL_SUBTOPICS_0580.find((t) => t.id === '8.3');
  assert.ok(t83);
  assert.ok(t83.extendedObjectives && t83.extendedObjectives.length >= 2);
  assert.equal(t83.sandbox, 'probability-tree');
  const t83Blob = JSON.stringify(t83);
  assert.match(t83Blob, /mutually exclusive/i);
  assert.match(t83Blob, /independent/i);
  assert.match(t83Blob, /tree diagram/i);

  // Search queries match the right 0580 topics
  assert.ok(findMatchingSyllabusTopics('transversal', SYLLABUS_0580).some((m) => m.topic.id === '4.6'));
  assert.ok(findMatchingSyllabusTopics('mutually exclusive', SYLLABUS_0580).some((m) => m.topic.id === '8.3'));
  assert.ok(findMatchingSyllabusTopics('independent tree', SYLLABUS_0580).some((m) => m.topic.id === '8.3'));
  assert.ok(findMatchingSyllabusTopics('bearings', SYLLABUS_0580).some((m) => m.topic.id === '4.3'));

  // Topical mock generation works cleanly for 4.3, 4.6, 8.3, 8.4 and bank questions self-check
  for (const topicId of ['4.3', '4.6', '8.3', '8.4']) {
    const res = generateMockExamQuestions({ mode: 'topical', topicId, attemptNumber: 1 });
    assert.ok(res.questions.length >= 4, `Expected >=4 topical questions for ${topicId}`);
    for (const q of res.questions) {
      assert.equal(evaluateStudentAnswer(q.correctAnswer, q), true);
      assert.equal(/0580\/\d{2}\//.test(q.sourceRef), false);
    }
  }
  for (const bq of PRACTICE_QUESTION_BANK) {
    assert.equal(
      evaluateStudentAnswer(bq.correctAnswer, bq),
      true,
      `Static bank question ${bq.id} failed self-check`
    );
  }
});






