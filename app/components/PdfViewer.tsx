"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Download, 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  Loader2,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { usePathname } from "next/navigation";

interface PdfViewerProps {
  url: string;
  title?: string;
  height?: number;
}

export default function PdfViewer({ url, title, height = 550 }: PdfViewerProps) {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);

  const [pdfjs, setPdfjs] = useState<any>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const t = {
    viewFullscreen: isEn ? "Full screen" : "На весь екран",
    exitFullscreen: isEn ? "Exit full screen" : "Вийти з повного екрану",
    download: isEn ? "Download PDF" : "Завантажити PDF",
    presentation: isEn ? "Presentation" : "Презентація",
    page: isEn ? "Page" : "Слайд",
    of: isEn ? "of" : "з",
    loading: isEn ? "Loading presentation..." : "Завантаження презентації...",
    error: isEn ? "Failed to load PDF. Please download it directly." : "Не вдалося завантажити PDF. Спробуйте завантажити файл безпосередньо.",
    prev: isEn ? "Previous" : "Попередній",
    next: isEn ? "Next" : "Наступний",
  };

  // 1. Load PDF.js script from CDN
  useEffect(() => {
    if ((window as any).pdfjsLib) {
      setPdfjs((window as any).pdfjsLib);
      return;
    }

    let script = document.getElementById("pdfjs-cdn-script") as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = "pdfjs-cdn-script";
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.async = true;
      document.head.appendChild(script);
    }

    const handleScriptLoad = () => {
      const pdfjsLib = (window as any).pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      setPdfjs(pdfjsLib);
    };

    script.addEventListener("load", handleScriptLoad);
    
    if ((window as any).pdfjsLib) {
      handleScriptLoad();
    }

    return () => {
      script.removeEventListener("load", handleScriptLoad);
    };
  }, []);

  // 2. Track container dimensions to calculate fit-to-screen scale
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        // Subtract header (~68px) and footer (~64px) and progress bar (~4px)
        const contentHeight = entry.contentRect.height - 136;
        setContainerSize({ 
          width: Math.max(width, 280), 
          height: Math.max(contentHeight, 200) 
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 3. Load PDF Document
  useEffect(() => {
    if (!pdfjs) return;

    setLoading(true);
    setError(false);
    
    const loadingTask = pdfjs.getDocument(url);
    loadingTask.promise.then(
      (pdf: any) => {
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setPageNum(1);
        setLoading(false);
      },
      (err: any) => {
        console.error("PDF.js loading error:", err);
        setLoading(false);
        setError(true);
      }
    );
  }, [pdfjs, url]);

  // 4. Render current page to canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || containerSize.width === 0 || containerSize.height === 0) return;

    let isMounted = true;
    setRendering(true);

    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
    }

    pdfDoc.getPage(pageNum).then(
      (page: any) => {
        if (!isMounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const viewportTest = page.getViewport({ scale: 1.0 });
        
        // Calculate scale to fit container BOTH in width and height (with 4% safe padding)
        const scaleWidth = containerSize.width / viewportTest.width;
        const scaleHeight = containerSize.height / viewportTest.height;
        const scale = Math.min(scaleWidth, scaleHeight) * 0.96;
        
        const viewport = page.getViewport({ scale: scale });

        // Set dimensions of parent container directly in DOM
        if (canvasContainerRef.current) {
          canvasContainerRef.current.style.width = `${viewport.width}px`;
          canvasContainerRef.current.style.height = `${viewport.height}px`;
        }

        // Set high density for crisp graphics/text in canvas
        const pixelRatio = Math.max(window.devicePixelRatio || 1, 2); 
        const renderViewport = page.getViewport({ scale: scale * pixelRatio });

        canvas.width = renderViewport.width;
        canvas.height = renderViewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: renderViewport, // Render at high resolution directly
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        renderTask.promise.then(
          () => {
            if (isMounted) {
              setRendering(false);
            }
          },
          (err: any) => {
            if (err.name !== "RenderingCancelledException" && isMounted) {
              console.error("Render error:", err);
              setRendering(false);
            }
          }
        );
      },
      (err: any) => {
        console.error("Get page error:", err);
        setRendering(false);
      }
    );

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdfDoc, pageNum, containerSize]);

  // 5. Handle Fullscreen state changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const changePage = (offset: number) => {
    const newPage = pageNum + offset;
    if (newPage >= 1 && newPage <= numPages) {
      setPageNum(newPage);
    }
  };

  const toggleFullscreen = () => {
    const element = containerRef.current;
    if (!element) return;

    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading || rendering || error) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        changePage(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        changePage(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pageNum, numPages, loading, rendering, error]);

  // Calculate Progress Percentage
  const progressPercent = numPages > 0 ? (pageNum / numPages) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      style={isFullscreen ? {} : { height: `${height}px` }}
      className={`my-8 w-full select-none flex flex-col bg-slate-900 text-white rounded-[24px] overflow-hidden shadow-2xl transition-all duration-300 relative ${
        isFullscreen ? "h-screen rounded-none my-0 justify-between p-4" : "border border-slate-800"
      }`}
    >
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-950/80 border-b border-slate-800/60 z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
            <Presentation size={18} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
              {t.presentation}
            </span>
            <h4 className="text-xs md:text-sm font-bold text-slate-200 line-clamp-1">
              {title || (isEn ? "Document Presentation" : "Презентація документа")}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Rendering Loader */}
          {rendering && (
            <Loader2 className="animate-spin text-blue-400 mr-2" size={16} />
          )}

          {/* Download button */}
          <a
            href={url}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
          >
            <Download size={13} />
            <span className="hidden sm:inline">{t.download}</span>
          </a>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            title={isFullscreen ? t.exitFullscreen : t.viewFullscreen}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* 2. Main Slideshow View */}
      <div className="relative flex-grow flex bg-slate-950 overflow-hidden py-4">
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/90 z-20">
            <Loader2 className="animate-spin text-blue-500" size={36} />
            <span className="text-sm font-medium text-slate-400">{t.loading}</span>
          </div>
        )}

        {/* Error Screen */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center gap-4 bg-slate-950/90 z-20">
            <AlertCircle className="text-red-500" size={40} />
            <p className="text-sm text-slate-300 max-w-md">{t.error}</p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-all text-white border border-slate-700"
            >
              <ExternalLink size={14} /> {isEn ? "Open PDF" : "Відкрити PDF"}
            </a>
          </div>
        )}

        {/* Canvas Container (Centered via Flex/m-auto, no scrolling cut-off) */}
        {!loading && !error && (
          <div 
            ref={canvasContainerRef}
            className="pdf-canvas-container relative select-none m-auto"
          >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
          </div>
        )}

        {/* Overlay Navigation Arrows (Hover state) */}
        {!loading && !error && numPages > 0 && (
          <>
            {pageNum > 1 && (
              <button
                onClick={() => changePage(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/60 hover:bg-blue-600 border border-slate-800 text-white opacity-0 md:opacity-100 hover:scale-105 hover:opacity-100 transition-all shadow-md z-10"
                aria-label={t.prev}
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {pageNum < numPages && (
              <button
                onClick={() => changePage(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/60 hover:bg-blue-600 border border-slate-800 text-white opacity-0 md:opacity-100 hover:scale-105 hover:opacity-100 transition-all shadow-md z-10"
                aria-label={t.next}
              >
                <ChevronRight size={24} />
              </button>
            )}
          </>
        )}
      </div>

      {/* Progress Bar */}
      {!loading && !error && (
        <div className="w-full h-1 bg-slate-800/80 flex-shrink-0">
          <div 
            className="h-full bg-blue-500 transition-all duration-300 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* 3. Footer Control Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-950/80 border-t border-slate-800/60 z-10 gap-4 flex-shrink-0">
        {/* Prev Button */}
        <button
          onClick={() => changePage(-1)}
          disabled={pageNum <= 1 || loading || rendering}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-400 disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:text-slate-400 text-xs font-bold border border-slate-800/50 transition-colors"
        >
          <ChevronLeft size={16} />
          <span className="hidden xs:inline">{t.prev}</span>
        </button>

        {/* Page Info */}
        {!loading && !error && (
          <span className="text-xs font-semibold text-slate-300 tracking-wide select-none">
            {t.page} <strong className="text-blue-400 text-sm">{pageNum}</strong> {t.of} <strong className="text-slate-200">{numPages}</strong>
          </span>
        )}

        {/* Next Button */}
        <button
          onClick={() => changePage(1)}
          disabled={pageNum >= numPages || loading || rendering}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-400 disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:text-slate-400 text-xs font-bold border border-slate-800/50 transition-colors"
        >
          <span className="hidden xs:inline">{t.next}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
