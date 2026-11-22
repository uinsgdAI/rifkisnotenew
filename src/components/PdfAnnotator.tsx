import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Camera,
  ChevronDown,
  ChevronUp,
  Eraser,
  Hand,
  Highlighter,
  Loader2,
  Pen,
  Redo2,
  Trash2,
  Undo2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import {
  cloneAnnotationsMap,
  computeScrollThumbMetrics,
  computeScrollTopFromTrackY,
  countTotalStrokes,
  createInitialAnnotationHistory,
  eraseStrokesNearPoint,
  estimateVisiblePage,
  hasPdfHeader,
  loadPaperAnnotations,
  normalizePointerToPage,
  pushAnnotationHistory,
  redoAnnotationHistory,
  renderStrokesToCanvas,
  savePaperAnnotations,
  undoAnnotationHistory,
  type AnnotationHistoryState,
  type AnnotationStroke,
  type AnnotationTool,
  type PaperAnnotationsMap,
} from '../utils/pdfAnnotations';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

interface PdfAnnotatorProps {
  sourceUrl: string;
  externalUrl?: string;
  paperKey: string;
  paperTitle: string;
  heightClass?: string;
  initialTool?: AnnotationTool;
  initialPenColorHex?: string;
  onFallbackViewer?: () => void;
}

const PEN_COLORS = [
  { id: 'ink', label: 'Black Ink', hex: '#0f172a' },
  { id: 'blue', label: 'Blue Ink', hex: '#1d4ed8' },
  { id: 'red', label: 'Red Marking', hex: '#dc2626' },
  { id: 'green', label: 'Green Check', hex: '#059669' },
];

const HIGHLIGHT_COLORS = [
  { id: 'yellow', label: 'Yellow Highlighter', hex: '#facc15' },
  { id: 'cyan', label: 'Cyan Highlighter', hex: '#38bdf8' },
  { id: 'pink', label: 'Pink Highlighter', hex: '#f472b6' },
];

const STROKE_WIDTHS = [
  { id: 'fine', label: 'Fine', penSize: 2, hlSize: 12 },
  { id: 'med', label: 'Medium', penSize: 3.5, hlSize: 18 },
  { id: 'bold', label: 'Bold', penSize: 6, hlSize: 26 },
] as const;

interface PageDimension {
  pageNumber: number;
  width: number;
  height: number;
}

interface PdfPageCanvasProps {
  pdfDoc: pdfjsLib.PDFDocumentProxy;
  pageNumber: number;
  scale: number;
  strokes: AnnotationStroke[];
  activeTool: AnnotationTool;
  activeColor: string;
  activeSize: number;
  onCommitStroke: (pageNumber: number, stroke: AnnotationStroke) => void;
  onEraseAtPoint: (pageNumber: number, point: { x: number; y: number }) => void;
  registerCanvases: (
    pageNumber: number,
    refs: { pdfCanvas: HTMLCanvasElement | null; drawCanvas: HTMLCanvasElement | null }
  ) => void;
}

const PdfPageCanvas: React.FC<PdfPageCanvasProps> = ({
  pdfDoc,
  pageNumber,
  scale,
  strokes,
  activeTool,
  activeColor,
  activeSize,
  onCommitStroke,
  onEraseAtPoint,
  registerCanvases,
}) => {
  const pdfCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const liveStrokeRef = useRef<AnnotationStroke | null>(null);
  const isDrawingRef = useRef(false);
  const activePointersRef = useRef<Set<number>>(new Set());
  const [dims, setDims] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    registerCanvases(pageNumber, {
      pdfCanvas: pdfCanvasRef.current,
      drawCanvas: drawCanvasRef.current,
    });
    return () => {
      registerCanvases(pageNumber, { pdfCanvas: null, drawCanvas: null });
    };
  }, [pageNumber, registerCanvases]);

  // Render PDF page bitmap via pdf.js
  useEffect(() => {
    let cancelled = false;
    let renderTask: { cancel: () => void; promise: Promise<void> } | null = null;

    pdfDoc.getPage(pageNumber).then((page) => {
      if (cancelled) return;
      const viewport = page.getViewport({ scale });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const canvas = pdfCanvasRef.current;
      const drawCanvas = drawCanvasRef.current;
      if (!canvas || !drawCanvas) return;

      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      drawCanvas.width = Math.floor(viewport.width * dpr);
      drawCanvas.height = Math.floor(viewport.height * dpr);
      drawCanvas.style.width = `${Math.floor(viewport.width)}px`;
      drawCanvas.style.height = `${Math.floor(viewport.height)}px`;

      setDims({ width: Math.floor(viewport.width), height: Math.floor(viewport.height) });

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      renderTask = page.render({
        canvas,
        canvasContext: ctx,
        viewport,
      });

      renderTask.promise.catch(() => {
        // ignore cancel errors during fast zoom or document switch
      });
    });

    return () => {
      cancelled = true;
      if (renderTask) {
        try {
          renderTask.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [pdfDoc, pageNumber, scale]);

  const redrawOverlay = useCallback(() => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssWidth = canvas.width / dpr;
    const cssHeight = canvas.height / dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const all = liveStrokeRef.current ? [...strokes, liveStrokeRef.current] : strokes;
    renderStrokesToCanvas(ctx, all, cssWidth, cssHeight, scale);
  }, [strokes, scale]);

  useEffect(() => {
    redrawOverlay();
  }, [redrawOverlay, dims]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activeTool === 'pan') return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    activePointersRef.current.add(e.pointerId);
    // Multi-touch guard: if user puts a second finger down to scroll/zoom, cancel accidental nascent stroke
    if (activePointersRef.current.size > 1) {
      isDrawingRef.current = false;
      liveStrokeRef.current = null;
      redrawOverlay();
      return;
    }

    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    const rect = canvas.getBoundingClientRect();
    const point = normalizePointerToPage(e.clientX, e.clientY, rect);

    if (activeTool === 'eraser') {
      isDrawingRef.current = true;
      onEraseAtPoint(pageNumber, point);
      return;
    }

    isDrawingRef.current = true;
    liveStrokeRef.current = {
      id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      tool: activeTool,
      color: activeColor,
      size: activeSize,
      points: [point],
    };
    redrawOverlay();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointersRef.current.size > 1) return;
    if (!isDrawingRef.current || activeTool === 'pan') return;
    const canvas = drawCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const point = normalizePointerToPage(e.clientX, e.clientY, rect);

    if (activeTool === 'eraser') {
      onEraseAtPoint(pageNumber, point);
      return;
    }

    if (!liveStrokeRef.current) return;
    const prev = liveStrokeRef.current.points[liveStrokeRef.current.points.length - 1];
    if (Math.hypot(point.x - prev.x, point.y - prev.y) < 0.0012) {
      return;
    }
    liveStrokeRef.current.points.push(point);
    redrawOverlay();
  };

  const finishStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
    activePointersRef.current.delete(e.pointerId);
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    const canvas = drawCanvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }

    if (activeTool !== 'eraser' && liveStrokeRef.current) {
      const committed = liveStrokeRef.current;
      liveStrokeRef.current = null;
      onCommitStroke(pageNumber, committed);
    }
  };

  return (
    <div
      className="relative mx-auto bg-white shadow-sm border border-slate-200 select-none"
      style={dims ? { width: `${dims.width}px`, height: `${dims.height}px` } : undefined}
    >
      <canvas ref={pdfCanvasRef} className="block" />
      <canvas
        ref={drawCanvasRef}
        data-testid={`pdf-annot-canvas-${pageNumber}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishStroke}
        onPointerCancel={finishStroke}
        style={{ touchAction: activeTool === 'pan' ? 'auto' : 'none' }}
        className={`absolute inset-0 block ${
          activeTool === 'pan'
            ? 'pointer-events-none cursor-grab'
            : activeTool === 'eraser'
              ? 'cursor-cell'
              : 'cursor-crosshair'
        }`}
      />
      <div className="px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/90 border-t border-l border-slate-200 absolute bottom-0 right-0 pointer-events-none">
        Page {pageNumber}
      </div>
    </div>
  );
};

export const PdfAnnotator: React.FC<PdfAnnotatorProps> = ({
  sourceUrl,
  externalUrl,
  paperKey,
  paperTitle,
  heightClass = 'h-[620px]',
  initialTool = 'pen',
  initialPenColorHex = PEN_COLORS[1].hex,
  onFallbackViewer,
}) => {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [zoom, setZoom] = useState(1.0);
  const [tool, setTool] = useState<AnnotationTool>(initialTool);
  const [penColor, setPenColor] = useState(initialPenColorHex);
  const [hlColor, setHlColor] = useState(HIGHLIGHT_COLORS[0].hex);
  const [widthPreset, setWidthPreset] = useState<(typeof STROKE_WIDTHS)[number]['id']>('med');
  const [activeExportPage, setActiveExportPage] = useState(1);

  const [history, setHistory] = useState<AnnotationHistoryState>(() =>
    createInitialAnnotationHistory(loadPaperAnnotations(paperKey))
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggingRailRef = useRef<{ active: boolean; grabOffsetRatio: number }>({
    active: false,
    grabOffsetRatio: 0.5,
  });
  const [scrollState, setScrollState] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
    trackHeight: 400,
  });
  const pageCanvasesRef = useRef<
    Record<number, { pdfCanvas: HTMLCanvasElement | null; drawCanvas: HTMLCanvasElement | null }>
  >({});

  const syncScrollMetrics = useCallback(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el) return;
    setScrollState({
      scrollTop: el.scrollTop,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      trackHeight: track ? track.clientHeight : 400,
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const raf = window.requestAnimationFrame(syncScrollMetrics);
    const timer = window.setTimeout(syncScrollMetrics, 250);
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => syncScrollMetrics());
      observer.observe(el);
      if (trackRef.current) observer.observe(trackRef.current);
    }
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pdfDoc, numPages, zoom, loading, syncScrollMetrics]);

  // Sync annotations map from localStorage when switching papers
  useEffect(() => {
    setHistory(createInitialAnnotationHistory(loadPaperAnnotations(paperKey)));
    setActiveExportPage(1);
  }, [paperKey]);

  // Persist changes to localStorage
  useEffect(() => {
    savePaperAnnotations(paperKey, history.present);
  }, [paperKey, history.present]);

  // Fetch PDF bytes first (with same-origin cookies & %PDF- validation) then load into pdfjs-dist
  useEffect(() => {
    let cancelled = false;
    const abortController = new AbortController();
    let activeLoadTask: pdfjsLib.PDFDocumentLoadingTask | null = null;

    setLoading(true);
    setErrorMsg(null);
    setPdfDoc(null);

    (async () => {
      try {
        const resp = await fetch(sourceUrl, {
          credentials: 'same-origin',
          signal: abortController.signal,
        });

        const contentType = (resp.headers.get('content-type') || '').toLowerCase();
        if (!resp.ok) {
          let detail = `HTTP ${resp.status}`;
          if (contentType.includes('application/json')) {
            try {
              const payload = (await resp.json()) as { error?: string };
              if (payload.error) detail = payload.error;
            } catch {
              // ignore JSON parse failure
            }
          }
          throw new Error(detail);
        }

        const buffer = await resp.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        if (!hasPdfHeader(bytes)) {
          if (contentType.includes('text/html') && sourceUrl.startsWith('/api/')) {
            throw new Error(
              'The PDF proxy endpoint returned an HTML page instead of PDF bytes (the backend proxy may not be running on this host, or the file does not exist on PapaCambridge).'
            );
          }
          throw new Error(
            `Expected a PDF document (%PDF-), but received ${contentType || 'unknown content'}.`
          );
        }

        if (cancelled) return;

        activeLoadTask = pdfjsLib.getDocument({
          data: bytes,
          wasmUrl: '/pdfjs/wasm/',
          standardFontDataUrl: '/pdfjs/standard_fonts/',
        });
        const doc = await activeLoadTask.promise;
        if (cancelled) {
          void activeLoadTask.destroy().catch(() => undefined);
          return;
        }
        setPdfDoc(doc);
        setNumPages(doc.numPages);
      } catch (err) {
        if (cancelled || (err instanceof DOMException && err.name === 'AbortError')) {
          return;
        }
        const reason = err instanceof Error && err.message ? err.message : 'Unable to fetch or parse PDF bytes.';
        setErrorMsg(
          `Could not load PDF bytes for canvas annotation (${reason}). You can switch to Web Viewer, open the PDF directly, or upload a local PDF file to scribble on offline.`
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      abortController.abort();
      if (activeLoadTask) {
        void activeLoadTask.destroy().catch(() => undefined);
      }
    };
  }, [sourceUrl]);

  const registerCanvases = useCallback(
    (
      pageNumber: number,
      refs: { pdfCanvas: HTMLCanvasElement | null; drawCanvas: HTMLCanvasElement | null }
    ) => {
      pageCanvasesRef.current[pageNumber] = refs;
    },
    []
  );

  const handleCommitStroke = useCallback((pageNumber: number, stroke: AnnotationStroke) => {
    setActiveExportPage(pageNumber);
    setHistory((prev) => {
      const nextMap = cloneAnnotationsMap(prev.present);
      nextMap[pageNumber] = [...(nextMap[pageNumber] || []), stroke];
      return pushAnnotationHistory(prev, nextMap);
    });
  }, []);

  const handleEraseAtPoint = useCallback(
    (pageNumber: number, point: { x: number; y: number }) => {
      setHistory((prev) => {
        const currentList = prev.present[pageNumber] || [];
        if (currentList.length === 0) return prev;
        const { remaining, removedAny } = eraseStrokesNearPoint(currentList, point, 0.022);
        if (!removedAny) return prev;
        const nextMap = cloneAnnotationsMap(prev.present);
        if (remaining.length === 0) {
          delete nextMap[pageNumber];
        } else {
          nextMap[pageNumber] = remaining;
        }
        return pushAnnotationHistory(prev, nextMap);
      });
    },
    []
  );

  const handleClearAll = () => {
    if (countTotalStrokes(history.present) === 0) return;
    setHistory((prev) => pushAnnotationHistory(prev, {}));
  };

  const handleExportPng = () => {
    const entry = pageCanvasesRef.current[activeExportPage] || pageCanvasesRef.current[1];
    if (!entry?.pdfCanvas || !entry?.drawCanvas) return;

    const out = document.createElement('canvas');
    out.width = entry.pdfCanvas.width;
    out.height = entry.pdfCanvas.height;
    const ctx = out.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(entry.pdfCanvas, 0, 0);
    ctx.drawImage(entry.drawCanvas, 0, 0);

    const link = document.createElement('a');
    link.download = `${paperTitle.replace(/\.pdf$/i, '')}-page-${activeExportPage}-notes.png`;
    link.href = out.toDataURL('image/png');
    link.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (e.shiftKey) {
        setHistory((prev) => redoAnnotationHistory(prev));
      } else {
        setHistory((prev) => undoAnnotationHistory(prev));
      }
    }
  };

  const activeColor = tool === 'highlighter' ? hlColor : penColor;
  const activePreset = STROKE_WIDTHS.find((w) => w.id === widthPreset) || STROKE_WIDTHS[1];
  const activeSize = tool === 'highlighter' ? activePreset.hlSize : activePreset.penSize;
  const totalStrokes = useMemo(() => countTotalStrokes(history.present), [history.present]);

  const pageNumbers = useMemo(
    () => Array.from({ length: numPages }, (_, i) => i + 1),
    [numPages]
  );

  const thumbMetrics = useMemo(
    () =>
      computeScrollThumbMetrics({
        scrollTop: scrollState.scrollTop,
        scrollHeight: scrollState.scrollHeight,
        clientHeight: scrollState.clientHeight,
        trackHeight: scrollState.trackHeight,
        minThumbHeight: 60,
      }),
    [scrollState]
  );

  const visiblePage = useMemo(
    () =>
      estimateVisiblePage({
        scrollTop: scrollState.scrollTop,
        scrollHeight: scrollState.scrollHeight,
        clientHeight: scrollState.clientHeight,
        numPages,
      }),
    [scrollState, numPages]
  );

  const applyRailPointerY = useCallback(
    (clientY: number, grabOffsetRatio: number) => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;
      const rect = track.getBoundingClientRect();
      const nextTop = computeScrollTopFromTrackY({
        pointerY: clientY,
        trackTop: rect.top,
        trackHeight: rect.height,
        thumbHeight: thumbMetrics.thumbHeight,
        scrollHeight: container.scrollHeight,
        clientHeight: container.clientHeight,
        grabOffsetRatio,
      });
      container.scrollTop = nextTop;
      syncScrollMetrics();
    },
    [thumbMetrics.thumbHeight, syncScrollMetrics]
  );

  const handleTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!thumbMetrics.canScroll) return;
    e.preventDefault();
    const track = trackRef.current;
    if (!track) return;
    track.setPointerCapture(e.pointerId);

    const rect = track.getBoundingClientRect();
    const localY = e.clientY - rect.top;
    const hitThumb =
      localY >= thumbMetrics.thumbTop &&
      localY <= thumbMetrics.thumbTop + thumbMetrics.thumbHeight;
    const grabRatio = hitThumb
      ? (localY - thumbMetrics.thumbTop) / Math.max(1, thumbMetrics.thumbHeight)
      : 0.5;

    draggingRailRef.current = { active: true, grabOffsetRatio: grabRatio };
    applyRailPointerY(e.clientY, grabRatio);
  };

  const handleTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRailRef.current.active) return;
    e.preventDefault();
    applyRailPointerY(e.clientY, draggingRailRef.current.grabOffsetRatio);
  };

  const handleTrackPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRailRef.current.active) return;
    draggingRailRef.current.active = false;
    const track = trackRef.current;
    if (track && track.hasPointerCapture(e.pointerId)) {
      try {
        track.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  const stepScroll = (direction: -1 | 1) => {
    const container = containerRef.current;
    if (!container) return;
    const delta = Math.max(180, Math.round(container.clientHeight * 0.72));
    container.scrollBy({ top: direction * delta, behavior: 'smooth' });
  };

  return (
    <div
      className="flex flex-col bg-slate-100"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`PDF Annotation Workspace for ${paperTitle}`}
    >
      {/* Annotation Toolbar */}
      <div className="px-3 py-2 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Primary Tool Selector */}
          <div
            role="group"
            aria-label="Drawing tool"
            className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg"
          >
            <button
              type="button"
              onClick={() => setTool('pen')}
              aria-pressed={tool === 'pen'}
              className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md cursor-pointer whitespace-nowrap ${
                tool === 'pen' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Pen className="w-3.5 h-3.5" />
              Pen
            </button>
            <button
              type="button"
              onClick={() => setTool('highlighter')}
              aria-pressed={tool === 'highlighter'}
              className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md cursor-pointer whitespace-nowrap ${
                tool === 'highlighter'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Highlighter className="w-3.5 h-3.5" />
              Highlight
            </button>
            <button
              type="button"
              onClick={() => setTool('eraser')}
              aria-pressed={tool === 'eraser'}
              className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md cursor-pointer whitespace-nowrap ${
                tool === 'eraser' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
              Eraser
            </button>
            <button
              type="button"
              onClick={() => setTool('pan')}
              aria-pressed={tool === 'pan'}
              className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md cursor-pointer whitespace-nowrap ${
                tool === 'pan' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Hand className="w-3.5 h-3.5" />
              Scroll
            </button>
          </div>

          {/* Colors for Pen or Highlighter */}
          {(tool === 'pen' || tool === 'highlighter') && (
            <div className="inline-flex items-center gap-1 px-1.5 py-1 bg-slate-50 border border-slate-200 rounded-lg">
              {(tool === 'highlighter' ? HIGHLIGHT_COLORS : PEN_COLORS).map((c) => {
                const selected = activeColor === c.hex;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={c.label}
                    aria-pressed={selected}
                    onClick={() =>
                      tool === 'highlighter' ? setHlColor(c.hex) : setPenColor(c.hex)
                    }
                    className={`w-5 h-5 rounded-md border transition-transform cursor-pointer ${
                      selected ? 'border-slate-900 scale-110 ring-1 ring-slate-900' : 'border-slate-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                );
              })}
            </div>
          )}

          {/* Stroke Thickness */}
          {tool !== 'eraser' && tool !== 'pan' && (
            <div
              role="group"
              aria-label="Stroke size"
              className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg"
            >
              {STROKE_WIDTHS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWidthPreset(w.id)}
                  className={`px-2 py-1 text-[11px] font-medium rounded-md cursor-pointer whitespace-nowrap ${
                    widthPreset === w.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* History, Zoom, and Export Controls */}
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.65, Number((z - 0.15).toFixed(2))))}
              aria-label="Zoom out"
              className="p-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono tabular-nums text-slate-700 border-x border-slate-200">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2.2, Number((z + 0.15).toFixed(2))))}
              aria-label="Zoom in"
              className="p-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setHistory((prev) => undoAnnotationHistory(prev))}
            disabled={history.past.length === 0}
            aria-label="Undo stroke"
            className="p-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setHistory((prev) => redoAnnotationHistory(prev))}
            disabled={history.future.length === 0}
            aria-label="Redo stroke"
            className="p-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            disabled={totalStrokes === 0}
            aria-label="Clear all drawings"
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border border-slate-200 rounded-lg bg-white text-rose-700 hover:bg-rose-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear ({totalStrokes})
          </button>
          <button
            type="button"
            onClick={handleExportPng}
            disabled={!pdfDoc}
            title={`Download page ${activeExportPage} with your annotations as PNG`}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer whitespace-nowrap"
          >
            <Camera className="w-3.5 h-3.5" />
            Save Page PNG
          </button>
        </div>
      </div>

      {/* Scrollable Multi-Page PDF + Dedicated Wide Touch Scroll Rail */}
      <div className="flex items-stretch w-full">
        <div
          ref={containerRef}
          onScroll={syncScrollMetrics}
          style={{ touchAction: 'pan-x pan-y' }}
          className={`flex-1 min-w-0 ${heightClass} overflow-auto px-5 sm:px-8 py-5 space-y-5 bg-slate-200/70 pdf-annotator-scroll`}
        >
          {loading && (
            <div className="h-full min-h-[320px] flex flex-col items-center justify-center gap-3 text-sm text-slate-600">
              <Loader2 className="w-5 h-5 animate-spin text-blue-700" />
              <span>Rendering PDF pages for annotation...</span>
            </div>
          )}

          {!loading && errorMsg && (
            <div className="max-w-lg mx-auto my-12 p-5 bg-white border border-slate-200 rounded-xl text-center space-y-3">
              <p className="text-sm text-slate-700 leading-relaxed">{errorMsg}</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {onFallbackViewer && (
                  <button
                    type="button"
                    onClick={onFallbackViewer}
                    className="px-3.5 py-2 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg cursor-pointer"
                  >
                    Switch to Web Viewer
                  </button>
                )}
                {externalUrl && (
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-xs font-semibold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg"
                  >
                    Open PDF Directly
                  </a>
                )}
              </div>
            </div>
          )}

          {!loading &&
            !errorMsg &&
            pdfDoc &&
            pageNumbers.map((pageNumber) => (
              <PdfPageCanvas
                key={`${paperKey}-p${pageNumber}`}
                pdfDoc={pdfDoc}
                pageNumber={pageNumber}
                scale={zoom}
                strokes={history.present[pageNumber] || []}
                activeTool={tool}
                activeColor={activeColor}
                activeSize={activeSize}
                onCommitStroke={handleCommitStroke}
                onEraseAtPoint={handleEraseAtPoint}
                registerCanvases={registerCanvases}
              />
            ))}
        </div>

        {/* Dedicated 44px-wide Touch/Mouse Scroll Rail — never draws on the PDF */}
        <div
          data-testid="pdf-scroll-rail"
          aria-label="PDF page scroll bar"
          className="w-11 shrink-0 bg-slate-100 border-l border-slate-200 flex flex-col items-center select-none"
        >
          <button
            type="button"
            onClick={() => stepScroll(-1)}
            disabled={!thumbMetrics.canScroll}
            aria-label="Scroll PDF up"
            className="w-full h-11 flex items-center justify-center text-slate-700 hover:bg-slate-200 active:bg-slate-300 border-b border-slate-200 disabled:opacity-40 cursor-pointer disabled:cursor-default"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          <div
            ref={trackRef}
            onPointerDown={handleTrackPointerDown}
            onPointerMove={handleTrackPointerMove}
            onPointerUp={handleTrackPointerUp}
            onPointerCancel={handleTrackPointerUp}
            style={{ touchAction: 'none' }}
            className="relative flex-1 w-full bg-slate-200/70 cursor-pointer"
          >
            {thumbMetrics.canScroll ? (
              <div
                data-testid="pdf-scroll-thumb"
                style={{
                  height: `${thumbMetrics.thumbHeight}px`,
                  transform: `translateY(${thumbMetrics.thumbTop}px)`,
                }}
                className="absolute inset-x-1.5 top-0 rounded-lg bg-slate-600 hover:bg-slate-700 active:bg-blue-700 shadow-sm flex flex-col items-center justify-center gap-1 pointer-events-none transition-colors"
              >
                <span className="w-4 h-0.5 rounded-full bg-white/80" />
                <span className="text-[9px] font-mono font-semibold text-white leading-none tabular-nums">
                  P{visiblePage}
                </span>
                <span className="w-4 h-0.5 rounded-full bg-white/80" />
              </div>
            ) : (
              <div className="absolute inset-x-2 inset-y-2 rounded-lg bg-slate-300/60" />
            )}
          </div>

          <button
            type="button"
            onClick={() => stepScroll(1)}
            disabled={!thumbMetrics.canScroll}
            aria-label="Scroll PDF down"
            className="w-full h-11 flex items-center justify-center text-slate-700 hover:bg-slate-200 active:bg-slate-300 border-t border-slate-200 disabled:opacity-40 cursor-pointer disabled:cursor-default"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quiet Footer Hint */}
      <div className="px-3 py-1.5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
        <span>
          {numPages > 0
            ? `Page ${visiblePage} of ${numPages} · Drag the right scroll bar or switch to Scroll tool · Auto-saves locally`
            : 'Preparing PDF canvas'}
        </span>
        <span className="font-mono tabular-nums">
          {totalStrokes} {totalStrokes === 1 ? 'stroke' : 'strokes'} saved · Ctrl+Z to undo
        </span>
      </div>
    </div>
  );
};

export type { PageDimension };
