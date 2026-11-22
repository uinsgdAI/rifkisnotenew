import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Columns2,
  Download,
  ExternalLink,
  Eye,
  Loader2,
  Pen,
  Search,
  Upload,
  X,
} from 'lucide-react';
import { ALL_SUBTOPICS_0580, SYLLABUS_0580 } from '../data/syllabus0580';
import type { AppRoute, PastPaperFile, PastPaperSession, SubtopicNote } from '../types/syllabus';
import { findMatchingSyllabusTopics } from '../utils/examLogic';
import {
  FALLBACK_SESSIONS,
  generateSessionPaperFallback,
  resolvePdfIframeUrl,
} from '../utils/papacambridge';
import { KaTeXFormula, MathText } from './MathText';
import { PdfAnnotator } from './PdfAnnotator';

interface PastPapersViewProps {
  initialSessionSlug?: string;
  initialPaperFilename?: string;
  weakTopicIds: string[];
  onFlagWeakTopics: (topicIds: string[]) => void;
  onClearWeakTopic: (topicId: string) => void;
  onNavigate: (route: AppRoute) => void;
}

async function fetchJsonSafe<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    throw new Error('Non-JSON response (static host without API functions)');
  }
  return (await res.json()) as T;
}

const DOC_TYPE_ORDER: Record<PastPaperFile['docType'], number> = {
  QP: 0,
  MS: 1,
  IN: 2,
  ER: 3,
  GT: 4,
  OTHER: 5,
};

const QUICK_TROUBLE_TOPICS = [
  { label: 'Transversal lines', query: 'transversal' },
  { label: 'Exclusive & independent', query: 'exclusive independent' },
  { label: 'Tree diagrams', query: 'tree' },
  { label: 'Bearings (Extended)', query: 'bearing' },
  { label: 'Sine & Cosine rules', query: 'sine cosine' },
  { label: 'Polygon angles', query: 'polygon' },
  { label: 'Histograms', query: 'histogram' },
  { label: 'Cumulative frequency', query: 'cumulative' },
  { label: 'Circle theorems', query: 'circle theorem' },
];

export const PastPapersView: React.FC<PastPapersViewProps> = ({
  initialSessionSlug,
  initialPaperFilename,
  weakTopicIds,
  onFlagWeakTopics,
  onClearWeakTopic,
  onNavigate,
}) => {
  const [sessions, setSessions] = useState<PastPaperSession[]>(FALLBACK_SESSIONS);
  const [selectedSession, setSelectedSession] = useState<string>(
    initialSessionSlug || '2024-may-june'
  );
  const [papers, setPapers] = useState<PastPaperFile[]>(() =>
    generateSessionPaperFallback(initialSessionSlug || '2024-may-june')
  );
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [loadingPapers, setLoadingPapers] = useState(true);
  const [apiProxyAvailable, setApiProxyAvailable] = useState(false);
  const [viewerMode, setViewerMode] = useState<'annotate' | 'proxy' | 'web'>('annotate');
  const [localPdf, setLocalPdf] = useState<{ url: string; filename: string } | null>(null);
  const localFileInputRef = useRef<HTMLInputElement | null>(null);
  const [eraFilter, setEraFilter] = useState<'all' | '2020-2026' | '2010-2019' | '2002-2009'>('all');
  const [paperFilter, setPaperFilter] = useState<'all' | '1' | '2' | '3' | '4'>('all');
  const [docFilter, setDocFilter] = useState<'all' | 'QP' | 'MS' | 'ER' | 'GT'>('all');
  const [activePrimaryPdf, setActivePrimaryPdf] = useState<PastPaperFile | null>(null);
  const [activeSecondaryPdf, setActiveSecondaryPdf] = useState<PastPaperFile | null>(null);
  const [topicQuery, setTopicQuery] = useState('');
  const [quickRefTopic, setQuickRefTopic] = useState<SubtopicNote | null>(null);
  const [drawerQuery, setDrawerQuery] = useState('');

  useEffect(() => {
    if (!quickRefTopic) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickRefTopic(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickRefTopic]);

  useEffect(() => {
    return () => {
      if (localPdf?.url) {
        URL.revokeObjectURL(localPdf.url);
      }
    };
  }, [localPdf]);

  useEffect(() => {
    let cancelled = false;
    fetchJsonSafe<{ ok?: boolean }>('/api/health')
      .then((h) => {
        if (cancelled) return;
        if (h?.ok) setApiProxyAvailable(true);
      })
      .catch(() => {
        if (cancelled) return;
        setApiProxyAvailable(false);
        setViewerMode((prev) => (prev === 'annotate' ? 'web' : prev));
      });

    setLoadingSessions(true);
    fetchJsonSafe<{ sessions?: PastPaperSession[] }>('/api/papacambridge/sessions')
      .then((data) => {
        if (cancelled) return;
        const list =
          Array.isArray(data.sessions) && data.sessions.length > 0
            ? data.sessions
            : FALLBACK_SESSIONS;
        setSessions(list);
        setApiProxyAvailable(true);
        if (!initialSessionSlug && list.length > 0) {
          const defaultSess =
            list.find((s) => s.slug === '2024-may-june')?.slug || list[0].slug;
          setSelectedSession(defaultSess);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setApiProxyAvailable(false);
        setViewerMode((prev) => (prev === 'annotate' ? 'web' : prev));
        setSessions(FALLBACK_SESSIONS);
      })
      .finally(() => {
        if (!cancelled) setLoadingSessions(false);
      });
    return () => {
      cancelled = true;
    };
  }, [initialSessionSlug]);

  useEffect(() => {
    if (!selectedSession) return;
    let cancelled = false;
    setLoadingPapers(true);
    fetchJsonSafe<{ papers?: PastPaperFile[] }>(
      `/api/papacambridge/papers?session=${encodeURIComponent(selectedSession)}`
    )
      .then((data) => {
        if (cancelled) return;
        const list =
          Array.isArray(data.papers) && data.papers.length > 0
            ? data.papers
            : generateSessionPaperFallback(selectedSession);
        setPapers(list);
        setApiProxyAvailable(true);
      })
      .catch(() => {
        if (cancelled) return;
        setApiProxyAvailable(false);
        setPapers(generateSessionPaperFallback(selectedSession));
      })
      .finally(() => {
        if (!cancelled) setLoadingPapers(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedSession]);

  useEffect(() => {
    if (initialSessionSlug && initialSessionSlug !== selectedSession) {
      setSelectedSession(initialSessionSlug);
    }
  }, [initialSessionSlug, selectedSession]);

  useEffect(() => {
    if (!initialPaperFilename) return;
    const match = papers.find(
      (p) => p.filename.toLowerCase() === initialPaperFilename.toLowerCase()
    );
    if (match) {
      setActivePrimaryPdf(match);
      const ms = papers.find(
        (p) =>
          p.docType === 'MS' &&
          p.paperNumber === match.paperNumber &&
          p.variant === match.variant
      );
      setActiveSecondaryPdf(ms || null);
    }
  }, [initialPaperFilename, papers]);

  const visibleSessions = useMemo(() => {
    if (eraFilter === 'all') return sessions;
    return sessions.filter((s) => {
      if (eraFilter === '2020-2026') return s.year >= 2020;
      if (eraFilter === '2010-2019') return s.year >= 2010 && s.year <= 2019;
      return s.year >= 2002 && s.year <= 2009;
    });
  }, [sessions, eraFilter]);

  const handleSessionChange = (slug: string) => {
    setSelectedSession(slug);
    setActivePrimaryPdf(null);
    setActiveSecondaryPdf(null);
    onNavigate({ view: 'past-papers', sessionSlug: slug });
  };

  const handleEraChange = (era: 'all' | '2020-2026' | '2010-2019' | '2002-2009') => {
    setEraFilter(era);
    const matching =
      era === 'all'
        ? sessions
        : sessions.filter((s) =>
            era === '2020-2026'
              ? s.year >= 2020
              : era === '2010-2019'
                ? s.year >= 2010 && s.year <= 2019
                : s.year >= 2002 && s.year <= 2009
          );
    if (matching.length > 0 && !matching.some((s) => s.slug === selectedSession)) {
      handleSessionChange(matching[0].slug);
    }
  };

  const filteredPapers = useMemo(() => {
    return papers
      .filter((p) => {
        const okPaper = paperFilter === 'all' || p.paperNumber === paperFilter;
        const okDoc = docFilter === 'all' || p.docType === docFilter;
        return okPaper && okDoc;
      })
      .sort((a, b) => {
        const docDiff = DOC_TYPE_ORDER[a.docType] - DOC_TYPE_ORDER[b.docType];
        if (docDiff !== 0) return docDiff;
        const paperA = a.paperNumber === '-' ? 99 : Number(a.paperNumber);
        const paperB = b.paperNumber === '-' ? 99 : Number(b.paperNumber);
        if (paperA !== paperB) return paperA - paperB;
        const varA = a.variant === '-' ? 99 : Number(a.variant);
        const varB = b.variant === '-' ? 99 : Number(b.variant);
        if (varA !== varB) return varA - varB;
        return a.filename.localeCompare(b.filename);
      });
  }, [papers, paperFilter, docFilter]);

  const findMatchingMarkScheme = (qp: PastPaperFile): PastPaperFile | undefined => {
    return papers.find(
      (p) =>
        p.docType === 'MS' &&
        p.paperNumber === qp.paperNumber &&
        p.variant === qp.variant
    );
  };

  const openSplitView = (qp: PastPaperFile) => {
    if (localPdf) setLocalPdf(null);
    setActivePrimaryPdf(qp);
    const ms = findMatchingMarkScheme(qp);
    setActiveSecondaryPdf(ms || null);
    if (apiProxyAvailable) {
      setViewerMode('annotate');
    }
  };

  const handleOpenLocalPdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    setLocalPdf({ url: blobUrl, filename: file.name });
    setActivePrimaryPdf(null);
    setActiveSecondaryPdf(null);
    setViewerMode('annotate');
    e.target.value = '';
  };

  const pdfBytesUrl = (file: PastPaperFile) =>
    `/api/papacambridge/pdf?url=${encodeURIComponent(file.url)}`;

  const pdfDownloadUrl = (file: PastPaperFile) =>
    apiProxyAvailable ? pdfBytesUrl(file) : file.url;

  const pdfIframeUrl = (file: PastPaperFile) =>
    resolvePdfIframeUrl(file.url, {
      apiProxyAvailable,
      viewerMode: viewerMode === 'web' ? 'web' : 'proxy',
    });

  const topicMatches = useMemo(
    () => findMatchingSyllabusTopics(topicQuery, SYLLABUS_0580, 6),
    [topicQuery]
  );

  const drawerMatches = useMemo(() => {
    if (!drawerQuery.trim()) {
      const defaults = ['8.3', '8.4', '4.6', '4.3', '6.5', '4.8', '9.7', '5.3'];
      return defaults
        .map((id) => ALL_SUBTOPICS_0580.find((t) => t.id === id))
        .filter((t): t is SubtopicNote => Boolean(t));
    }
    return findMatchingSyllabusTopics(drawerQuery, SYLLABUS_0580, 8).map((m) => m.topic);
  }, [drawerQuery]);

  const openQuickRef = (topic?: SubtopicNote) => {
    if (topic) {
      setQuickRefTopic(topic);
      return;
    }
    const fallback =
      topicMatches[0]?.topic ||
      ALL_SUBTOPICS_0580.find((t) => t.id === '8.3') ||
      ALL_SUBTOPICS_0580[0];
    setQuickRefTopic(fallback);
  };

  const flaggedTopics = useMemo(
    () =>
      weakTopicIds
        .map((id) => ALL_SUBTOPICS_0580.find((t) => t.id === id))
        .filter((t): t is NonNullable<typeof t> => Boolean(t)),
    [weakTopicIds]
  );

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <section className="p-6 bg-white border border-slate-200 rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 flex items-center gap-2 mb-1">
            <span>Cambridge IGCSE Mathematics (0580)</span>
            <span aria-hidden="true">·</span>
            <span>PapaCambridge Archive</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Past Papers, Mark Schemes & Grade Thresholds
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Browse Cambridge 0580 Question Papers, Mark Schemes, Examiner Reports, and Grade Thresholds from 2002 to 2026 via PapaCambridge, and view QP + MS side-by-side.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1 shrink-0">
          <div className="font-semibold text-slate-800">2025–2027 Paper Structure</div>
          <div>Core: Paper 1 (Non-Calc, 1h 30m) · Paper 3 (Calc, 1h 30m)</div>
          <div>Extended: Paper 2 (Non-Calc, 2h) · Paper 4 (Calc, 2h)</div>
        </div>
      </section>

      {/* Controls Bar */}
      <section className="p-4 bg-white border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <div className="text-[11px] font-medium text-slate-500 mb-1">Archive Era</div>
            <div role="group" aria-label="Filter archive by era" className="flex gap-1 p-1 bg-slate-100 rounded-lg">
              {(
                [
                  { id: 'all', label: 'All (02–26)' },
                  { id: '2020-2026', label: '2020–26' },
                  { id: '2010-2019', label: '2010–19' },
                  { id: '2002-2009', label: '2002–09' },
                ] as const
              ).map((era) => (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => handleEraChange(era.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer whitespace-nowrap ${
                    eraFilter === era.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {era.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="session-select" className="block text-[11px] font-medium text-slate-500 mb-1">
              Exam Session ({visibleSessions.length})
            </label>
            <select
              id="session-select"
              value={selectedSession}
              disabled={loadingSessions}
              onChange={(e) => handleSessionChange(e.target.value)}
              className="min-w-[190px] px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
            >
              {!visibleSessions.some((s) => s.slug === selectedSession) && (
                <option value={selectedSession}>{selectedSession}</option>
              )}
              {visibleSessions.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="text-[11px] font-medium text-slate-500 mb-1">Component Paper</div>
            <div role="group" aria-label="Filter by paper component" className="flex gap-1 p-1 bg-slate-100 rounded-lg">
              {(['all', '1', '2', '3', '4'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPaperFilter(p)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer whitespace-nowrap ${
                    paperFilter === p ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {p === 'all' ? 'All Papers' : `Paper ${p}`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-medium text-slate-500 mb-1">Document Type</div>
            <div role="group" aria-label="Filter by document type" className="flex gap-1 p-1 bg-slate-100 rounded-lg">
              {(['all', 'QP', 'MS', 'ER', 'GT'] as const).map((dt) => (
                <button
                  key={dt}
                  type="button"
                  onClick={() => setDocFilter(dt)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer whitespace-nowrap ${
                    docFilter === dt ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {dt === 'all' ? 'All' : dt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={localFileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleOpenLocalPdf}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => localFileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 cursor-pointer whitespace-nowrap"
          >
            <Upload className="w-3.5 h-3.5 text-blue-700" />
            Annotate Local PDF
          </button>
          <div className="text-xs font-mono tabular-nums text-slate-500">
            {filteredPapers.length} files available
          </div>
        </div>
      </section>

      {/* Stuck on a Past Paper Question? Bridge directly to 0580 Topic Notes */}
      <section
        aria-label="Jump to Study Notes from Past Paper Mistakes"
        className="p-5 bg-white border border-slate-200 rounded-xl space-y-4"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-700 shrink-0" />
              <h2 className="font-display text-sm font-bold text-slate-900">
                Got a Question Wrong in This Past Paper? Jump to Its Notes
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Type the topic you struggled with while marking (for example, polygon angles, statistics, histogram, or circle theorems) to open the exact 0580 notes or save it to your revision queue.
            </p>
          </div>

          <div className="relative w-full lg:w-96 shrink-0">
            <label htmlFor="pastpaper-topic-finder" className="sr-only">
              Find 0580 notes for a past paper question topic
            </label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="pastpaper-topic-finder"
              type="search"
              value={topicQuery}
              onChange={(e) => setTopicQuery(e.target.value)}
              placeholder="What topic did you miss? (e.g. polygon, statistics)"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium text-slate-500">Common topics:</span>
          {QUICK_TROUBLE_TOPICS.map((item) => {
            const active = topicQuery.trim().toLowerCase() === item.query;
            return (
              <button
                key={item.query}
                type="button"
                onClick={() => setTopicQuery(active ? '' : item.query)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                  active
                    ? 'bg-blue-50 border-blue-200 text-blue-800'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {topicQuery.trim().length > 0 && (
          <div className="pt-2 border-t border-slate-200">
            {topicMatches.length === 0 ? (
              <div className="text-xs text-slate-500 py-2">
                No syllabus notes matched "{topicQuery}". Try keywords like polygon, histogram, statistics, bearings, or surds.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-3">
                {topicMatches.map((m) => {
                  const isFlagged = weakTopicIds.includes(m.topic.id);
                  return (
                    <div
                      key={m.topic.id}
                      className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="text-[11px] text-slate-500">
                          Chapter {m.chapterId}: {m.chapterTitle} · {m.matchReason}
                        </div>
                        <div className="font-display text-sm font-bold text-slate-900">
                          <span className="font-mono text-blue-700 mr-1.5">{m.topic.code}</span>
                          {m.topic.title}
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                          <MathText text={m.topic.summary} />
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => openQuickRef(m.topic)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Quick Reference
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            isFlagged
                              ? onClearWeakTopic(m.topic.id)
                              : onFlagWeakTopics([m.topic.id])
                          }
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border cursor-pointer ${
                            isFlagged
                              ? 'bg-amber-50 border-amber-200 text-amber-800'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {isFlagged && <Check className="w-3.5 h-3.5" />}
                          {isFlagged ? 'Flagged' : 'Flag Missed'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onFlagWeakTopics([m.topic.id]);
                            onNavigate({
                              view: 'notes',
                              chapterId: m.chapterId,
                              topicId: m.topic.id,
                            });
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg cursor-pointer"
                        >
                          Study {m.topic.code} Notes
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {flaggedTopics.length > 0 && (
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 mr-1">
              Revision Queue ({flaggedTopics.length}):
            </span>
            {flaggedTopics.map((ft) => (
              <div
                key={ft.id}
                className="inline-flex items-center bg-amber-50 border border-amber-200 rounded-lg overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => openQuickRef(ft)}
                  className="px-2 py-1 text-xs font-medium text-amber-800 hover:bg-amber-100 border-r border-amber-200 cursor-pointer"
                  aria-label={`Quick view ${ft.code} ${ft.title}`}
                >
                  Quick View
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onNavigate({
                      view: 'notes',
                      chapterId: ft.chapterId,
                      topicId: ft.id,
                    })
                  }
                  className="px-2.5 py-1 text-xs font-medium text-amber-900 hover:bg-amber-100 cursor-pointer"
                >
                  Study {ft.code} {ft.title} →
                </button>
                <button
                  type="button"
                  aria-label={`Remove ${ft.code} ${ft.title} from revision queue`}
                  onClick={() => onClearWeakTopic(ft.id)}
                  className="px-1.5 py-1 text-amber-700 hover:text-amber-950 hover:bg-amber-100 border-l border-amber-200 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Split-Screen PDF Viewer & Annotator when active */}
      {(activePrimaryPdf || localPdf) && (
        <section
          aria-label="Past Paper Document Viewer"
          className="bg-white border border-slate-200 rounded-xl overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-800">
              <span className="font-semibold">
                {localPdf ? localPdf.filename : activePrimaryPdf?.filename}
              </span>
              {activeSecondaryPdf && (
                <>
                  <span aria-hidden="true">+</span>
                  <span className="font-semibold text-emerald-800">
                    {activeSecondaryPdf.filename}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {!localPdf && (
                <div
                  role="group"
                  aria-label="PDF viewer engine"
                  className="inline-flex p-0.5 bg-slate-200/80 rounded-lg"
                >
                  {apiProxyAvailable && (
                    <button
                      type="button"
                      onClick={() => setViewerMode('annotate')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer ${
                        viewerMode === 'annotate'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600'
                      }`}
                    >
                      <Pen className="w-3 h-3" />
                      Annotate (Draw)
                    </button>
                  )}
                  {apiProxyAvailable && (
                    <button
                      type="button"
                      onClick={() => setViewerMode('proxy')}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer ${
                        viewerMode === 'proxy'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600'
                      }`}
                    >
                      Native PDF
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setViewerMode('web')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer ${
                      viewerMode === 'web'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600'
                    }`}
                  >
                    Web Viewer
                  </button>
                </div>
              )}
              {activePrimaryPdf && (
                <a
                  href={activePrimaryPdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-700"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open QP
                </a>
              )}
              {activeSecondaryPdf && (
                <a
                  href={activeSecondaryPdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border border-emerald-200 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open MS
                </a>
              )}
              <button
                type="button"
                onClick={() => openQuickRef()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Syllabus & Formulae
              </button>
              <button
                type="button"
                onClick={() => {
                  setLocalPdf(null);
                  setActivePrimaryPdf(null);
                  setActiveSecondaryPdf(null);
                }}
                className="px-3 py-1.5 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Close Viewer
              </button>
            </div>
          </div>

          <div
            className={`grid gap-px bg-slate-200 ${
              activeSecondaryPdf ? 'lg:grid-cols-2' : 'grid-cols-1'
            }`}
          >
            <div className="bg-white min-w-0" data-testid="qp-pane">
              <div className="px-3 py-1.5 text-[11px] font-medium text-slate-500 border-b border-slate-200 flex items-center justify-between gap-2">
                <span>
                  {localPdf
                    ? `Local PDF Annotation — ${localPdf.filename}`
                    : `${activePrimaryPdf?.docTypeLabel} — ${activePrimaryPdf?.filename}`}
                </span>
                {activePrimaryPdf && (
                  <a
                    href={activePrimaryPdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline shrink-0"
                  >
                    Open in new tab
                  </a>
                )}
              </div>
              {localPdf ? (
                <PdfAnnotator
                  sourceUrl={localPdf.url}
                  paperKey={`local:${localPdf.filename}`}
                  paperTitle={localPdf.filename}
                />
              ) : activePrimaryPdf && viewerMode === 'annotate' ? (
                <PdfAnnotator
                  sourceUrl={pdfBytesUrl(activePrimaryPdf)}
                  externalUrl={activePrimaryPdf.url}
                  paperKey={activePrimaryPdf.filename}
                  paperTitle={activePrimaryPdf.filename}
                  onFallbackViewer={() => setViewerMode('web')}
                />
              ) : activePrimaryPdf ? (
                <iframe
                  title={activePrimaryPdf.filename}
                  src={pdfIframeUrl(activePrimaryPdf)}
                  className="w-full h-[640px] border-0 bg-slate-50"
                />
              ) : null}
            </div>

            {activeSecondaryPdf && (
              <div className="bg-white min-w-0" data-testid="ms-pane">
                <div className="px-3 py-1.5 text-[11px] font-medium text-emerald-700 border-b border-slate-200 flex items-center justify-between gap-2">
                  <span>Mark Scheme — {activeSecondaryPdf.filename}</span>
                  <a
                    href={activeSecondaryPdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline shrink-0"
                  >
                    Open in new tab
                  </a>
                </div>
                {viewerMode === 'annotate' ? (
                  <PdfAnnotator
                    sourceUrl={pdfBytesUrl(activeSecondaryPdf)}
                    externalUrl={activeSecondaryPdf.url}
                    paperKey={activeSecondaryPdf.filename}
                    paperTitle={activeSecondaryPdf.filename}
                    initialPenColorHex="#dc2626"
                    onFallbackViewer={() => setViewerMode('web')}
                  />
                ) : (
                  <iframe
                    title={activeSecondaryPdf.filename}
                    src={pdfIframeUrl(activeSecondaryPdf)}
                    className="w-full h-[640px] border-0 bg-slate-50"
                  />
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Papers List */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {loadingPapers && papers.length === 0 ? (
          <div className="p-12 flex items-center justify-center gap-3 text-sm text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading 0580 papers from PapaCambridge...
          </div>
        ) : filteredPapers.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            No papers match the selected filter in this session.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                  <th className="py-3 px-4">File</th>
                  <th className="py-3 px-4">Document</th>
                  <th className="py-3 px-4">Paper / Variant</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPapers.map((file) => {
                  const hasMs = file.docType === 'QP' && Boolean(findMatchingMarkScheme(file));
                  const isActiveRow = activePrimaryPdf?.filename === file.filename;
                  return (
                    <tr
                      key={file.filename}
                      className={`transition-colors ${
                        isActiveRow ? 'bg-blue-50/70' : 'hover:bg-slate-50/70'
                      }`}
                    >
                      <td className="py-3 px-4 font-mono text-xs text-slate-900 font-medium">
                        {file.filename}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-700">
                        {file.docTypeLabel}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs tabular-nums text-slate-600">
                        {file.paperNumber !== '-'
                          ? file.variant !== '-'
                            ? `Paper ${file.paperNumber} · Variant ${file.variant}`
                            : `Paper ${file.paperNumber} · All Zones`
                          : 'Session Document'}
                      </td>
                      <td className="py-3 px-4 text-xs">
                        <span
                          className={
                            file.tier === 'Extended'
                              ? 'text-amber-800 font-medium'
                              : 'text-slate-600'
                          }
                        >
                          {file.tier}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setLocalPdf(null);
                              setActivePrimaryPdf(file);
                              setActiveSecondaryPdf(null);
                              if (apiProxyAvailable) {
                                setViewerMode('annotate');
                              }
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-white hover:bg-slate-100 text-slate-700 cursor-pointer"
                          >
                            <Pen className="w-3.5 h-3.5" />
                            Annotate
                          </button>
                          {hasMs && (
                            <button
                              type="button"
                              onClick={() => openSplitView(file)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                            >
                              <Columns2 className="w-3.5 h-3.5" />
                              Split QP + MS
                            </button>
                          )}
                          <a
                            href={pdfDownloadUrl(file)}
                            target={apiProxyAvailable ? undefined : '_blank'}
                            rel={apiProxyAvailable ? undefined : 'noopener noreferrer'}
                            download={file.filename}
                            aria-label={`Download ${file.filename}`}
                            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* In-Page Quick Reference Drawer/Modal (preserves active Past Paper & Annotator state) */}
      {quickRefTopic && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quickref-dialog-title"
          className="fixed inset-0 z-50 bg-slate-900/50 flex justify-end"
          onClick={() => setQuickRefTopic(null)}
        >
          <div
            className="w-full max-w-2xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4 shrink-0">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs mb-1">
                  <span className="font-mono font-bold text-blue-700">
                    {quickRefTopic.code}
                  </span>
                  <span
                    className={
                      quickRefTopic.tier === 'Extended'
                        ? 'px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold'
                        : 'px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-medium'
                    }
                  >
                    {quickRefTopic.tier === 'Extended' ? 'Extended Only' : 'Core & Extended'}
                  </span>
                  <span className="text-slate-500">Quick Reference while Solving Past Papers</span>
                </div>
                <h2
                  id="quickref-dialog-title"
                  className="font-display text-lg font-bold text-slate-900"
                >
                  {quickRefTopic.title}
                </h2>
              </div>

              <button
                type="button"
                aria-label="Close quick reference"
                onClick={() => setQuickRefTopic(null)}
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/70 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Built-in Topic Switcher */}
            <div className="px-5 py-3 border-b border-slate-200 bg-white space-y-2 shrink-0">
              <div className="relative">
                <label htmlFor="quickref-search" className="sr-only">
                  Search any 0580 topic or formula inside Quick Reference
                </label>
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="quickref-search"
                  type="search"
                  value={drawerQuery}
                  onChange={(e) => setDrawerQuery(e.target.value)}
                  placeholder="Switch topic: transversal, exclusive, tree, bearing, sine rule, circle..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {drawerMatches.map((item) => {
                  const active = item.id === quickRefTopic.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setQuickRefTopic(item)}
                      className={`px-2 py-1 text-[11px] font-medium rounded border cursor-pointer ${
                        active
                          ? 'bg-blue-700 border-blue-700 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-mono mr-1">{item.code}</span>
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Syllabus Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              {quickRefTopic.bigIdea && (
                <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-800 mb-1">
                    Core Concept
                  </div>
                  <p className="text-xs leading-relaxed text-slate-800">
                    <MathText text={quickRefTopic.bigIdea} />
                  </p>
                </div>
              )}

              {/* Key Formulae & Rules */}
              {quickRefTopic.keyFormulas.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Key Rules & Formulae
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {quickRefTopic.keyFormulas.map((kf, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-slate-50 border border-slate-200"
                      >
                        <div className="text-[11px] font-semibold text-slate-700 mb-1">
                          {kf.label}
                        </div>
                        <div className="text-slate-900 overflow-x-auto">
                          <KaTeXFormula latex={kf.latex} />
                        </div>
                        {kf.note && (
                          <div className="text-[11px] text-slate-600 mt-1">
                            <MathText text={kf.note} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step-by-Step Exam Method */}
              {quickRefTopic.stepByStepMethod && quickRefTopic.stepByStepMethod.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Step-by-Step Exam Method
                  </h3>
                  <ol className="space-y-1.5 list-decimal list-inside text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                    {quickRefTopic.stepByStepMethod.map((step, i) => (
                      <li key={i} className="leading-relaxed">
                        <MathText text={step} />
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Comparison Table */}
              {quickRefTopic.comparisonTable && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Quick Comparison
                  </h3>
                  <div className="overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200">
                          {quickRefTopic.comparisonTable.headers.map((h, i) => (
                            <th key={i} className="py-2 px-3 font-semibold text-slate-800">
                              <MathText text={h} />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {quickRefTopic.comparisonTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="bg-white">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-2 px-3 text-slate-700 align-top">
                                <MathText text={cell} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Extended Objectives */}
              {quickRefTopic.extendedObjectives && quickRefTopic.extendedObjectives.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                    Extended (Paper 2 & Paper 4) Requirements
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700 bg-amber-50/70 border border-amber-200 rounded-lg p-3.5 list-disc list-inside">
                    {quickRefTopic.extendedObjectives.map((obj, idx) => (
                      <li key={idx}>
                        <MathText text={obj} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Worked Exam Examples */}
              {quickRefTopic.workedExamples.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Worked Exam Examples
                  </h3>
                  {quickRefTopic.workedExamples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs font-bold text-slate-900">{ex.title}</div>
                        <span className="font-mono text-[11px] font-semibold text-slate-500">
                          [{ex.marks} marks]
                        </span>
                      </div>
                      <p className="text-xs text-slate-700">
                        <MathText text={ex.question} />
                      </p>
                      <ol className="space-y-1 list-decimal list-inside text-xs text-slate-600 pl-1">
                        {ex.steps.map((s, sIdx) => (
                          <li key={sIdx}>
                            <MathText text={s} />
                          </li>
                        ))}
                      </ol>
                      <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded px-2.5 py-1.5">
                        Answer: <MathText text={ex.answer} />
                      </div>
                      {ex.markSchemeNotes && (
                        <div className="text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-700">Mark Scheme: </span>
                          <MathText text={ex.markSchemeNotes} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setQuickRefTopic(null)}
                className="px-3.5 py-2 text-xs font-semibold border border-slate-200 rounded-lg bg-white hover:bg-slate-100 text-slate-800 cursor-pointer"
              >
                Back to Past Paper
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = quickRefTopic;
                  setQuickRefTopic(null);
                  onNavigate({
                    view: 'notes',
                    chapterId: target.chapterId,
                    topicId: target.id,
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
              >
                Open Interactive Explorer & Full Notes ({quickRefTopic.code})
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
