import { useCallback, useEffect, useState } from 'react';
import { FormulaSheetModal } from './components/FormulaSheetModal';
import { Header } from './components/Header';
import { NotesView } from './components/NotesView';
import { PastPapersView } from './components/PastPapersView';
import { PracticeExamView } from './components/PracticeExamView';
import { ALL_SUBTOPICS_0580, findSubtopic } from './data/syllabus0580';
import type { AppRoute } from './types/syllabus';
import { buildAppRoutePath, parseAppRoute } from './utils/examLogic';

const STUDIED_STORAGE_KEY = 'cambridge_0580_studied_topics_v1';
const WEAK_STORAGE_KEY = 'cambridge_0580_weak_topics_v1';

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    parseAppRoute(window.location.pathname, window.location.search)
  );
  const [formulaModalOpen, setFormulaModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [studiedTopicIds, setStudiedTopicIds] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem(STUDIED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [weakTopicIds, setWeakTopicIds] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem(WEAK_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseAppRoute(window.location.pathname, window.location.search));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((nextRoute: AppRoute, explicitPath?: string) => {
    const nextPath = explicitPath ?? buildAppRoutePath(nextRoute);
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath);
    }
    setRoute(nextRoute);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const flagWeakTopics = useCallback((topicIds: string[]) => {
    if (topicIds.length === 0) return;
    setWeakTopicIds((prev) => {
      const next = Array.from(new Set([...prev, ...topicIds]));
      try {
        window.localStorage.setItem(WEAK_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage quota errors
      }
      return next;
    });
  }, []);

  const clearWeakTopic = useCallback((topicId: string) => {
    setWeakTopicIds((prev) => {
      if (!prev.includes(topicId)) return prev;
      const next = prev.filter((id) => id !== topicId);
      try {
        window.localStorage.setItem(WEAK_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage quota errors
      }
      return next;
    });
  }, []);

  const toggleStudied = useCallback((topicId: string) => {
    setStudiedTopicIds((prev) => {
      const willBeStudied = !prev.includes(topicId);
      const next = willBeStudied
        ? [...prev, topicId]
        : prev.filter((id) => id !== topicId);
      try {
        window.localStorage.setItem(STUDIED_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage quota errors
      }
      if (willBeStudied) {
        clearWeakTopic(topicId);
      }
      return next;
    });
  }, [clearWeakTopic]);

  const activeNote =
    route.view === 'notes'
      ? findSubtopic(route.chapterId, route.topicId) ||
        findSubtopic(1, '1.1') ||
        ALL_SUBTOPICS_0580[0]
      : ALL_SUBTOPICS_0580[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <Header
        activeView={route.view}
        onNavigate={navigate}
        onGoHome={() => navigate({ view: 'notes', chapterId: 1, topicId: '1.1' }, '/')}
        onOpenFormulaSheet={() => setFormulaModalOpen(true)}
        onStartQuickMock={() =>
          navigate({ view: 'practice', mode: 'mock-extended' })
        }
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((o) => !o)}
      />

      <div className="flex-1">
        {route.view === 'notes' && (
          <NotesView
            chapterId={activeNote.chapterId}
            topicId={activeNote.id}
            note={activeNote}
            studiedTopicIds={studiedTopicIds}
            weakTopicIds={weakTopicIds}
            onToggleStudied={toggleStudied}
            onClearWeakTopic={clearWeakTopic}
            onNavigate={navigate}
          />
        )}

        {route.view === 'past-papers' && (
          <PastPapersView
            initialSessionSlug={route.sessionSlug}
            initialPaperFilename={route.paperFilename}
            weakTopicIds={weakTopicIds}
            onFlagWeakTopics={flagWeakTopics}
            onClearWeakTopic={clearWeakTopic}
            onNavigate={navigate}
          />
        )}

        {route.view === 'practice' && (
          <PracticeExamView
            initialMode={route.mode}
            initialTopicId={route.topicId}
            onOpenFormulaSheet={() => setFormulaModalOpen(true)}
            onFlagWeakTopics={flagWeakTopics}
            onNavigate={navigate}
          />
        )}
      </div>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Cambridge IGCSE Mathematics (0580) · 2025–2027 Syllabus · Free Study Notes & Practice
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => navigate({ view: 'notes', chapterId: 1, topicId: '1.16' })}
              className="hover:text-slate-900 cursor-pointer"
            >
              1.16 Money
            </button>
            <button
              type="button"
              onClick={() => navigate({ view: 'past-papers' })}
              className="hover:text-slate-900 cursor-pointer"
            >
              PapaCambridge 0580 Papers
            </button>
            <button
              type="button"
              onClick={() => navigate({ view: 'practice' })}
              className="hover:text-slate-900 cursor-pointer"
            >
              Practice Exams
            </button>
          </div>
        </div>
      </footer>

      <FormulaSheetModal
        open={formulaModalOpen}
        onClose={() => setFormulaModalOpen(false)}
      />
    </div>
  );
}
