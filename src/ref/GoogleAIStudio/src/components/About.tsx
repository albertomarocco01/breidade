import { motion } from "motion/react";
import { ArrowLeft, Mail, Phone, Instagram, Linkedin, Send, Compass } from "lucide-react";

interface AboutProps {
  onBackToGate: () => void;
}

export default function About({ onBackToGate }: AboutProps) {
  return (
    <div className="min-h-screen bg-cream text-carbon relative select-none selection:bg-tomato selection:text-cream">
      
      {/* Decorative Stamp watermarks */}
      <div className="absolute top-1/4 right-10 opacity-5 pointer-events-none text-right hidden lg:block">
        <span className="font-sans text-[15vw] font-black text-tomato block leading-none">設計</span>
        <span className="font-sans text-[15vw] font-black text-tomato block leading-none">書法</span>
      </div>

      {/* Floating UI Header */}
      <nav className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b-[3px] border-carbon py-4 px-6 md:px-10 flex items-center justify-between">
        <button 
          onClick={onBackToGate}
          className="group flex items-center gap-2.5 px-4 py-2 border-2 border-carbon text-carbon hover:bg-tomato hover:text-cream hover:border-tomato transition-all rounded-lg font-mono text-xs md:text-sm font-bold uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Torna Indietro</span>
        </button>

        <div className="flex flex-col items-end">
          <div className="font-sans text-xl md:text-2xl font-black tracking-tighter uppercase text-tomato">
            設計師 — THE DESIGNER
          </div>
          <div className="font-mono text-[9px] md:text-xs tracking-widest uppercase opacity-60">
            [ CHI SONO // GIULIA BREIDA ]
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-20">
        
        {/* About Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Column 1: Confident Self-Portrait (Unsplash Curated) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full aspect-[3/4] border-[3px] border-carbon rounded-2xl overflow-hidden shadow-[8px_8px_0px_#121212] bg-carbon group">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" 
                alt="Portrait of Giulia Breida with high-contrast color scheme" 
                className="w-full h-full object-cover grayscale transition-all duration-[1s] group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              {/* Overlay Signature Stamp */}
              <div className="absolute bottom-4 right-4 bg-tomato text-cream font-mono text-[9px] font-bold px-3 py-1 border border-carbon rotate-6 group-hover:rotate-0 transition-transform">
                BREIDA 2001_TO
              </div>
            </div>

            {/* Spec Label Tags */}
            <div className="w-full mt-8 border-2 border-carbon rounded-2xl p-4 bg-tomato text-cream shadow-[4px_4px_0px_#121212] flex flex-col gap-2 font-mono text-[11px]">
              <div className="flex justify-between border-b border-cream/20 pb-1">
                <span className="opacity-70 font-bold">NATA NEL:</span>
                <span className="font-bold">2001, Torino</span>
              </div>
              <div className="flex justify-between border-b border-cream/20 pb-1">
                <span className="opacity-70 font-bold">MESSA A FUCO:</span>
                <span className="font-bold">Canon 35mm / Riso Print</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70 font-bold">PROFILO:</span>
                <span className="font-bold text-[#DFFF00]">設計師 / DESIGNER</span>
              </div>
            </div>
          </div>

          {/* Column 2: Large Biographic Prose & Chinese Thread Context */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Massive Heading */}
            <div>
              <span className="font-mono text-xs text-tomato font-bold tracking-widest uppercase block mb-1">
                // INTRODUZIONE
              </span>
              <h2 className="font-sans text-4xl md:text-7xl font-black text-carbon tracking-tighter uppercase leading-[0.9] mb-4">
                GIULIA BREIDA
              </h2>
              {/* Handwritten custom accent text */}
              <div className="font-hand text-3xl md:text-5xl text-tomato transform -rotate-2 select-none">
                "se non esplode, non mi interessa"
              </div>
            </div>

            {/* Main Bio - Bilingual (Italian-first) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-carbon/20">
              
              {/* Italian Version */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] font-bold text-tomato uppercase bg-tomato/15 px-2 py-0.5 rounded tracking-widest self-start">
                  ITALIANO
                </span>
                <p className="font-serif text-base md:text-lg text-carbon leading-relaxed">
                  Graphic designer e fotografa torinese, classe 2001. Cresciuta a pane, fanzine cartacee stampate male e una fascinazione sfacciata per la cultura d'Oriente. Per me, la parola cinese <strong className="text-tomato">設計師 (designer)</strong> non è un vezzo o una decorazione di facciata; è la sintesi dinamica tra il rumore acido della serigrafia Gen-Z e il silenzio crudo, quasi sacro, della luce naturale sulla pelle.
                </p>
                <p className="font-serif text-base md:text-lg text-carbon/80 leading-relaxed">
                  Lavoro manipolando vernice catarifrangente, vecchie Polaroid rimesse a nuovo e impaginati che strappano lo schema pulito del grid sabaudo.
                </p>
              </div>

              {/* English Version */}
              <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-carbon/20 pt-6 md:pt-0 md:pl-6 bg-[#121212]/[0.02] p-4 rounded-xl">
                <span className="font-mono text-[10px] font-bold text-carbon/50 uppercase bg-carbon/5 px-2 py-0.5 rounded tracking-widest self-start">
                  ENGLISH
                </span>
                <p className="font-serif text-sm md:text-base text-carbon/70 leading-relaxed italic">
                  A graphic designer and photographer born in Torino, 2001. Raised on analog zines, punk printers, and an unapologetic obsession with Eastern typography. I adopt the hanzi <strong className="text-carbon font-semibold">設計師 (設計師 = the designer)</strong> as a heavy, genuine stamp representing the dialogue between noisy graphic interventions and the poetic raw documentation of human hands.
                </p>
                <p className="font-serif text-sm md:text-base text-carbon/60 leading-relaxed italic">
                  My practice actively defies rigid grids, blending saturated Gen-Z streetwear prints with natural-light architectural silence.
                </p>
              </div>

            </div>

            {/* China Thread Section with Beautiful Icon Calligraphy */}
            <div className="border-3 border-carbon rounded-2xl p-6 bg-[#FCFAF2] shadow-[6px_6px_0px_#121212] relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-tomato text-cream py-6 px-8 rounded-xl font-sans font-black text-5xl md:text-6xl border-2 border-carbon select-none transform -rotate-3 hover:rotate-0 transition-transform cursor-default">
                設計師
              </div>
              <div className="flex-1">
                <h4 className="font-sans text-lg font-bold uppercase text-tomato flex items-center gap-1.5">
                  <Compass className="w-5 h-5" /> IL PONTE DELL'ALTOPIANO (SHÈ JÌ SHĪ)
                </h4>
                <p className="font-serif text-sm text-carbon/80 mt-2 leading-relaxed">
                  "設計師" tradotto significa letteralmente "Il Progettista". Per Giulia rappresenta un atto di ribellione formale: assemblare simboli carichi di millenni con la freschezza estemporanea dello stile street piemontese. Nessun esotismo, ma ricerca strutturale sulla calligrafia.
                </p>
              </div>
            </div>

            {/* Contacts & Links Curation Layout */}
            <div className="border-[3px] border-carbon bg-carbon text-cream rounded-2xl p-6 md:p-10 shadow-[8px_8px_0px_#FF3E2B]">
              <span className="font-mono text-xs text-[#DFFF00] font-bold tracking-widest uppercase block mb-6">
                // METTITI IN CONTATTO / REACH ME OUT
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Traditional Channels */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 border border-cream/30 bg-cream/10 rounded-lg text-[#DFFF00]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-cream/40 block">Email principale</span>
                      <a href="mailto:giulia.breida@gmail.com" className="font-mono text-sm md:text-base text-cream hover:text-tomato font-bold transition-colors">
                        giulia.breida@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 border border-cream/30 bg-cream/10 rounded-lg text-[#DFFF00]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-cream/40 block">Telefono cellular</span>
                      <a href="tel:+393518172634" className="font-mono text-sm md:text-base text-cream hover:text-tomato transition-colors">
                        +39 351 817 2634
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Networks with Beautiful Floating Animations */}
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[10px] uppercase text-cream/50 block border-b border-cream/10 pb-1">
                    Canali di Ricerca / Networks
                  </span>
                  
                  <div className="flex gap-4">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 border border-cream/20 hover:border-[#DFFF00] rounded-xl hover:bg-cream hover:text-carbon transition-all font-mono text-xs font-bold uppercase cursor-pointer"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Instagram</span>
                    </a>

                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 border border-cream/20 hover:border-[#DFFF00] rounded-xl hover:bg-cream hover:text-carbon transition-all font-mono text-xs font-bold uppercase cursor-pointer"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  </div>

                  <span className="font-mono text-[9px] text-cream/30 text-right uppercase mt-2">
                    [ TORINO, ITALIA // ED. PORTFOLIO 2026 ]
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
