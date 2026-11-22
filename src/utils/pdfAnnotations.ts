export interface NormalizedPoint {
  x: number; // 0..1 relative to page width
  y: number; // 0..1 relative to page height
}

export type AnnotationTool = 'pen' | 'highlighter' | 'eraser' | 'pan';

export interface AnnotationStroke {
  id: string;
  tool: 'pen' | 'highlighter';
  color: string;
  size: number; // stroke width in base CSS pixels at zoom 1.0
  points: NormalizedPoint[];
}

export type PaperAnnotationsMap = Record<number, AnnotationStroke[]>;

export interface AnnotationHistoryState {
  present: PaperAnnotationsMap;
  past: PaperAnnotationsMap[];
  future: PaperAnnotationsMap[];
}

export const ANNOTATION_STORAGE_PREFIX = 'cambridge_0580_pdf_notes_v1:';

export function clampNormalized(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function normalizePointerToPage(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number }
): NormalizedPoint {
  const width = rect.width > 0 ? rect.width : 1;
  const height = rect.height > 0 ? rect.height : 1;
  return {
    x: clampNormalized((clientX - rect.left) / width),
    y: clampNormalized((clientY - rect.top) / height),
  };
}

function pointToSegmentDistance(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) {
    return Math.hypot(px - ax, py - ay);
  }
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq));
  const projX = ax + t * dx;
  const projY = ay + t * dy;
  return Math.hypot(px - projX, py - projY);
}

export function isPointNearStroke(
  point: NormalizedPoint,
  stroke: AnnotationStroke,
  normalizedRadius: number
): boolean {
  if (stroke.points.length === 0) return false;
  if (stroke.points.length === 1) {
    const p = stroke.points[0];
    return Math.hypot(point.x - p.x, point.y - p.y) <= normalizedRadius;
  }
  for (let i = 0; i < stroke.points.length - 1; i++) {
    const a = stroke.points[i];
    const b = stroke.points[i + 1];
    if (pointToSegmentDistance(point.x, point.y, a.x, a.y, b.x, b.y) <= normalizedRadius) {
      return true;
    }
  }
  return false;
}

export function eraseStrokesNearPoint(
  strokes: AnnotationStroke[],
  point: NormalizedPoint,
  normalizedRadius = 0.02
): { remaining: AnnotationStroke[]; removedAny: boolean } {
  let removedAny = false;
  const remaining = strokes.filter((stroke) => {
    const hit = isPointNearStroke(point, stroke, normalizedRadius);
    if (hit) removedAny = true;
    return !hit;
  });
  return { remaining, removedAny };
}

export function cloneAnnotationsMap(map: PaperAnnotationsMap): PaperAnnotationsMap {
  const copy: PaperAnnotationsMap = {};
  for (const [pageKey, list] of Object.entries(map)) {
    const pageNum = Number(pageKey);
    if (!Number.isNaN(pageNum) && Array.isArray(list) && list.length > 0) {
      copy[pageNum] = list.map((s) => ({
        ...s,
        points: s.points.map((pt) => ({ x: pt.x, y: pt.y })),
      }));
    }
  }
  return copy;
}

export function createInitialAnnotationHistory(
  initial: PaperAnnotationsMap = {}
): AnnotationHistoryState {
  return {
    present: cloneAnnotationsMap(initial),
    past: [],
    future: [],
  };
}

export function pushAnnotationHistory(
  state: AnnotationHistoryState,
  nextPresent: PaperAnnotationsMap,
  maxHistory = 40
): AnnotationHistoryState {
  const past = [...state.past, cloneAnnotationsMap(state.present)].slice(-maxHistory);
  return {
    present: cloneAnnotationsMap(nextPresent),
    past,
    future: [],
  };
}

export function undoAnnotationHistory(
  state: AnnotationHistoryState
): AnnotationHistoryState {
  if (state.past.length === 0) return state;
  const previous = state.past[state.past.length - 1];
  return {
    present: cloneAnnotationsMap(previous),
    past: state.past.slice(0, -1),
    future: [cloneAnnotationsMap(state.present), ...state.future].slice(0, 40),
  };
}

export function redoAnnotationHistory(
  state: AnnotationHistoryState
): AnnotationHistoryState {
  if (state.future.length === 0) return state;
  const [next, ...restFuture] = state.future;
  return {
    present: cloneAnnotationsMap(next),
    past: [...state.past, cloneAnnotationsMap(state.present)].slice(-40),
    future: restFuture,
  };
}

export function countTotalStrokes(map: PaperAnnotationsMap): number {
  return Object.values(map).reduce((sum, list) => sum + list.length, 0);
}

export function parseAnnotationsJson(raw: string | null): PaperAnnotationsMap {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const sanitized: PaperAnnotationsMap = {};
    for (const [pageStr, list] of Object.entries(parsed as Record<string, unknown>)) {
      const pageNum = Number(pageStr);
      if (!Number.isInteger(pageNum) || pageNum < 1 || !Array.isArray(list)) continue;
      const validStrokes: AnnotationStroke[] = [];
      for (const item of list) {
        if (!item || typeof item !== 'object') continue;
        const candidate = item as Partial<AnnotationStroke>;
        if (
          typeof candidate.id === 'string' &&
          (candidate.tool === 'pen' || candidate.tool === 'highlighter') &&
          typeof candidate.color === 'string' &&
          typeof candidate.size === 'number' &&
          Array.isArray(candidate.points) &&
          candidate.points.length > 0
        ) {
          const points = candidate.points
            .filter(
              (p): p is NormalizedPoint =>
                Boolean(p) &&
                typeof p.x === 'number' &&
                typeof p.y === 'number' &&
                Number.isFinite(p.x) &&
                Number.isFinite(p.y)
            )
            .map((p) => ({ x: clampNormalized(p.x), y: clampNormalized(p.y) }));
          if (points.length > 0) {
            validStrokes.push({
              id: candidate.id,
              tool: candidate.tool,
              color: candidate.color,
              size: Math.max(1, Math.min(48, candidate.size)),
              points,
            });
          }
        }
      }
      if (validStrokes.length > 0) {
        sanitized[pageNum] = validStrokes;
      }
    }
    return sanitized;
  } catch {
    return {};
  }
}

export function loadPaperAnnotations(storageKey: string): PaperAnnotationsMap {
  if (typeof window === 'undefined') return {};
  try {
    return parseAnnotationsJson(
      window.localStorage.getItem(`${ANNOTATION_STORAGE_PREFIX}${storageKey}`)
    );
  } catch {
    return {};
  }
}

export function savePaperAnnotations(
  storageKey: string,
  annotations: PaperAnnotationsMap
): void {
  if (typeof window === 'undefined') return;
  try {
    const key = `${ANNOTATION_STORAGE_PREFIX}${storageKey}`;
    if (countTotalStrokes(annotations) === 0) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(annotations));
    }
  } catch {
    // ignore storage quota errors cleanly
  }
}

export function renderStrokesToCanvas(
  ctx: CanvasRenderingContext2D,
  strokes: AnnotationStroke[],
  widthPx: number,
  heightPx: number,
  scaleFactor = 1
): void {
  for (const stroke of strokes) {
    if (stroke.points.length === 0) continue;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = stroke.color;
    ctx.fillStyle = stroke.color;
    ctx.globalAlpha = stroke.tool === 'highlighter' ? 0.34 : 1;
    const lineWidth = stroke.size * scaleFactor;
    ctx.lineWidth = lineWidth;

    if (stroke.points.length === 1) {
      const pt = stroke.points[0];
      ctx.beginPath();
      ctx.arc(pt.x * widthPx, pt.y * heightPx, Math.max(1, lineWidth / 2), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      continue;
    }

    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x * widthPx, stroke.points[0].y * heightPx);
    for (let i = 1; i < stroke.points.length - 1; i++) {
      const curr = stroke.points[i];
      const next = stroke.points[i + 1];
      const midX = ((curr.x + next.x) / 2) * widthPx;
      const midY = ((curr.y + next.y) / 2) * heightPx;
      ctx.quadraticCurveTo(curr.x * widthPx, curr.y * heightPx, midX, midY);
    }
    const last = stroke.points[stroke.points.length - 1];
    ctx.lineTo(last.x * widthPx, last.y * heightPx);
    ctx.stroke();
    ctx.restore();
  }
}

export function hasPdfHeader(bytes: Uint8Array): boolean {
  if (bytes.length < 5) return false;
  const limit = Math.min(bytes.length - 4, 1024);
  for (let i = 0; i < limit; i++) {
    // Check for ASCII "%PDF-" (0x25, 0x50, 0x44, 0x46, 0x2D)
    if (
      bytes[i] === 0x25 &&
      bytes[i + 1] === 0x50 &&
      bytes[i + 2] === 0x44 &&
      bytes[i + 3] === 0x46 &&
      bytes[i + 4] === 0x2d
    ) {
      return true;
    }
  }
  return false;
}

export interface ScrollThumbMetrics {
  canScroll: boolean;
  thumbHeight: number;
  thumbTop: number;
  progress: number;
}

export function computeScrollThumbMetrics(params: {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
  trackHeight: number;
  minThumbHeight?: number;
}): ScrollThumbMetrics {
  const {
    scrollTop,
    scrollHeight,
    clientHeight,
    trackHeight,
    minThumbHeight = 56,
  } = params;

  const maxScroll = Math.max(0, scrollHeight - clientHeight);
  if (maxScroll <= 1 || trackHeight <= 0 || scrollHeight <= 0) {
    return {
      canScroll: false,
      thumbHeight: Math.max(0, trackHeight),
      thumbTop: 0,
      progress: 0,
    };
  }

  const ratio = Math.min(1, Math.max(0, clientHeight / scrollHeight));
  const rawThumb = Math.round(trackHeight * ratio);
  const thumbHeight = Math.min(trackHeight, Math.max(minThumbHeight, rawThumb));
  const maxThumbTop = Math.max(0, trackHeight - thumbHeight);
  const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));
  const thumbTop = Math.round(progress * maxThumbTop);

  return {
    canScroll: true,
    thumbHeight,
    thumbTop,
    progress,
  };
}

export function computeScrollTopFromTrackY(params: {
  pointerY: number;
  trackTop: number;
  trackHeight: number;
  thumbHeight: number;
  scrollHeight: number;
  clientHeight: number;
  grabOffsetRatio?: number;
}): number {
  const {
    pointerY,
    trackTop,
    trackHeight,
    thumbHeight,
    scrollHeight,
    clientHeight,
    grabOffsetRatio = 0.5,
  } = params;

  const maxScroll = Math.max(0, scrollHeight - clientHeight);
  const availableTrack = Math.max(1, trackHeight - thumbHeight);
  if (maxScroll <= 0) return 0;

  const desiredThumbTop = pointerY - trackTop - thumbHeight * grabOffsetRatio;
  const clampedThumbTop = Math.min(availableTrack, Math.max(0, desiredThumbTop));
  return Math.round((clampedThumbTop / availableTrack) * maxScroll);
}

export function estimateVisiblePage(params: {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
  numPages: number;
}): number {
  const { scrollTop, scrollHeight, clientHeight, numPages } = params;
  if (numPages <= 1 || scrollHeight <= 0) return 1;
  const centerY = scrollTop + clientHeight * 0.35;
  const ratio = Math.min(0.9999, Math.max(0, centerY / scrollHeight));
  return Math.min(numPages, Math.max(1, Math.floor(ratio * numPages) + 1));
}
