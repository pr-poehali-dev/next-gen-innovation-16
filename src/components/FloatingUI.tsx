import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NOTIFICATIONS = [
  { icon: "🔥", text: "ТВОЯ ЖИЖА ЗАКОНЧИЛАСЬ. ЗАКАЗЫВАЙ НОВУЮ, ПОКА Я НЕ ПРИШЁЛ" },
  { icon: "💨", text: "НОВИНКА: МАНГО-АПЕЛЬСИН ГУАВА. ТЫ ТАКОГО НЕ ПРОБОВАЛ" },
];

export default function FloatingUI() {
  const [showTop, setShowTop] = useState(false);
  const [notif, setNotif] = useState<{ icon: string; text: string } | null>(null);
  const [notifIndex, setNotifIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const show = (idx: number) => {
      setNotif(NOTIFICATIONS[idx]);
      setTimeout(() => {
        setNotif(null);
        const next = (idx + 1) % NOTIFICATIONS.length;
        setNotifIndex(next);
        setTimeout(() => show(next), 8000);
      }, 4000);
    };
    const t = setTimeout(() => show(notifIndex), 3000);
    return () => clearTimeout(t);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (navigator.vibrate) navigator.vibrate([40, 20, 40]);
  };

  const shareLink = () => {
    const msg = encodeURIComponent("Смотри, какой прикольный вейп-шоп: " + window.location.href);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${msg}`, "_blank");
  };

  return (
    <>
      <AnimatePresence>
        {notif && (
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-24 right-4 z-50 max-w-[280px] bg-neutral-900 border border-neutral-700 p-3 shadow-2xl"
          >
            <div className="flex gap-2 items-start">
              <span className="text-xl flex-shrink-0">{notif.icon}</span>
              <p className="text-white text-xs font-bold leading-snug uppercase">{notif.text}</p>
            </div>
            <div className="mt-2 h-0.5 bg-neutral-800 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end">
        <button
          onClick={shareLink}
          className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 text-white px-3 py-2 text-xs uppercase tracking-wide hover:border-white transition-colors"
        >
          <span>✈️</span> Поделиться
        </button>

        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollTop}
              className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors shadow-lg"
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-sm font-black"
              >
                ↑
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
