import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <img
            src="https://cdn.poehali.dev/projects/d7bb2a93-738e-431b-b1b9-744b914d1cf3/files/1e9d366e-4792-4b2b-b4c0-574fe2a10fdf.jpg"
            alt="Vapor clouds"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </div>

      <h3 className="absolute top-4 right-4 sm:top-8 sm:right-6 md:top-12 text-white uppercase z-10 text-xs sm:text-sm md:text-base lg:text-lg">
        Поддержка 24/7
      </h3>

      <p className="absolute bottom-4 right-4 sm:bottom-8 sm:right-6 md:bottom-12 text-white text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl max-w-[85vw] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-5xl z-10">
        Есть вопрос по заказу или выбору устройства? Пиши нам в Telegram — ответим быстро и поможем с выбором.
      </p>
    </div>
  );
}
