import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink, FileText, Printer } from "lucide-react";
import { site } from "@/lib/config";

export function Resume() {
  const [loadError, setLoadError] = useState(false);
  const pdfUrl = "/resume.pdf";

  useEffect(() => {
    document.title = "Resume — Rohit SK";
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.open(pdfUrl, "_blank")?.print();
  };

  return (
    <div className="relative min-h-screen bg-obsidian pt-24 md:pt-32 pb-20">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[450px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(192, 38, 85, 0.18), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        {/* Top Navigation & Action Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-line/60">
          <div>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted transition hover:text-cream"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Portfolio
            </Link>
            <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-cream flex items-center gap-2.5">
              <FileText className="h-6 w-6 text-maroon-bright" />
              Resume Preview
            </h1>
            <p className="mt-0.5 text-xs sm:text-sm text-muted">
              Rohit SK · Full Stack Developer & AI/ML Enthusiast
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-xs sm:text-sm font-semibold text-muted transition hover:border-maroon-bright/60 hover:text-white"
            >
              <Printer className="h-4 w-4" />
              Print
            </button>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-xs sm:text-sm font-semibold text-muted transition hover:border-maroon-bright/60 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Open in Tab
            </a>

            <a
              href={site.resumeUrl || pdfUrl}
              download="Rohit_SK_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-maroon via-maroon-bright to-[#FA3B6E] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_0_25px_rgba(250,59,110,0.4)] transition hover:scale-105 active:scale-95"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </div>
        </div>

        {/* Embedded PDF Preview Frame */}
        <div className="mt-6">
          <div className="overflow-hidden rounded-3xl border border-line/80 bg-[#0c080b] shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            {/* Minimalist Top Frame Header */}
            <div className="flex items-center justify-between border-b border-line/60 bg-card/60 px-5 py-3 text-xs text-muted">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 font-mono text-[11px] text-muted">Rohit_SK_Resume.pdf</span>
              </div>
              <span className="font-mono text-[11px] text-maroon-bright">Live PDF Document</span>
            </div>

            {/* PDF Viewer Canvas */}
            <div className="relative w-full h-[78vh] sm:h-[84vh] md:h-[88vh] bg-[#140e12]">
              {!loadError ? (
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                  title="Rohit SK Resume PDF Preview"
                  className="h-full w-full border-0"
                  onError={() => setLoadError(true)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                  <FileText className="h-16 w-16 text-maroon-bright/60 mb-4" />
                  <p className="font-display text-lg font-bold text-cream">
                    PDF Preview Not Available on this Browser
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-muted max-w-md">
                    Your current browser does not support embedded PDF frames. You can download or view it directly in a new tab.
                  </p>
                  <a
                    href={pdfUrl}
                    download="Rohit_SK_Resume.pdf"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-maroon-bright px-6 py-2.5 text-xs font-semibold text-white shadow-glow"
                  >
                    <Download className="h-4 w-4" />
                    Download Rohit_SK_Resume.pdf
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
