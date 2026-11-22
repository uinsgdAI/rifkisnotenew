import React, { useMemo, useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { ALL_SUBTOPICS_0580, SYLLABUS_0580 } from '../data/syllabus0580';

interface SyllabusSidebarProps {
  activeChapterId: number;
  activeTopicId: string;
  studiedTopicIds: string[];
  weakTopicIds?: string[];
  onSelectTopic: (chapterId: number, topicId: string) => void;
}

export const SyllabusSidebar: React.FC<SyllabusSidebarProps> = ({
  activeChapterId,
  activeTopicId,
  studiedTopicIds,
  weakTopicIds = [],
  onSelectTopic,
}) => {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 'core' | 'extended' | 'review'>('all');
  const [expandedChapters, setExpandedChapters] = useState<number[]>(() => [activeChapterId]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    );
  };

  const studiedSet = useMemo(() => new Set(studiedTopicIds), [studiedTopicIds]);
  const weakSet = useMemo(() => new Set(weakTopicIds), [weakTopicIds]);

  const filteredChapters = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SYLLABUS_0580.map((ch) => {
      const subtopics = ch.subtopics.filter((t) => {
        const matchesTier =
          tierFilter === 'all' ||
          (tierFilter === 'core' && t.tier === 'Core & Extended') ||
          (tierFilter === 'extended' && t.tier === 'Extended') ||
          (tierFilter === 'review' && weakSet.has(t.id));
        const matchesSearch =
          !q ||
          t.code.toLowerCase().includes(q) ||
          t.title.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q);
        return matchesTier && matchesSearch;
      });
      return { ...ch, subtopics };
    }).filter((ch) => ch.subtopics.length > 0);
  }, [search, tierFilter]);

  const isSearching = search.trim().length > 0 || tierFilter !== 'all';

  return (
    <aside
      aria-label="0580 Syllabus Curriculum"
      className="w-full lg:w-80 shrink-0 bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden"
    >
      <button
        type="button"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((o) => !o)}
        className="lg:hidden w-full px-4 py-3 flex items-center justify-between gap-2 text-left bg-white hover:bg-slate-50 cursor-pointer"
      >
        <span className="font-display text-xs font-bold text-slate-900">
          0580 Syllabus Topics · Active: {activeTopicId}
        </span>
        <span className="text-xs font-medium text-blue-700">
          {mobileOpen ? 'Hide' : 'Browse (72)'}
        </span>
      </button>

      <div className={`${mobileOpen ? 'block' : 'hidden'} lg:block`}>
      <div className="p-4 border-t lg:border-t-0 border-b border-slate-200 space-y-3">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-display text-sm font-bold text-slate-900">
            0580 Syllabus (2025–2027)
          </h2>
          <span className="font-mono text-xs tabular-nums text-slate-500">
            {studiedTopicIds.length}/{ALL_SUBTOPICS_0580.length} studied
          </span>
        </div>

        <div className="relative">
          <label htmlFor="syllabus-search" className="sr-only">
            Search 0580 topics
          </label>
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="syllabus-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by code or topic (e.g. 1.16, surds)"
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
          />
        </div>

        <div
          role="group"
          aria-label="Filter by syllabus tier"
          className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg"
        >
          <button
            type="button"
            onClick={() => setTierFilter('all')}
            className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              tierFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All (72)
          </button>
          <button
            type="button"
            onClick={() => setTierFilter('core')}
            className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              tierFilter === 'core'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Core
          </button>
          <button
            type="button"
            onClick={() => setTierFilter('extended')}
            className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              tierFilter === 'extended'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Extended
          </button>
        </div>

        {weakTopicIds.length > 0 && (
          <button
            type="button"
            onClick={() =>
              setTierFilter((f) => (f === 'review' ? 'all' : 'review'))
            }
            className={`w-full px-3 py-1.5 text-xs font-semibold rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
              tierFilter === 'review'
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-amber-50/50 border-amber-200 text-amber-800 hover:bg-amber-50'
            }`}
          >
            <span>Flagged from Wrong Answers</span>
            <span className="font-mono tabular-nums">{weakTopicIds.length}</span>
          </button>
        )}
      </div>

      <nav className="overflow-y-auto max-h-[68vh] lg:max-h-[calc(100vh-14rem)] divide-y divide-slate-100">
        {filteredChapters.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500">
            No syllabus topics match "{search}".
          </div>
        ) : (
          filteredChapters.map((chapter) => {
            const isExpanded =
              isSearching ||
              expandedChapters.includes(chapter.id) ||
              chapter.id === activeChapterId;

            return (
              <div key={chapter.id}>
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full px-4 py-3 flex items-center justify-between gap-2 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="font-display text-xs font-bold text-slate-900 truncate">
                      {chapter.id}. {chapter.title}
                    </div>
                    <div className="text-[11px] text-slate-500 tabular-nums mt-0.5">
                      {chapter.subtopics.length} subtopics
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <ul className="pb-2 px-2 space-y-0.5">
                    {chapter.subtopics.map((topic) => {
                      const isActive = topic.id === activeTopicId;
                      const isStudied = studiedSet.has(topic.id);

                      return (
                        <li key={topic.id}>
                          <button
                            type="button"
                            aria-current={isActive ? 'page' : undefined}
                            onClick={() => {
                              onSelectTopic(chapter.id, topic.id);
                              setMobileOpen(false);
                            }}
                            className={`w-full px-2.5 py-2 rounded-lg text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-blue-50 text-blue-800 font-semibold'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <div className="flex items-baseline gap-2 min-w-0">
                              <span
                                className={`font-mono text-xs tabular-nums shrink-0 ${
                                  isActive ? 'text-blue-700 font-semibold' : 'text-slate-400'
                                }`}
                              >
                                {topic.code}
                              </span>
                              <span className="text-xs truncate">{topic.title}</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {weakSet.has(topic.id) && (
                                <span
                                  className="w-2 h-2 rounded-full bg-amber-500"
                                  title="Flagged for revision"
                                  aria-label="Flagged for revision"
                                />
                              )}
                              {topic.tier === 'Extended' && (
                                <span className="text-[10px] font-mono text-amber-700">
                                  EXT
                                </span>
                              )}
                              {isStudied && (
                                <CheckCircle2
                                  className="w-3.5 h-3.5 text-emerald-600"
                                  aria-label="Studied"
                                />
                              )}
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </nav>
      </div>
    </aside>
  );
};
