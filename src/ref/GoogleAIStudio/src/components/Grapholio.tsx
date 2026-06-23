import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X, Layers, ExternalLink, Globe } from "lucide-react";
import { grapholioProjects } from "../data";
import { Project } from "../types";

interface GrapholioProps {
  onBackToGate: () => void;
}

export default function Grapholio({ onBackToGate }: GrapholioProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Tutto");
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const categories = ["Tutto", "pack design", "city brand", "signal / wayfinding", "brand", "adv", "editorial", "graphic"];

  const filteredProjects = activeCategory === "Tutto"
    ? grapholioProjects
    : grapholioProjects.filter(p => p.category.includes(activeCategory));

  return (
    <div className={`min-h-screen transition-all duration-700 bg-cream text-carbon relative selection:bg-tomato selection:text-cream`}>
      
      {/* Dynamic Ambient Color Band reacting to hovered projects */}
      <div className="absolute top-0 left-0 w-full h-[60vh] -z-10 overflow-hidden pointer-events-none opacity-40 blur-[100px] transition-all duration-1000">
        <div className={`w-96 h-96 rounded-full absolute -top-10 left-10 transition-colors duration-[1500ms] ${
          hoveredProject?.id === "boem" ? "bg-tomato" :
          hoveredProject?.id === "ancora-ancona" ? "bg-accent-blue" :
          hoveredProject?.id === "flashback" ? "bg-accent-teal" :
          hoveredProject?.id === "notala" ? "bg-accent-green" :
          hoveredProject?.id === "durex" ? "bg-tomato" :
          hoveredProject?.id === "sanbaudia" ? "bg-[#FFD700]" :
          hoveredProject?.id === "kombat-xxv" ? "bg-carbon" :
          hoveredProject?.id === "kappa-futur" ? "bg-tomato" :
          "bg-tomato/30"
        }`} />
        <div className={`w-96 h-96 rounded-full absolute top-[30vh] right-10 transition-colors duration-[1500ms] ${
          hoveredProject?.id === "boem" ? "bg-accent-blue" :
          hoveredProject?.id === "ancora-ancona" ? "bg-tomato" :
          hoveredProject?.id === "flashback" ? "bg-[#8A2BE2]" :
          hoveredProject?.id === "notala" ? "bg-tomato" :
          "bg-accent-teal/20"
        }`} />
      </div>

      {/* Floating UI Header */}
      <nav className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b-[3px] border-carbon py-4 px-6 md:px-10 flex items-center justify-between">
        <button 
          onClick={onBackToGate}
          className="group flex items-center gap-2.5 px-4 py-2 border-2 border-carbon text-carbon hover:bg-tomato hover:text-cream hover:border-tomato transition-all rounded-lg font-mono text-xs md:text-sm font-bold uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Indietro / Bivio</span>
        </button>

        <div className="flex flex-col items-end">
          <div className="font-sans text-xl md:text-2xl font-black tracking-tighter uppercase text-tomato">
            Giulia Breida // 設計師
          </div>
          <div className="font-mono text-[9px] md:text-xs tracking-widest uppercase opacity-60">
            [ GRAPHOLIO — DISEGNO GRAFICO ]
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">
        
        {/* Brand Statement banner */}
        <section className="mb-14 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs text-tomato font-bold tracking-widest uppercase block mb-2">
                // MANIFESTO VISIVO 
              </span>
              <h1 className="font-sans text-4xl md:text-7xl font-black text-carbon tracking-tighter uppercase leading-[0.9]">
                LOUD. COLOURFUL. <span className="text-tomato">PLAYFUL.</span>
              </h1>
              <p className="mt-4 max-w-xl font-serif text-lg md:text-2xl text-carbon/80 leading-relaxed">
                Progetti visivi nati per essere notati, che esplodono di energia e carattere. Un ponte asimmetrico e bilingue tra la scuola grafica piemontese e la scrittura ideografica orientale.
              </p>
            </div>
            {/* China Thread Motif Card */}
            <div className="lg:col-span-4 border-[3px] border-carbon bg-tomato text-cream p-6 rounded-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300 shadow-[6px_6px_0px_#121212]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#DFFF00] font-bold block mb-1">
                Motivo Ricorrente / Recurring Motif
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-sans text-4xl md:text-5xl font-black text-[#DFFF00]">設計師</span>
                <div className="font-mono text-xs text-cream/90 leading-tight border-l pl-3 border-cream/30">
                  <p>SHÈ JÌ SHĪ</p>
                  <p className="font-bold">"THE DESIGNER"</p>
                </div>
              </div>
              <p className="font-mono text-[11px] text-cream/90 mt-4 leading-tight">
                La continua tensione di unire la parola scritta alle forme vive. La calligrafia come pittura razionale.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="border-b-[3px] border-carbon pb-6 mb-12 overflow-x-auto flex flex-nowrap md:flex-wrap gap-2.5 items-center scrollbar-none scroll-smooth">
          <span className="font-mono text-xs font-bold text-tomato uppercase mr-2 shrink-0 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> FILTRA:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase transition-all tracking-wider shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? "bg-carbon text-cream border-2 border-carbon"
                  : "bg-cream text-carbon hover:bg-tomato hover:text-cream border-2 border-carbon"
              }`}
            >
              {cat === "Tutto" ? "Tutto / All" : cat}
            </button>
          ))}
        </section>

        {/* Projects Grid with Asymmetrical compositions */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredProjects.map((project, idx) => {
            // Apply unique hand-designed rotations to reflect asymmetry and editorial feel
            const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-0"];
            const rotClass = rotations[idx % rotations.length];
            
            return (
              <motion.article
                key={project.id}
                layout
                className={`relative group flex flex-col justify-between border-[3px] border-carbon bg-cream p-4 rounded-2xl transform ${rotClass} hover:rotate-0 transition-transform duration-500 shadow-[8px_8px_0px_#121212] overflow-hidden`}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Visual Label Tag */}
                <div className="flex justify-between items-center border-b-2 border-carbon pb-3 mb-4">
                  <span className="font-mono text-xs text-tomato font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="font-mono text-xs text-carbon/40 tracking-wider">
                    {project.year}
                  </span>
                </div>

                {/* Main graphic container */}
                <div 
                  onClick={() => setSelectedProject(project)}
                  className="relative aspect-video rounded-xl border-2 border-carbon overflow-hidden bg-carbon cursor-pointer"
                >
                  {/* Floating Chinese stamp accent */}
                  {project.chineseTitle && (
                    <div className="absolute top-3 right-3 z-20 bg-tomato text-cream font-sans font-bold text-xs px-2.5 py-1 rounded border border-carbon shadow-md">
                      {project.chineseTitle}
                    </div>
                  )}

                  <img 
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="font-mono text-[10px] text-cream uppercase tracking-widest flex items-center gap-1.5 font-bold">
                      [ Apri Progetto / Open Sheet ] <ExternalLink className="w-3 h-3 text-[#DFFF00]" />
                    </span>
                  </div>
                </div>

                {/* PROJECT TITLE - HANDWRITTEN (Giulia's Real Pen Identity) */}
                <div className="mt-5 flex justify-between items-end">
                  <div className="cursor-pointer" onClick={() => setSelectedProject(project)}>
                    {/* The signature handwriting placeholder slot: Reenie Beanie & La Belle Aurore */}
                    <div className="font-hand font-normal text-4xl md:text-5xl text-carbon hover:text-tomato tracking-widest pl-1 leading-none select-none transition-colors duration-200">
                      {project.title}
                    </div>
                    {/* Secondary clean metadata in subline */}
                    <div className="font-mono text-[10px] tracking-wider text-carbon/60 mt-1 uppercase">
                      {project.tags.slice(0, 2).join(" · ")}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="p-2 border-2 border-carbon rounded-lg hover:bg-carbon hover:text-cream transition-colors duration-200 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 rotate-135" />
                  </button>
                </div>

                {/* Accent Background Overlay with high contrast on hover */}
                <div className="absolute top-0 right-0 w-2.5 h-full opacity-0 group-hover:opacity-100 transition-opacity bg-tomato duration-300" />
              </motion.article>
            );
          })}
        </section>

      </main>

      {/* DETAILED PROJECT DRAWER (IMMERSIVE EDITORIAL SHEET) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-carbon/60 backdrop-blur-md flex items-end justify-center p-0 md:p-6"
          >
            {/* Sheet Body */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-cream w-full max-w-5xl h-[92vh] md:h-[88vh] md:rounded-3xl border-t-4 md:border-4 border-carbon shadow-2xl overflow-y-auto flex flex-col"
            >
              {/* Sheet Header */}
              <div className="sticky top-0 z-10 bg-cream/95 backdrop-blur-md border-b-[3px] border-carbon px-6 py-4 md:px-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs md:text-sm text-tomato font-bold uppercase tracking-widest">
                    // SCHEDA DETTAGLIO
                  </span>
                  <span className="font-mono text-xs text-carbon/40 hidden md:inline">
                    · PROGETTO {selectedProject.year}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 border-2 border-carbon rounded-full hover:bg-tomato hover:text-cream hover:border-tomato transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sheet Content scrollbody */}
              <div className="flex-1 p-6 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                  
                  {/* Left: Huge Graphic presentation */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="relative border-4 border-carbon rounded-2xl overflow-hidden bg-carbon aspect-video">
                      <img 
                        src={selectedProject.imageUrl} 
                        alt={selectedProject.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {selectedProject.chineseTitle && (
                        <div className="absolute bottom-4 left-4 bg-tomato text-cream border-2 border-carbon p-3 rounded-lg font-sans font-black text-xl md:text-2xl tracking-widest">
                          {selectedProject.chineseTitle}
                        </div>
                      )}
                    </div>

                    {/* Fun decorative Gen-Z design specs */}
                    <div className="border-2 border-carbon rounded-xl p-4 bg-[#FF3E2B]/5 font-mono text-[11px] text-carbon/80 leading-relaxed grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-tomato font-bold block mb-1">STILE / AESTHETIC</span>
                        <span>Massimalista, asimmetrico, acido, contemporaneo.</span>
                      </div>
                      <div>
                        <span className="text-tomato font-bold block mb-1">PRODUZIONE</span>
                        <span>Stampa risograph, spot UV sagomati, serigrafia analogica.</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Bilingual description & Metadata */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    
                    <div>
                      {/* Project handwriting title slot */}
                      <span className="font-mono text-[10px] tracking-widest uppercase text-tomato font-bold">
                        TITOLO AUTOGRAFO
                      </span>
                      <h2 className="font-hand text-5xl md:text-7xl text-carbon leading-none select-none mt-1 mb-6">
                        {selectedProject.title}
                      </h2>

                      {/* Technical Specs Checklist */}
                      <div className="border-2 border-carbon rounded-2xl p-5 bg-cream shadow-[4px_4px_0px_#121212] mb-6 flex flex-col gap-3">
                        <div className="flex justify-between border-b pb-1.5 border-carbon/20">
                          <span className="font-mono text-xs font-bold uppercase text-carbon/60">Categoria:</span>
                          <span className="font-mono text-xs font-bold text-carbon uppercase">{selectedProject.category}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1.5 border-carbon/20">
                          <span className="font-mono text-xs font-bold uppercase text-carbon/60">Anno:</span>
                          <span className="font-mono text-xs font-bold text-carbon">{selectedProject.year}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1.5 border-carbon/20">
                          <span className="font-mono text-xs font-bold uppercase text-carbon/60">Località:</span>
                          <span className="font-sans text-xs font-bold text-carbon">Torino, IT / Online</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {selectedProject.tags.map((t, i) => (
                            <span key={i} className="font-mono text-[10px] uppercase font-bold text-tomato border border-tomato/30 px-2 py-0.5 rounded-full">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* IT Narrative — Primary */}
                      <div className="prose mb-6">
                        <span className="font-mono text-[10px] font-bold text-tomato uppercase bg-tomato/10 px-2 py-0.5 rounded tracking-widest">
                          ITALIANO
                        </span>
                        <p className="font-serif text-base md:text-lg text-carbon/90 leading-relaxed mt-2">
                          {selectedProject.descriptionIT}
                        </p>
                      </div>

                      {/* EN Narrative — Secondary */}
                      <div className="prose border-t border-carbon/20 pt-4">
                        <span className="font-mono text-[10px] font-bold text-carbon/40 uppercase bg-carbon/5 px-2 py-0.5 rounded tracking-widest">
                          ENGLISH
                        </span>
                        <p className="font-serif italic text-sm md:text-base text-carbon/60 leading-relaxed mt-2">
                          {selectedProject.descriptionEN}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t-2 border-carbon flex justify-between items-center text-[11px] font-mono text-carbon/50">
                      <span>GIULIA BREIDA // {selectedProject.id.toUpperCase()}</span>
                      <span>設計師 PORTFOLIO</span>
                    </div>

                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
