import type { PastPaperFile, PastPaperSession } from '../types/syllabus';
import { parsePapaCambridgeFilename } from './examLogic';

export const PAPACAMBRIDGE_BASE = 'https://pastpapers.papacambridge.com';
export const SUBJECT_PATH = '/papers/caie/igcse-mathematics-0580';

function buildFallbackSessions(): PastPaperSession[] {
  const list: PastPaperSession[] = [
    { slug: '2026-may-june', label: 'May / June 2026', year: 2026, series: 'May/June', url: `${PAPACAMBRIDGE_BASE}${SUBJECT_PATH}-2026-may-june` },
    { slug: '2026-march', label: 'Feb / March 2026', year: 2026, series: 'March', url: `${PAPACAMBRIDGE_BASE}${SUBJECT_PATH}-2026-march` },
  ];

  for (let year = 2025; year >= 2002; year -= 1) {
    if (year === 2002) {
      // Oct/Nov 2002 is the earliest session available in PapaCambridge's 0580 archive
      list.push({
        slug: '2002-nov',
        label: 'Oct / Nov 2002',
        year: 2002,
        series: 'Oct/Nov',
        url: `${PAPACAMBRIDGE_BASE}${SUBJECT_PATH}-2002-nov`,
      });
      continue;
    }

    const useShortSlugs = year <= 2017;
    const novSlug = useShortSlugs ? `${year}-nov` : `${year}-oct-nov`;
    const junSlug =
      year === 2020
        ? 'may-june-2020'
        : useShortSlugs
          ? `${year}-jun`
          : `${year}-may-june`;
    const marSlug =
      year === 2022
        ? '2022-feb-march'
        : useShortSlugs
          ? `${year}-mar`
          : `${year}-march`;

    list.push({
      slug: novSlug,
      label: `Oct / Nov ${year}`,
      year,
      series: 'Oct/Nov',
      url: `${PAPACAMBRIDGE_BASE}${SUBJECT_PATH}-${novSlug}`,
    });
    list.push({
      slug: junSlug,
      label: `May / June ${year}`,
      year,
      series: 'May/June',
      url: `${PAPACAMBRIDGE_BASE}${SUBJECT_PATH}-${junSlug}`,
    });
    if (year >= 2016) {
      list.push({
        slug: marSlug,
        label: `Feb / March ${year}`,
        year,
        series: 'March',
        url: `${PAPACAMBRIDGE_BASE}${SUBJECT_PATH}-${marSlug}`,
      });
    }
  }

  return list;
}

export const FALLBACK_SESSIONS: PastPaperSession[] = buildFallbackSessions();

export function formatSessionMetadata(slug: string): PastPaperSession {
  const yearMatch = slug.match(/(\d{4})/);
  const year = yearMatch ? Number(yearMatch[1]) : 2024;
  let series: PastPaperSession['series'] = 'May/June';
  let label = slug.replace(/-/g, ' ');

  if (slug.includes('topical')) {
    series = 'Topical';
    label = 'Topical Past Papers';
  } else if (slug.includes('specimen')) {
    series = 'Specimen';
    label = `${year} Specimen Papers`;
  } else if (slug.includes('may-june') || /(?:^|-)jun(?:e)?$/.test(slug)) {
    series = 'May/June';
    label = `May / June ${year}`;
  } else if (slug.includes('oct-nov') || /(?:^|-)nov(?:ember)?$/.test(slug)) {
    series = 'Oct/Nov';
    label = `Oct / Nov ${year}`;
  } else if (slug.includes('march') || /(?:^|-)mar(?:ch)?$/.test(slug)) {
    series = 'March';
    label = `Feb / March ${year}`;
  }

  return {
    slug,
    label,
    year,
    series,
    url: `${PAPACAMBRIDGE_BASE}${SUBJECT_PATH}-${slug}`,
  };
}

export function generateSessionPaperFallback(slug: string): PastPaperFile[] {
  const yearMatch = slug.match(/(\d{4})/);
  if (!yearMatch) return [];
  const year = Number(yearMatch[1]);
  const yy = yearMatch[1].slice(2);
  const code =
    slug.includes('march') || /(?:^|-)mar(?:ch)?$/.test(slug)
      ? 'm'
      : slug.includes('oct-nov') || /(?:^|-)nov(?:ember)?$/.test(slug)
        ? 'w'
        : 's';
  const papers = ['1', '2', '3', '4'];
  const files: PastPaperFile[] = [];

  // Cambridge introduced numbered zone variants in Oct/Nov 2009; earlier sessions (2002 – May/June 2009) used _1.._4
  const isSingleVariantEra = year < 2009 || (year === 2009 && code === 's');

  if (isSingleVariantEra) {
    for (const p of papers) {
      for (const kind of ['qp', 'ms']) {
        const fn = `0580_${code}${yy}_${kind}_${p}.pdf`;
        files.push(
          parsePapaCambridgeFilename(
            fn,
            `${PAPACAMBRIDGE_BASE}/directories/CAIE/CAIE-pastpapers/upload/${fn}`,
            slug
          )
        );
      }
    }
  } else {
    const variants = code === 'm' ? ['2'] : ['1', '2', '3'];
    for (const p of papers) {
      for (const v of variants) {
        for (const kind of ['qp', 'ms']) {
          const fn = `0580_${code}${yy}_${kind}_${p}${v}.pdf`;
          files.push(
            parsePapaCambridgeFilename(
              fn,
              `${PAPACAMBRIDGE_BASE}/directories/CAIE/CAIE-pastpapers/upload/${fn}`,
              slug
            )
          );
        }
      }
    }
  }

  if (year >= 2008) {
    files.push(
      parsePapaCambridgeFilename(
        `0580_${code}${yy}_gt.pdf`,
        `${PAPACAMBRIDGE_BASE}/directories/CAIE/CAIE-pastpapers/upload/0580_${code}${yy}_gt.pdf`,
        slug
      )
    );
  }

  files.push(
    parsePapaCambridgeFilename(
      `0580_${code}${yy}_er.pdf`,
      `${PAPACAMBRIDGE_BASE}/directories/CAIE/CAIE-pastpapers/upload/0580_${code}${yy}_er.pdf`,
      slug
    )
  );
  return files;
}

export function parseSessionsFromHtml(html: string): PastPaperSession[] {
  const regex =
    /href="(?:https:\/\/pastpapers\.papacambridge\.com\/)?papers\/caie\/igcse-mathematics-0580-([a-z0-9-]+)"/gi;
  const seenKeys = new Set<string>();
  const sessions: PastPaperSession[] = [];

  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const slug = match[1].toLowerCase();
    if (
      slug.includes('syllabus') ||
      slug.includes('timetable') ||
      !/^(?:\d{4}-(may-june|oct-nov|march|feb-march|jun|nov|mar|specimen)|may-june-\d{4})$/.test(slug)
    ) {
      continue;
    }
    const meta = formatSessionMetadata(slug);
    const canonicalKey = `${meta.year}-${meta.series}`;
    if (!seenKeys.has(canonicalKey)) {
      seenKeys.add(canonicalKey);
      sessions.push(meta);
    }
  }

  return sessions;
}

export function parsePapersFromHtml(html: string, sessionSlug: string): PastPaperFile[] {
  const pdfRegex =
    /(?:files=|href=")(https:\/\/pastpapers\.papacambridge\.com\/[^"&]+\.pdf)/gi;
  const seen = new Set<string>();
  const files: PastPaperFile[] = [];

  let match: RegExpExecArray | null;
  while ((match = pdfRegex.exec(html)) !== null) {
    const pdfUrl = match[1];
    const filename = pdfUrl.split('/').pop() || '';
    if (!/^0580[_-]/i.test(filename)) {
      continue;
    }
    if (!seen.has(pdfUrl)) {
      seen.add(pdfUrl);
      files.push(parsePapaCambridgeFilename(filename, pdfUrl, sessionSlug));
    }
  }

  return files;
}

export function isAllowedPapaCambridgePdfUrl(rawUrl: string): URL | null {
  try {
    const parsed = new URL(rawUrl);
    if (
      parsed.protocol !== 'https:' ||
      parsed.hostname !== 'pastpapers.papacambridge.com' ||
      !parsed.pathname.toLowerCase().endsWith('.pdf')
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function buildGoogleDocsViewerUrl(pdfUrl: string): string {
  return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;
}

export function resolvePdfIframeUrl(
  pdfUrl: string,
  options: { apiProxyAvailable: boolean; viewerMode: 'proxy' | 'web' }
): string {
  if (options.apiProxyAvailable && options.viewerMode === 'proxy') {
    return `/api/papacambridge/pdf?url=${encodeURIComponent(pdfUrl)}`;
  }
  return buildGoogleDocsViewerUrl(pdfUrl);
}

const sessionCache: { data: PastPaperSession[]; expiresAt: number } = {
  data: [],
  expiresAt: 0,
};

const papersCache = new Map<string, { data: PastPaperFile[]; expiresAt: number }>();

export async function fetchPapaCambridgeSessions(): Promise<{
  sessions: PastPaperSession[];
  source: 'live' | 'fallback';
}> {
  if (sessionCache.data.length > 0 && Date.now() < sessionCache.expiresAt) {
    return { sessions: sessionCache.data, source: 'live' };
  }

  try {
    const resp = await fetch(`${PAPACAMBRIDGE_BASE}${SUBJECT_PATH}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Cambridge0580StudyAssistant/1.0)',
      },
      signal: AbortSignal.timeout(4500),
    });

    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }

    const html = await resp.text();
    const sessions = parseSessionsFromHtml(html);

    if (sessions.length > 0) {
      const existingKeys = new Set(sessions.map((s) => `${s.year}-${s.series}`));
      const seriesRank: Record<PastPaperSession['series'], number> = {
        'Oct/Nov': 3,
        'May/June': 2,
        March: 1,
        Specimen: 0,
        Topical: -1,
      };
      const merged = [
        ...sessions,
        ...FALLBACK_SESSIONS.filter((fs) => !existingKeys.has(`${fs.year}-${fs.series}`)),
      ].sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year;
        return (seriesRank[b.series] ?? 0) - (seriesRank[a.series] ?? 0);
      });
      sessionCache.data = merged;
      sessionCache.expiresAt = Date.now() + 1000 * 60 * 30;
      return { sessions: merged, source: 'live' };
    }
  } catch {
    // Graceful fallback below
  }

  return { sessions: FALLBACK_SESSIONS, source: 'fallback' };
}

export async function fetchPapaCambridgePapers(slug: string): Promise<{
  papers: PastPaperFile[];
  source: 'live' | 'fallback';
}> {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, '');
  const cached = papersCache.get(safeSlug);
  if (cached && Date.now() < cached.expiresAt) {
    return { papers: cached.data, source: 'live' };
  }

  try {
    const targetUrl = `${PAPACAMBRIDGE_BASE}${SUBJECT_PATH}-${safeSlug}`;
    const resp = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Cambridge0580StudyAssistant/1.0)',
      },
      signal: AbortSignal.timeout(4500),
    });

    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }

    const html = await resp.text();
    const files = parsePapersFromHtml(html, safeSlug);

    if (files.length > 0) {
      papersCache.set(safeSlug, {
        data: files,
        expiresAt: Date.now() + 1000 * 60 * 30,
      });
      return { papers: files, source: 'live' };
    }
  } catch {
    // Graceful fallback below
  }

  return {
    papers: generateSessionPaperFallback(safeSlug),
    source: 'fallback',
  };
}
