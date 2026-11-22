import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  ExternalLink,
  Eye,
  FileText,
  HelpCircle,
  Lightbulb,
  ListChecks,
  Play,
  Table2,
  Zap,
} from 'lucide-react';
import type { AppRoute, SubtopicNote } from '../types/syllabus';
import { getAdjacentSubtopics, SYLLABUS_0580 } from '../data/syllabus0580';
import { evaluateStudentAnswer, parsePaperReference } from '../utils/examLogic';
import { KaTeXFormula, MathText } from './MathText';
import { SyllabusSidebar } from './SyllabusSidebar';
import { TopicSandbox } from './TopicSandbox';

interface NotesViewProps {
  chapterId: number;
  topicId: string;
  note: SubtopicNote;
  studiedTopicIds: string[];
  weakTopicIds: string[];
  onToggleStudied: (topicId: string) => void;
  onClearWeakTopic: (topicId: string) => void;
  onNavigate: (route: AppRoute) => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  chapterId,
  topicId,
  note,
  studiedTopicIds,
  weakTopicIds,
  onToggleStudied,
  onClearWeakTopic,
  onNavigate,
}) => {
  const [studyMode, setStudyMode] = useState<'conceptual' | 'detailed'>('detailed');
  const [quickInput, setQuickInput] = useState('');
  const [quickStatus, setQuickStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [revealedMarkSchemes, setRevealedMarkSchemes] = useState<number[]>([]);

  useEffect(() => {
    setQuickInput('');
    setQuickStatus('idle');
    setShowHint(false);
    setShowSolution(false);
    setRevealedMarkSchemes([]);
  }, [topicId]);

  const chapter = SYLLABUS_0580.find((c) => c.id === chapterId);
  const isStudied = studiedTopicIds.includes(note.id);
  const isFlaggedForReview = weakTopicIds.includes(note.id);
  const { prev, next } = getAdjacentSubtopics(note.id);
  const parsedPaper = note.quickCheck.paperCode
    ? parsePaperReference(note.quickCheck.paperCode)
    : null;
  const otherWeakIds = weakTopicIds.filter((id) => id !== note.id);
  const nextWeakNote =
    otherWeakIds.length > 0
      ? SYLLABUS_0580.flatMap((c) => c.subtopics).find((t) => t.id === otherWeakIds[0])
      : undefined;

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    const ok = evaluateStudentAnswer(quickInput, {
      questionType: typeof note.quickCheck.numericAnswer === 'number' ? 'numeric' : 'text',
      correctAnswer: note.quickCheck.answer,
      acceptedAnswers: note.quickCheck.acceptedAnswers,
      numericAnswer: note.quickCheck.numericAnswer,
      tolerance: note.quickCheck.tolerance,
    });
    setQuickStatus(ok ? 'correct' : 'incorrect');
  };

  const toggleMarkScheme = (idx: number) => {
    setRevealedMarkSchemes((prevList) =>
      prevList.includes(idx) ? prevList.filter((i) => i !== idx) : [...prevList, idx]
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6 items-start">
      <SyllabusSidebar
        activeChapterId={chapterId}
        activeTopicId={topicId}
        studiedTopicIds={studiedTopicIds}
        weakTopicIds={weakTopicIds}
        onSelectTopic={(ch, tp) =>
          onNavigate({ view: 'notes', chapterId: ch, topicId: tp })
        }
      />

      <main className="flex-1 min-w-0 w-full space-y-6">
        {/* Topic Header Card */}
        <section className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>IGCSE Mathematics (0580)</span>
              <span aria-hidden="true">·</span>
              <span>
                Chapter {chapterId}: {chapter?.title}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-700 font-medium">{note.code}</span>
              <span aria-hidden="true">·</span>
              <span className={note.tier === 'Extended' ? 'text-amber-700 font-medium' : 'text-slate-700'}>
                {note.tier}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleStudied(note.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  isStudied
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isStudied ? 'Studied' : 'Mark as Studied'}
              </button>
              <button
                type="button"
                onClick={() =>
                  onNavigate({ view: 'practice', mode: 'topical', topicId: note.id })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                Practice {note.code}
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="min-w-0">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
                <span className="font-mono text-blue-700 mr-2.5">{note.code}</span>
                {note.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                <MathText text={note.summary} />
              </p>
              {note.coursebookRef && (
                <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">
                    Morrison &amp; Hamshaw Coursebook (2nd Ed.)
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {note.coursebookRef.unitTitle}, Ch. {note.coursebookRef.chapter}:{' '}
                    {note.coursebookRef.chapterTitle}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Sections {note.coursebookRef.sections}</span>
                </div>
              )}
              {note.coursebookRef?.editionNote && (
                <p className="mt-1 text-xs text-amber-800">{note.coursebookRef.editionNote}</p>
              )}
            </div>

            <div
              className="inline-flex items-center p-1 bg-slate-100 border border-slate-200 rounded-lg shrink-0 self-start md:self-auto"
              role="group"
              aria-label="Study depth mode"
            >
              <button
                type="button"
                aria-pressed={studyMode === 'conceptual'}
                onClick={() => setStudyMode('conceptual')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  studyMode === 'conceptual'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Quick Concept
              </button>
              <button
                type="button"
                aria-pressed={studyMode === 'detailed'}
                onClick={() => setStudyMode('detailed')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  studyMode === 'detailed'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Detailed Coursebook
              </button>
            </div>
          </div>

          {isFlaggedForReview && (
            <div className="p-3.5 rounded-lg bg-amber-50/80 border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-950">
              <span>
                Flagged for revision from a missed practice or past paper question. Review the rules below, then click <strong>Mark as Studied</strong> once mastered.
              </span>
              <div className="flex items-center gap-2 shrink-0">
                {nextWeakNote && (
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({
                        view: 'notes',
                        chapterId: nextWeakNote.chapterId,
                        topicId: nextWeakNote.id,
                      })
                    }
                    className="px-2.5 py-1 font-semibold bg-white border border-amber-300 rounded-md text-amber-900 hover:bg-amber-100 cursor-pointer"
                  >
                    Next Flagged: {nextWeakNote.code} →
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onClearWeakTopic(note.id)}
                  className="px-2.5 py-1 font-medium text-amber-800 hover:text-amber-950 cursor-pointer"
                >
                  Dismiss Flag
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Core Intuition & Quick Concept Summary */}
        {note.bigIdea && (
          <section className="p-5 sm:p-6 bg-blue-50/60 border border-blue-200 rounded-xl space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-blue-700 shrink-0" />
                <h2 className="font-display text-sm font-bold text-blue-950">
                  {studyMode === 'conceptual' ? 'Quick Concept — Core Intuition' : 'Big Idea & Core Intuition'}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed max-w-3xl">
                <MathText text={note.bigIdea} />
              </p>
            </div>

            {studyMode === 'conceptual' && note.rapidSummary && note.rapidSummary.length > 0 && (
              <div className="pt-3 border-t border-blue-200/70 space-y-2.5">
                <div className="text-xs font-semibold text-blue-950">
                  Key Takeaways at a Glance
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {note.rapidSummary.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-white border border-blue-200/80 space-y-1"
                    >
                      <div className="font-display text-xs font-bold text-slate-900">
                        <MathText text={item.rule} />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <MathText text={item.detail} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Coursebook Margin Pedagogy: Tip & Fast Forward (Morrison & Hamshaw) */}
        {(note.coursebookTip || (studyMode === 'detailed' && note.fastForward)) && (
          <section
            aria-label="Coursebook Tip and Fast Forward"
            className={`grid gap-4 ${
              studyMode === 'detailed' && note.fastForward && note.coursebookTip
                ? 'md:grid-cols-2'
                : 'grid-cols-1'
            }`}
          >
            {note.coursebookTip && (
              <div className="p-4 sm:p-5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
                <div className="text-xs font-bold text-amber-900">
                  Coursebook Tip · Morrison &amp; Hamshaw
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  <MathText text={note.coursebookTip} />
                </p>
              </div>
            )}
            {studyMode === 'detailed' && note.fastForward && (
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Compass className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span>Fast Forward · Where This Connects Next</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  <MathText text={note.fastForward} />
                </p>
              </div>
            )}
          </section>
        )}

        {/* Syllabus Objectives (Detailed mode) */}
        {studyMode === 'detailed' && (
          <section className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-700" />
              <h2 className="font-display text-base font-bold text-slate-900">
                Curriculum Learning Objectives (2025–2027)
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold text-slate-500 mb-2">Core Curriculum</h3>
                <ul className="space-y-2 text-sm text-slate-700 leading-relaxed list-disc pl-5">
                  {note.coreObjectives.map((obj, idx) => (
                    <li key={idx}>
                      <MathText text={obj} />
                    </li>
                  ))}
                </ul>
              </div>

              {note.extendedObjectives && note.extendedObjectives.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-amber-800 mb-2">
                    Extended Supplement
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700 leading-relaxed list-disc pl-5">
                    {note.extendedObjectives.map((obj, idx) => (
                      <li key={idx}>
                        <MathText text={obj} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Key Formulae */}
        <section className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
          <h2 className="font-display text-base font-bold text-slate-900">
            Key Rules & Formulae
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {note.keyFormulas.map((f) => (
              <div
                key={f.label}
                className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2"
              >
                <div className="text-xs font-semibold text-slate-700">{f.label}</div>
                <div className="overflow-x-auto text-slate-900">
                  <KaTeXFormula latex={f.latex} />
                </div>
                {f.note && (
                  <p className="text-xs text-slate-500">
                    <MathText text={f.note} />
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Step-by-Step Exam Method (Detailed mode) */}
        {studyMode === 'detailed' && note.stepByStepMethod && note.stepByStepMethod.length > 0 && (
          <section className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-blue-700 shrink-0" />
              <h2 className="font-display text-base font-bold text-slate-900">
                Step-by-Step Exam Method
              </h2>
            </div>
            <ol className="space-y-3">
              {note.stepByStepMethod.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed max-w-3xl">
                  <span className="w-6 h-6 rounded-md bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>
                    <MathText text={step} />
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Structured Textbook Comparison / Reference Table (Detailed mode) */}
        {studyMode === 'detailed' && note.comparisonTable && (
          <section className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center gap-2">
              <Table2 className="w-4 h-4 text-blue-700 shrink-0" />
              <h2 className="font-display text-base font-bold text-slate-900">
                {note.comparisonTable.title}
              </h2>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {note.comparisonTable.headers.map((header, hi) => (
                      <th
                        key={hi}
                        scope="col"
                        className="px-4 py-2.5 text-xs font-semibold text-slate-700 whitespace-nowrap"
                      >
                        <MathText text={header} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {note.comparisonTable.rows.map((row, ri) => (
                    <tr key={ri} className="bg-white hover:bg-slate-50/70">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`px-4 py-2.5 text-slate-700 align-top ${
                            ci === 0 ? 'font-medium text-slate-900' : ''
                          }`}
                        >
                          <MathText text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Interactive Sandbox if present */}
        {note.sandbox && note.sandbox !== 'none' && <TopicSandbox type={note.sandbox} />}

        {/* Detailed Revision Notes */}
        {studyMode === 'detailed' && (
          <section className="p-6 bg-white border border-slate-200 rounded-xl space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-base font-bold text-slate-900">
                Detailed Coursebook Study Notes
              </h2>
              {note.coursebookRef && (
                <span className="text-xs text-slate-500">
                  Aligned with Chapter {note.coursebookRef.chapter}: {note.coursebookRef.chapterTitle}
                </span>
              )}
            </div>
            <div className="space-y-6 divide-y divide-slate-100">
              {note.studyNotes.map((sec, idx) => (
                <div key={idx} className={idx > 0 ? 'pt-6' : ''}>
                  <h3 className="font-display text-sm font-bold text-slate-900 mb-2">
                    {sec.heading}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
                    <MathText text={sec.body} />
                  </p>
                  {sec.bullets && (
                    <ul className="mt-3 space-y-2 text-sm text-slate-700 leading-relaxed list-disc pl-5 max-w-3xl">
                      {sec.bullets.map((b, bi) => (
                        <li key={bi}>
                          <MathText text={b} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Worked Examples */}
        <section className="p-6 bg-white border border-slate-200 rounded-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-base font-bold text-slate-900">
              {studyMode === 'conceptual' ? 'Quick Walkthrough Example' : 'Worked Exam Examples'}
            </h2>
            {studyMode === 'conceptual' && (
              <button
                type="button"
                onClick={() => setStudyMode('detailed')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 cursor-pointer"
              >
                Show full objectives, tables &amp; all {note.workedExamples.length} examples (Detailed Coursebook) →
              </button>
            )}
          </div>
          <div className="space-y-5">
            {(studyMode === 'conceptual'
              ? note.workedExamples.slice(0, 1)
              : note.workedExamples
            ).map((ex, idx) => {
              const showMs = revealedMarkSchemes.includes(idx);
              return (
                <article
                  key={idx}
                  className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-4"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-sm font-bold text-slate-900">
                      Example {idx + 1}: {ex.title}
                    </h3>
                    <span className="font-mono text-xs tabular-nums text-slate-500 shrink-0">
                      [{ex.marks} {ex.marks === 1 ? 'mark' : 'marks'}]
                    </span>
                  </div>

                  <p className="text-sm text-slate-800 leading-relaxed">
                    <MathText text={ex.question} />
                  </p>

                  <ol className="space-y-2 text-sm text-slate-700 list-decimal pl-5">
                    {ex.steps.map((s, si) => (
                      <li key={si}>
                        <MathText text={s} />
                      </li>
                    ))}
                  </ol>

                  <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-blue-800">
                      Answer: <MathText text={ex.answer} />
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleMarkScheme(idx)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {showMs ? 'Hide Mark Scheme' : 'Show Mark Scheme'}
                    </button>
                  </div>

                  {showMs && (
                    <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 font-mono">
                      <MathText text={ex.markSchemeNotes} />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* Rapid Exam Summary Table (Detailed mode; Quick Concept already renders Takeaways cards above) */}
        {studyMode === 'detailed' && note.rapidSummary && note.rapidSummary.length > 0 && (
          <section className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              <h2 className="font-display text-base font-bold text-slate-900">
                Rapid Exam Summary
              </h2>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th scope="col" className="px-4 py-2.5 text-xs font-semibold text-slate-700 w-1/3">
                      Must Remember
                    </th>
                    <th scope="col" className="px-4 py-2.5 text-xs font-semibold text-slate-700">
                      Rule &amp; Application
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {note.rapidSummary.map((item, ri) => (
                    <tr key={ri} className="bg-white">
                      <td className="px-4 py-2.5 font-semibold text-slate-900 align-top">
                        <MathText text={item.rule} />
                      </td>
                      <td className="px-4 py-2.5 text-slate-700 align-top">
                        <MathText text={item.detail} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Common Mistakes & Quick Concept Check */}
        <div className={`grid gap-6 ${studyMode === 'detailed' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          {studyMode === 'detailed' && (
            <section className="p-6 bg-white border border-slate-200 rounded-xl space-y-3">
              <h2 className="font-display text-base font-bold text-slate-900">
                Common Exam Pitfalls
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-700 list-disc pl-5 leading-relaxed">
                {note.commonMistakes.map((m, i) => (
                  <li key={i}>
                    <MathText text={m} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section
            aria-label={parsedPaper ? 'Topical Past Paper Question' : 'Topical Concept Check'}
            className="p-6 bg-white border border-slate-200 rounded-xl space-y-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-base font-bold text-slate-900">
                  {parsedPaper ? 'Topical Past Paper Question' : 'Topical Concept Check'}
                </h2>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  {parsedPaper && note.quickCheck.paperCode ? (
                    <>
                      <span className="font-mono font-semibold text-blue-800">
                        {note.quickCheck.paperCode}
                        {note.quickCheck.questionNumber ? ` · ${note.quickCheck.questionNumber}` : ''}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        Paper {parsedPaper.paperNumber} ({parsedPaper.tier}) · {parsedPaper.sessionLabel}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-mono font-semibold text-slate-800">
                        Syllabus {note.code}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{note.tier}</span>
                      <span aria-hidden="true">·</span>
                      <span>{note.quickCheck.paperType ?? 'Non-Calculator'}</span>
                    </>
                  )}
                  {typeof note.quickCheck.marks === 'number' && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-slate-500">
                        [{note.quickCheck.marks} {note.quickCheck.marks === 1 ? 'mark' : 'marks'}]
                      </span>
                    </>
                  )}
                </div>
              </div>

              {parsedPaper ? (
                <button
                  type="button"
                  onClick={() =>
                    onNavigate({
                      view: 'past-papers',
                      sessionSlug: parsedPaper.sessionSlug,
                      paperFilename: parsedPaper.qpFilename,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-blue-50 text-blue-700 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View {parsedPaper.paperCode} in Past Papers
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate({ view: 'past-papers' })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-blue-50 text-blue-700 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Browse 0580 Past Papers
                </button>
              )}
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              <MathText text={note.quickCheck.prompt} />
            </p>

            <form onSubmit={handleQuickSubmit} className="flex gap-2">
              <label htmlFor={`qc-${note.id}`} className="sr-only">
                Your answer
              </label>
              <input
                id={`qc-${note.id}`}
                type="text"
                value={quickInput}
                onChange={(e) => {
                  setQuickInput(e.target.value);
                  setQuickStatus('idle');
                }}
                placeholder={
                  note.quickCheck.unit
                    ? `Enter value (${note.quickCheck.unit})`
                    : 'Type your answer'
                }
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg cursor-pointer shrink-0"
              >
                Check
              </button>
            </form>

            {quickStatus === 'correct' && (
              <div className="text-xs font-medium text-emerald-700">
                Correct — full marks!
              </div>
            )}
            {quickStatus === 'incorrect' && (
              <div className="text-xs font-medium text-rose-700">
                Not quite. Try the hint or reveal the worked solution below.
              </div>
            )}

            <div className="flex items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => setShowHint((h) => !h)}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              <button
                type="button"
                onClick={() => setShowSolution((s) => !s)}
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                {showSolution ? 'Hide Solution' : 'Reveal Solution'}
              </button>
            </div>

            {showHint && (
              <p className="text-xs text-slate-600 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <MathText text={note.quickCheck.hint} />
              </p>
            )}
            {showSolution && (
              <p className="text-xs text-slate-700 p-3 bg-blue-50/70 rounded-lg border border-blue-200">
                <MathText text={note.quickCheck.solution} />
              </p>
            )}
          </section>
        </div>

        {/* Bottom Prev / Next & Past Paper Quick Links */}
        <footer className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {prev && (
              <button
                type="button"
                onClick={() =>
                  onNavigate({
                    view: 'notes',
                    chapterId: prev.chapterId,
                    topicId: prev.id,
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>
                  {prev.code} {prev.title}
                </span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate({ view: 'past-papers' })}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              0580 Past Papers
            </button>
            {next && (
              <button
                type="button"
                onClick={() =>
                  onNavigate({
                    view: 'notes',
                    chapterId: next.chapterId,
                    topicId: next.id,
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg cursor-pointer"
              >
                <span>
                  Next: {next.code} {next.title}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
};
