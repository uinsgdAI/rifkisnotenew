import type {
  AppRoute,
  PastPaperFile,
  PracticeQuestion,
  SubtopicNote,
  SyllabusChapter,
} from '../types/syllabus';

export function parseAppRoute(pathname: string, search = ''): AppRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '/' || clean === '/notes' || clean === '/notes/0580') {
    return { view: 'notes', chapterId: 1, topicId: '1.1' };
  }

  const notesMatch = clean.match(/^\/notes\/0580\/(\d+)\/(\d+\.\d+)$/);
  if (notesMatch) {
    return {
      view: 'notes',
      chapterId: Number(notesMatch[1]),
      topicId: notesMatch[2],
    };
  }

  const chapterOnlyMatch = clean.match(/^\/notes\/0580\/(\d+)$/);
  if (chapterOnlyMatch) {
    const ch = Number(chapterOnlyMatch[1]);
    return {
      view: 'notes',
      chapterId: ch,
      topicId: `${ch}.1`,
    };
  }

  if (clean.startsWith('/past-papers/0580')) {
    const parts = clean.split('/').filter(Boolean);
    const params = new URLSearchParams(search);
    const paperParam = params.get('paper') || undefined;
    return {
      view: 'past-papers',
      sessionSlug: parts[2] || undefined,
      paperFilename: paperParam,
    };
  }

  if (clean.startsWith('/practice/0580')) {
    const parts = clean.split('/').filter(Boolean);
    return {
      view: 'practice',
      mode: parts[2] || undefined,
      topicId: parts[3] || undefined,
    };
  }

  return { view: 'notes', chapterId: 1, topicId: '1.1' };
}

export function buildAppRoutePath(route: AppRoute): string {
  if (route.view === 'notes') {
    return `/notes/0580/${route.chapterId}/${route.topicId}`;
  }
  if (route.view === 'past-papers') {
    const base = route.sessionSlug
      ? `/past-papers/0580/${route.sessionSlug}`
      : '/past-papers/0580';
    return route.paperFilename
      ? `${base}?paper=${encodeURIComponent(route.paperFilename)}`
      : base;
  }
  if (route.view === 'practice') {
    if (route.mode && route.topicId) {
      return `/practice/0580/${route.mode}/${route.topicId}`;
    }
    if (route.mode) {
      return `/practice/0580/${route.mode}`;
    }
    return '/practice/0580';
  }
  return '/notes/0580/1/1.16';
}

export interface ParsedPaperReference {
  paperCode: string;
  sessionSlug: string;
  sessionLabel: string;
  paperNumber: string;
  variant: string;
  tier: 'Core' | 'Extended';
  qpFilename: string;
  msFilename: string;
}

export function parsePaperReference(rawCode: string): ParsedPaperReference | null {
  const match = rawCode.match(/0580\/([1-4])([1-3])\/(M\/J|O\/N|F\/M)\/(\d{2})/i);
  if (!match) return null;

  const paperNumber = match[1];
  const variant = match[2];
  const seriesToken = match[3].toUpperCase();
  const yy = match[4];
  const fullYear = `20${yy}`;

  let seriesSlug = 'may-june';
  let seriesCode = 's';
  let seriesLabel = 'May / June';

  if (seriesToken === 'O/N') {
    seriesSlug = 'oct-nov';
    seriesCode = 'w';
    seriesLabel = 'Oct / Nov';
  } else if (seriesToken === 'F/M') {
    seriesSlug = 'march';
    seriesCode = 'm';
    seriesLabel = 'Feb / March';
  }

  const tier: 'Core' | 'Extended' =
    paperNumber === '1' || paperNumber === '3' ? 'Core' : 'Extended';

  return {
    paperCode: `0580/${paperNumber}${variant}/${seriesToken}/${yy}`,
    sessionSlug: `${fullYear}-${seriesSlug}`,
    sessionLabel: `${seriesLabel} ${fullYear}`,
    paperNumber,
    variant,
    tier,
    qpFilename: `0580_${seriesCode}${yy}_qp_${paperNumber}${variant}.pdf`,
    msFilename: `0580_${seriesCode}${yy}_ms_${paperNumber}${variant}.pdf`,
  };
}

export function normalizeAnswerString(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[$£€¥₹,\s]/g, '')
    .replace(/^(x|y|n|p|k|r)=/i, '')
    .replace(/°|deg|degrees/gi, '')
    .replace(/%$/, '');
}

export function parseNumericOrFraction(raw: string): number | null {
  const cleaned = normalizeAnswerString(raw);
  if (!cleaned) return null;

  // Mixed fraction e.g. "1 1/2" was stripped of spaces, handle "a/b"
  const fracMatch = cleaned.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (fracMatch) {
    const num = Number(fracMatch[1]);
    const den = Number(fracMatch[2]);
    if (den !== 0 && Number.isFinite(num) && Number.isFinite(den)) {
      return num / den;
    }
    return null;
  }

  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

export function evaluateStudentAnswer(
  userInput: string,
  question: Pick<
    PracticeQuestion,
    'questionType' | 'correctAnswer' | 'acceptedAnswers' | 'numericAnswer' | 'tolerance'
  >
): boolean {
  const raw = userInput.trim();
  if (!raw) return false;

  if (question.questionType === 'mcq') {
    return raw.toLowerCase() === question.correctAnswer.trim().toLowerCase();
  }

  const normalizedInput = normalizeAnswerString(raw);
  const normalizedTarget = normalizeAnswerString(question.correctAnswer);

  if (normalizedInput === normalizedTarget) {
    return true;
  }

  if (question.acceptedAnswers) {
    for (const acc of question.acceptedAnswers) {
      if (normalizedInput === normalizeAnswerString(acc)) {
        return true;
      }
    }
  }

  if (typeof question.numericAnswer === 'number') {
    const parsed = parseNumericOrFraction(raw);
    if (parsed !== null) {
      const tol =
        typeof question.tolerance === 'number'
          ? question.tolerance
          : Math.max(Math.abs(question.numericAnswer) * 0.005, 1e-4);
      if (Math.abs(parsed - question.numericAnswer) <= tol) {
        return true;
      }
    }
  }

  return false;
}

export interface GradeEstimate {
  grade: string;
  percentage: number;
  descriptor: string;
}

export function estimateCambridgeGrade(
  earnedMarks: number,
  totalMarks: number,
  tier: 'Core' | 'Extended'
): GradeEstimate {
  if (totalMarks <= 0) {
    return { grade: 'U', percentage: 0, descriptor: 'Unclassified' };
  }
  const percentage = Math.round((earnedMarks / totalMarks) * 100);

  if (tier === 'Extended') {
    if (percentage >= 86) return { grade: 'A*', percentage, descriptor: 'Distinction (Top Extended)' };
    if (percentage >= 73) return { grade: 'A', percentage, descriptor: 'High Merit' };
    if (percentage >= 60) return { grade: 'B', percentage, descriptor: 'Merit' };
    if (percentage >= 46) return { grade: 'C', percentage, descriptor: 'Credit Pass' };
    if (percentage >= 34) return { grade: 'D', percentage, descriptor: 'Pass' };
    if (percentage >= 22) return { grade: 'E', percentage, descriptor: 'Borderline Extended' };
    return { grade: 'U', percentage, descriptor: 'Below Threshold' };
  }

  // Core tier max grade is C
  if (percentage >= 72) return { grade: 'C', percentage, descriptor: 'Maximum Core Grade' };
  if (percentage >= 58) return { grade: 'D', percentage, descriptor: 'Solid Core Pass' };
  if (percentage >= 44) return { grade: 'E', percentage, descriptor: 'Core Pass' };
  if (percentage >= 31) return { grade: 'F', percentage, descriptor: 'Foundation Pass' };
  if (percentage >= 20) return { grade: 'G', percentage, descriptor: 'Minimum Grade' };
  return { grade: 'U', percentage, descriptor: 'Below Threshold' };
}

export function parsePapaCambridgeFilename(
  filename: string,
  url: string,
  sessionSlug: string
): PastPaperFile {
  const lower = filename.toLowerCase();
  let docType: PastPaperFile['docType'] = 'OTHER';
  let docTypeLabel = 'Resource';

  if (/_qp_/.test(lower)) {
    docType = 'QP';
    docTypeLabel = 'Question Paper';
  } else if (/_ms_/.test(lower)) {
    docType = 'MS';
    docTypeLabel = 'Mark Scheme';
  } else if (/_er/.test(lower)) {
    docType = 'ER';
    docTypeLabel = 'Examiner Report';
  } else if (/_gt/.test(lower)) {
    docType = 'GT';
    docTypeLabel = 'Grade Thresholds';
  } else if (/_in_/.test(lower)) {
    docType = 'IN';
    docTypeLabel = 'Insert';
  }

  const paperMatch = lower.match(/_(?:qp|ms|in)_(\d)(\d)?\.pdf$/);
  const paperNumber = paperMatch ? paperMatch[1] : '-';
  const variant = paperMatch && paperMatch[2] ? paperMatch[2] : '-';

  let tier: PastPaperFile['tier'] = 'All';
  if (paperNumber === '1' || paperNumber === '3') {
    tier = 'Core';
  } else if (paperNumber === '2' || paperNumber === '4') {
    tier = 'Extended';
  }

  return {
    filename,
    docType,
    docTypeLabel,
    paperNumber,
    variant,
    tier,
    url,
    sessionSlug,
  };
}

export function formatCountdown(secondsRemaining: number): string {
  const safe = Math.max(0, Math.floor(secondsRemaining));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export interface WeakTopicSummary {
  chapterId: number;
  topicId: string;
  topicTitle: string;
  chapterTitle: string;
  marksLost: number;
  totalMarks: number;
  missedCount: number;
  sourceRefs: string[];
}

export function extractWeakTopicsFromResults(
  results: Array<{
    question: Pick<PracticeQuestion, 'chapterId' | 'topicId' | 'topicTitle' | 'marks' | 'sourceRef'>;
    isCorrect: boolean;
    marksEarned: number;
  }>,
  chapters: SyllabusChapter[]
): WeakTopicSummary[] {
  const chapterTitleMap = new Map(chapters.map((c) => [c.id, c.title]));
  const grouped = new Map<string, WeakTopicSummary>();

  for (const res of results) {
    if (res.isCorrect) continue;
    const { question, marksEarned } = res;
    const lost = Math.max(0, question.marks - marksEarned);
    const existing = grouped.get(question.topicId);
    if (existing) {
      existing.marksLost += lost;
      existing.totalMarks += question.marks;
      existing.missedCount += 1;
      if (!existing.sourceRefs.includes(question.sourceRef)) {
        existing.sourceRefs.push(question.sourceRef);
      }
    } else {
      grouped.set(question.topicId, {
        chapterId: question.chapterId,
        topicId: question.topicId,
        topicTitle: question.topicTitle,
        chapterTitle: chapterTitleMap.get(question.chapterId) || `Chapter ${question.chapterId}`,
        marksLost: lost,
        totalMarks: question.marks,
        missedCount: 1,
        sourceRefs: [question.sourceRef],
      });
    }
  }

  return Array.from(grouped.values()).sort((a, b) => {
    if (b.marksLost !== a.marksLost) return b.marksLost - a.marksLost;
    if (a.chapterId !== b.chapterId) return a.chapterId - b.chapterId;
    return a.topicId.localeCompare(b.topicId);
  });
}

export interface TopicSearchMatch {
  chapterId: number;
  chapterTitle: string;
  topic: SubtopicNote;
  score: number;
  matchReason: string;
}

const DOMAIN_TOPIC_HINTS: Array<{ keywords: string[]; topicIds: string[]; reason: string }> = [
  {
    keywords: ['transversal', 'corresponding', 'alternate', 'co-interior', 'cointerior', 'allied', 'supplementary', 'vertically', 'opposite', 'polygon', 'polygons', 'interior', 'exterior', 'pentagon', 'hexagon', 'octagon', 'decagon', 'quadrilateral', 'parallel', 'angle', 'angles'],
    topicIds: ['4.6', '4.1'],
    reason: 'Transversal, parallel lines & polygon angle rules',
  },
  {
    keywords: ['exclusive', 'mutually', 'independent', 'dependent', 'replacement', 'tree', 'conditional', 'probability', 'combined', 'venn'],
    topicIds: ['8.3', '8.4', '8.1', '8.2', '1.2'],
    reason: 'Exclusive/independent events, tree diagrams & probability',
  },
  {
    keywords: ['bearing', 'bearings', 'north', 'clockwise', 'back', 'scale'],
    topicIds: ['4.3', '6.5', '6.2'],
    reason: 'Bearings, parallel North lines & Sine/Cosine Rules',
  },
  {
    keywords: ['statistic', 'statistics', 'stats', 'data', 'average', 'averages', 'mean', 'median', 'mode', 'range'],
    topicIds: ['9.3', '9.2', '9.1', '9.4', '9.5', '9.6', '9.7'],
    reason: 'Statistics curriculum',
  },
  {
    keywords: ['histogram', 'histograms', 'frequency', 'density', 'unequal'],
    topicIds: ['9.7'],
    reason: 'Histograms & frequency density',
  },
  {
    keywords: ['cumulative', 'quartile', 'quartiles', 'iqr', 'interquartile', 'percentile', 'ogive', 'box', 'whisker'],
    topicIds: ['9.6'],
    reason: 'Cumulative frequency, box plots & IQR',
  },
  {
    keywords: ['scatter', 'correlation', 'best', 'pie', 'stem', 'leaf'],
    topicIds: ['9.5', '9.4'],
    reason: 'Charts & scatter graphs',
  },
  {
    keywords: ['circle', 'theorem', 'theorems', 'tangent', 'cyclic', 'chord', 'semicircle', 'alternate'],
    topicIds: ['4.8', '4.7'],
    reason: 'Circle theorems',
  },
  {
    keywords: ['similar', 'similarity', 'congruent', 'congruence', 'scale'],
    topicIds: ['4.4', '4.1'],
    reason: 'Similarity & congruence (k, k², k³)',
  },
  {
    keywords: ['trig', 'trigonometry', 'sin', 'cos', 'tan', 'sine', 'cosine', 'sohcahtoa', 'pythagoras', 'elevation', 'depression', 'ambiguous', 'exact', 'graph', '3d', 'plane', 'pyramid'],
    topicIds: ['6.5', '6.2', '6.6', '6.3', '6.4', '6.1'],
    reason: 'Trigonometry, Sine/Cosine Rules & 3D',
  },
  {
    keywords: ['vector', 'vectors', 'magnitude', 'column', 'collinear', 'parallel'],
    topicIds: ['7.4', '7.3', '7.2', '7.1'],
    reason: 'Vectors, collinearity & transformations',
  },
  {
    keywords: ['money', 'currency', 'exchange', 'commission', 'compound', 'interest', 'depreciation', 'exponential', 'decay', 'reverse', 'percentage'],
    topicIds: ['1.17', '1.16', '1.13'],
    reason: 'Money, compound interest & exponential change',
  },
  {
    keywords: ['surd', 'surds', 'rationalise', 'bounds', 'upper', 'lower', 'accuracy', 'indices', 'standard'],
    topicIds: ['1.18', '1.10', '1.7', '1.8'],
    reason: 'Number, surds & accuracy bounds',
  },
  {
    keywords: ['quadratic', 'simultaneous', 'factorise', 'inequality', 'gradient', 'perpendicular', 'differentiation', 'stationary', 'turning', 'sequence', 'function', 'inverse', 'proportion'],
    topicIds: ['2.5', '2.12', '2.13', '2.7', '2.8', '3.7', '3.4'],
    reason: 'Algebra, calculus & coordinate geometry',
  },
  {
    keywords: ['area', 'volume', 'surface', 'cylinder', 'cone', 'sphere', 'frustum', 'hemisphere', 'sector', 'arc', 'segment', 'prism', 'mensuration'],
    topicIds: ['5.4', '5.3', '5.5', '5.2'],
    reason: 'Mensuration & Extended 3D solids',
  },
];

export function findMatchingSyllabusTopics(
  query: string,
  chapters: SyllabusChapter[],
  limit = 8
): TopicSearchMatch[] {
  const raw = query.trim().toLowerCase();
  if (!raw) return [];

  const tokens = raw
    .split(/[^a-z0-9.]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2 || /^\d$/.test(t));

  if (tokens.length === 0) return [];

  const matches: TopicSearchMatch[] = [];

  for (const chapter of chapters) {
    const chTitleLower = chapter.title.toLowerCase();
    const chDescLower = chapter.description.toLowerCase();

    for (const topic of chapter.subtopics) {
      let score = 0;
      let matchReason = '';

      const titleLower = topic.title.toLowerCase();
      const summaryLower = topic.summary.toLowerCase();
      const objectivesText = [
        ...topic.coreObjectives,
        ...(topic.extendedObjectives || []),
      ]
        .join(' ')
        .toLowerCase();
      const notesText = topic.studyNotes
        .map((s) => `${s.heading} ${s.body} ${(s.bullets || []).join(' ')}`)
        .join(' ')
        .toLowerCase();

      if (topic.code.toLowerCase() === raw || topic.id.toLowerCase() === raw) {
        score += 120;
        matchReason = `Exact code ${topic.code}`;
      }

      for (const token of tokens) {
        const stem = token.endsWith('s') && token.length > 3 ? token.slice(0, -1) : token;

        if (topic.code.toLowerCase().includes(token)) {
          score += 50;
          matchReason ||= `Code match ${topic.code}`;
        }
        if (titleLower.includes(token) || titleLower.includes(stem)) {
          score += 40;
          matchReason ||= `Topic title`;
        }
        if (chTitleLower.includes(token) || chTitleLower.includes(stem)) {
          score += 24;
          matchReason ||= `Chapter: ${chapter.title}`;
        }
        if (summaryLower.includes(token) || summaryLower.includes(stem)) {
          score += 18;
          matchReason ||= `Syllabus summary`;
        }
        if (objectivesText.includes(token) || objectivesText.includes(stem)) {
          score += 12;
          matchReason ||= `Curriculum objective`;
        }
        if (notesText.includes(token) || notesText.includes(stem) || chDescLower.includes(stem)) {
          score += 6;
          matchReason ||= `Study notes`;
        }
      }

      for (const hint of DOMAIN_TOPIC_HINTS) {
        const keywordHit = hint.keywords.some((kw) =>
          tokens.some((tok) => kw === tok || kw.startsWith(tok) || tok.startsWith(kw))
        );
        if (keywordHit) {
          const rankIdx = hint.topicIds.indexOf(topic.id);
          if (rankIdx !== -1) {
            score += 45 - rankIdx * 3;
            matchReason = hint.reason;
          }
        }
      }

      if (score > 0) {
        matches.push({
          chapterId: chapter.id,
          chapterTitle: chapter.title,
          topic,
          score,
          matchReason: matchReason || `Chapter ${chapter.id}`,
        });
      }
    }
  }

  return matches
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.chapterId !== b.chapterId) return a.chapterId - b.chapterId;
      return a.topic.code.localeCompare(b.topic.code);
    })
    .slice(0, limit);
}

