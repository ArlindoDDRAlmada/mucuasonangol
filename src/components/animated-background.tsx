"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Central Glow Spot */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-gradient-radial from-yellow-400/20 via-yellow-400/10 to-transparent rounded-full blur-2xl sm:blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle Curved Line 1 */}
      <motion.div
        className="absolute top-1/3 left-0 w-full h-px hidden sm:block"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(234, 179, 8, 0.1) 20%, rgba(234, 179, 8, 0.2) 50%, rgba(234, 179, 8, 0.1) 80%, transparent 100%)",
          transform: "rotate(-15deg) translateY(-100px)",
          transformOrigin: "center",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle Curved Line 2 */}
      <motion.div
        className="absolute bottom-1/3 left-0 w-full h-px hidden sm:block"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(234, 179, 8, 0.1) 20%, rgba(234, 179, 8, 0.2) 50%, rgba(234, 179, 8, 0.1) 80%, transparent 100%)",
          transform: "rotate(15deg) translateY(100px)",
          transformOrigin: "center",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Mobile-only simplified background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-50/30 to-transparent sm:hidden" />
    </div>
  );
}
