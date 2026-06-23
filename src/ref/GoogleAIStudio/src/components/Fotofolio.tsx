import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Maximize2, X, Eye } from "lucide-react";
import { fotofolioStories } from "../data";
import { PhotographicStory } from "../types";

interface FotofolioProps {
  onBackToGate: () => void;
}

export default function Fotofolio({ onBackToGate }: FotofolioProps) {
  const [activeStory, setActiveStory] = useState<PhotographicStory | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringImg, setIsHoveringImg] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mouse custom cursor tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-carbon text-cream relative overflow-x-hidden selection:bg-cream selection:text-carbon select-none">
      
      {/* Cinematic Custom Fluid Cursor (Only on Desktop) */}
      <div 
        className={`hidden md:block fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out custom-cursor w-14 h-14 rounded-full border border-cream/50 flex items-center justify-center ${
          isHoveringImg ? "scale-125 bg-cream/20 backdrop-blur-[2px]" : "scale-0"
        }`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      >
        <span className="font-mono text-[9px] font-bold text-cream tracking-widest uppercase">
          RAW
        </span>
      </div>

      {/* Silent Aesthetic Overlay Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon via-transparent to-carbon pointer-events-none -z-10" />

      {/* Floating navigation bar */}
      <nav className="sticky top-0 z-40 bg-carbon/80 backdrop-blur-md border-b border-cream/10 py-5 px-6 md:px-10 flex items-center justify-between">
        <button 
          onClick={onBackToGate}
          className="group flex items-center gap-2 px-4 py-2 border border-cream/30 hover:border-cream text-cream hover:bg-cream hover:text-carbon transition-all rounded-lg font-mono text-xs uppercase cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Indietro / Bivio</span>
        </button>

        <div className="flex flex-col items-end">
          <div className="font-serif text-lg md:text-xl tracking-wider text-cream italic">
            Storie di mani
          </div>
          <div className="font-mono text-[9px] tracking-widest uppercase opacity-40">
            [ FOTOFOLIO — ZERO TEXT POLICY ]
          </div>
        </div>
      </nav>

      {/* Layout Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-24" ref={scrollContainerRef}>
        
        {/* Curated introduction statement to context - Italian First */}
        <section className="mb-20 md:mb-32 max-w-2xl border-l-[3px] border-cream/30 pl-6 md:pl-10">
          <span className="font-mono text-[10px] tracking-widest text-[#DFFF00] uppercase block mb-1">
            // FOTOGRAFIA SENZA PAROLE
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-wide text-cream leading-snug">
            "Hand and other stories"
          </h1>
          <p className="mt-4 font-serif text-base md:text-lg text-cream/60 leading-relaxed italic">
            Racconti incisi nella pelle, colti senza retorica e senza parole. Credo nella fotografia come testimonianza cruda dell'esistenza. Nessun titolo, nessuna didascalia, nessuna parola sovrimposta distoglierà lo sguardo dalle mani.
          </p>
        </section>

        {/* ASYMMETRIC PHOTOGRAPHIC GALLERY - NO CAPTIONS, NO TITLES, NO CAPTIONS OVER OR AROUND IMAGES */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 md:gap-y-32 gap-x-12 items-center">
          {fotofolioStories.map((story, i) => {
            // Generates asymmetrical offsets to feel "art-directed" and "hand-composed"
            const alignments = [
              "md:translate-y-0", 
              "md:translate-y-16", 
              "md:-translate-y-8", 
              "md:translate-y-8", 
              "md:-translate-y-16"
            ];
            const alignClass = alignments[i % alignments.length];

            return (
              <div 
                key={story.id}
                className={`relative flex flex-col items-center ${alignClass} group`}
              >
                {/* Image Card Frame - zero margins, zero captions */}
                <div 
                  onClick={() => setActiveStory(story)}
                  onMouseEnter={() => setIsHoveringImg(true)}
                  onMouseLeave={() => setIsHoveringImg(false)}
                  className={`w-full overflow-hidden border border-cream/15 hover:border-cream/50 bg-cream/5 cursor-pointer rounded-lg transition-all duration-500 shadow-2xl relative ${story.aspectClass}`}
                >
                  <img 
                    src={story.imageUrl} 
                    alt={story.captionIT} // Pure accessibility, not visible to user
                    className="w-full h-full object-cover grayscale transition-all duration-[1.5s] ease-out group-hover:scale-105 group-hover:grayscale-0 filter contrast-110 brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle hover eye indicator for mobile/tablet */}
                  <div className="absolute inset-0 bg-carbon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-cream md:hidden" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Empty Space at bottom to emphasize the silent, raw mood */}
        <section className="mt-28 md:mt-48 text-center">
          <div className="w-12 h-[1px] bg-cream/20 mx-auto" />
          <p className="mt-8 font-mono text-[9px] tracking-[0.25em] text-cream/30 uppercase">
            [ FINE DELLA TRASMISSIONE SILENZIOSA ]
          </p>
        </section>

      </main>

      {/* FULL PORTRAIT CINE SCREEN SLIDE FOR ACTIVE PHOTOS */}
      <AnimatePresence>
        {activeStory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-carbon/95 backdrop-blur-lg flex flex-col items-center justify-center p-4 md:p-8"
          >
            {/* Close Top Bar - Silent UI */}
            <div className="absolute top-6 right-6 md:right-10 flex items-center gap-6 z-20">
              <button 
                onClick={() => setActiveStory(null)}
                className="group p-3 border border-cream/20 hover:border-cream text-cream hover:bg-cream hover:text-carbon rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Full-Scale Image Frame */}
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative max-w-4xl max-h-[80vh] aspect-[3/4] md:aspect-[4/5] overflow-hidden border border-cream/20 rounded-xl shadow-2xl bg-[#000]"
            >
              <img 
                src={activeStory.imageUrl} 
                alt={activeStory.captionIT}
                className="w-full h-full object-contain filter contrast-[105%] saturate-[95%]"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Silent Metadata - absolutely no text on or near image in the grid, but in full immersive mode we can offer a simple technical spec tag to anchor it */}
            <div className="mt-8 text-center text-cream/40 font-mono text-[10px] tracking-widest uppercase flex items-center gap-3">
              <span>SERIES: HANDS</span>
              <span>•</span>
              <span>FILE_RAW_{activeStory.id.toUpperCase()}</span>
              <span>•</span>
              <span>TORINO 35MM</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
