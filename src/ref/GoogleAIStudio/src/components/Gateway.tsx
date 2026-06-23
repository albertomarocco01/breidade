import { motion } from "motion/react";

interface GatewayProps {
  onSelectWorld: (world: "grapholio" | "fotofolio" | "about") => void;
}

export default function Gateway({ onSelectWorld }: GatewayProps) {
  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-cream flex flex-col md:flex-row select-none">
      
      {/* Floating Header Branding */}
      <header className="absolute top-0 left-0 w-full z-40 p-6 md:p-10 pointer-events-none flex justify-between items-start">
        <div className="flex flex-col">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-serif text-3xl md:text-5xl tracking-normal text-tomato mix-blend-difference"
          >
            Giulia Breida
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4 }}
            className="font-mono text-[10px] md:text-xs text-tomato mt-1 tracking-wider uppercase flex items-center gap-1.5 mix-blend-difference"
          >
            <span>Torino, IT</span>
            <span className="opacity-40">•</span>
            <span>Born 2001</span>
            <span className="opacity-40">•</span>
            <span className="text-accent-teal">設計師</span>
          </motion.div>
        </div>

        {/* Info Toggle Button */}
        <motion.button
          onClick={() => onSelectWorld("about")}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="pointer-events-auto group px-5 py-2.5 bg-tomato text-cream hover:bg-[#121212] transition-colors rounded-full font-sans font-bold text-xs md:text-sm tracking-widest uppercase flex items-center gap-2 border border-tomato hover:border-[#121212] shadow-sm cursor-pointer"
        >
          <span>Chi Sono</span>
          <span className="font-hand2 text-lg lowercase normal-case tracking-normal">info</span>
        </motion.button>
      </header>

      {/* LEFT PORTAL - GRAPHOLIO (Loud, Red, Graphic, Chinese DESIGN hanzi) */}
      <motion.div 
        onClick={() => onSelectWorld("grapholio")}
        className="relative flex-1 h-1/2 md:h-full bg-tomato group/left cursor-pointer overflow-hidden flex items-center justify-center border-b border-cream md:border-b-0 md:border-r"
        whileHover={{ flexGrow: 1.35 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Massive Hanzi Watermark: 設計 (Design) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none transition-transform duration-700 group-hover/left:scale-110">
          <span className="font-sans text-[25vh] md:text-[50vh] font-black text-cream tracking-tighter select-none">
            設計
          </span>
        </div>

        {/* Content Container */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center p-6 mt-16 md:mt-0">
          <motion.span 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#DFFF00] mb-2 md:mb-4 bg-tomato border border-[#DFFF00] px-3 py-1 rounded-full font-bold"
          >
            Disegno Grafico
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-5xl md:text-8xl font-black text-cream tracking-tighter uppercase group-hover/left:scale-105 transition-transform duration-500"
          >
            GRAPHOLIO
          </motion.h2>

          {/* Core concept title in raw custom style */}
          <span className="font-hand text-3xl md:text-5xl text-[#DFFF00] transform -rotate-6 mt-4 block select-none">
            esplosione di colore
          </span>

          <span className="font-mono text-[9px] md:text-xs text-cream/70 mt-6 tracking-widest uppercase opacity-0 group-hover/left:opacity-100 transition-opacity duration-300">
            [ entra nel caos / enter grapholio ]
          </span>
        </div>
      </motion.div>

      {/* RIGHT PORTAL - FOTOFOLIO (Quiet, Raw Black, Photographic, Hands, Chinese PHOTO hanzi) */}
      <motion.div 
        onClick={() => onSelectWorld("fotofolio")}
        className="relative flex-1 h-1/2 md:h-full bg-carbon group/right cursor-pointer overflow-hidden flex items-center justify-center"
        whileHover={{ flexGrow: 1.35 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Massive Hanzi Watermark: 攝影 (Photography) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none transition-transform duration-700 group-hover/right:scale-110">
          <span className="font-sans text-[25vh] md:text-[50vh] font-black text-cream tracking-tighter select-none">
            攝影
          </span>
        </div>

        {/* Ambient Dark Hands Placeholder Background */}
        <div className="absolute inset-0 opacity-15 mix-blend-luminosity filter saturate-50 transition-opacity duration-700 group-hover/right:opacity-35">
          <img 
            src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop" 
            alt="Intimate hands background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 mt-6 md:mt-0">
          <motion.span 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#FCFAF2]/60 mb-2 md:mb-4 border border-[#FCFAF2]/30 px-3 py-1 rounded-full"
          >
            Fotografia Cruda
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-5xl md:text-8xl font-normal text-cream tracking-wide uppercase group-hover/right:scale-105 transition-transform duration-500"
          >
            Fotofolio
          </motion.h2>

          {/* Quiet artistic baseline */}
          <span className="font-serif italic text-lg md:text-2xl text-cream/70 tracking-wider mt-4 block">
            Storie di mani e altri racconti
          </span>

          <span className="font-mono text-[9px] md:text-xs text-cream/40 mt-6 tracking-widest uppercase opacity-0 group-hover/right:opacity-100 transition-opacity duration-300">
            [ entra nel silenzio / enter fotofolio ]
          </span>
        </div>
      </motion.div>

      {/* Floating Central Bridge Signature */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none md:bottom-auto md:top-1/2 md:-translate-y-1/2 text-center select-none">
        <motion.div
          animate={{ rotate: [0, -3, 3, 0], y: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="bg-cream text-carbon border-2 border-carbon px-8 py-3 rounded-xl shadow-xl transform rotate-3 flex items-center justify-center flex-col pointer-events-auto hover:scale-105 transition-transform duration-300"
        >
          <span className="font-mono text-[10px] tracking-widest uppercase text-tomato font-bold">
            Giulia Breida // 設計師
          </span>
          <span className="font-hand2 text-4xl text-carbon mt-1 block">
            impronta art-direction
          </span>
        </motion.div>
      </div>

      {/* Decorative details - Italian First */}
      <div className="absolute bottom-4 left-6 hidden md:block z-30 text-[10px] font-mono text-carbon/40 tracking-wider">
        PROGETTO PORTFOLIO ED. 2026 // TORINO
      </div>
      <div className="absolute bottom-4 right-6 hidden md:block z-30 text-[10px] font-mono text-carbon/40 tracking-wider">
        CONCETTO: DUE ANIME DISTINTE
      </div>

    </div>
  );
}
