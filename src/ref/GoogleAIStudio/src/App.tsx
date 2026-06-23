import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Gateway from "./components/Gateway";
import Grapholio from "./components/Grapholio";
import Fotofolio from "./components/Fotofolio";
import About from "./components/About";

type WorldType = "gate" | "grapholio" | "fotofolio" | "about";

export default function App() {
  const [activeWorld, setActiveWorld] = useState<WorldType>("gate");

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden font-sans select-none antialiased bg-cream">
      
      {/* Cinematic Film-Grain Texture Overlay (Styled in index.css) */}
      <div className="grain-overlay" />

      {/* Primary Transition Router with Motion */}
      <AnimatePresence mode="wait">
        
        {activeWorld === "gate" && (
          <motion.div
            key="gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Gateway onSelectWorld={(world) => setActiveWorld(world)} />
          </motion.div>
        )}

        {activeWorld === "grapholio" && (
          <motion.div
            key="grapholio"
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 120 }}
          >
            <Grapholio onBackToGate={() => setActiveWorld("gate")} />
          </motion.div>
        )}

        {activeWorld === "fotofolio" && (
          <motion.div
            key="fotofolio"
            initial={{ opacity: 0, filter: "brightness(0.3)" }}
            animate={{ opacity: 1, filter: "brightness(1)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Fotofolio onBackToGate={() => setActiveWorld("gate")} />
          </motion.div>
        )}

        {activeWorld === "about" && (
          <motion.div
            key="about"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", damping: 25, stiffness: 150 }}
          >
            <About onBackToGate={() => setActiveWorld("gate")} />
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
