import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-neutral-950 flex flex-col items-center justify-center gap-6"
        >
          <div className="relative w-24 h-24">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                style={{ rotate: i * 60 }}
                animate={{
                  rotate: [i * 60, i * 60 + 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    width: 6 - i * 0.5,
                    height: 6 - i * 0.5,
                    background: `rgba(255,255,255,${0.9 - i * 0.12})`,
                    boxShadow: `0 0 ${8 - i}px rgba(255,255,255,0.8)`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            ))}
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💨
            </motion.div>
          </div>

          <motion.p
            className="text-white text-xs uppercase tracking-[0.3em] opacity-60"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Valentino Vape Shop
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
