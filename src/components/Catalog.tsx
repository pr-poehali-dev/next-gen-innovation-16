import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const liquids = [
  { name: "Dual Extreme", desc: "50 мг", price: 450 },
  { name: "Dual Extreme", desc: "70 мг", price: 450 },
  { name: "Skala Salt", desc: "50 мг", price: 450 },
  { name: "Dual", desc: "20 мг", price: 400 },
  { name: "Podonki Vintage", desc: "50 мг", price: 450 },
  { name: "Dota", desc: "60 мг", price: 450 },
  { name: "Podonki v1 / v2", desc: "50 мг", price: 400 },
  { name: "Cyber", desc: "35–40 мг", price: 450 },
  { name: "SKALA Salt", desc: "60 мг", price: 450 },
  { name: "Podonki Last HAP", desc: "50 мг", price: 450 },
  { name: "DUAL", desc: "50 мг", price: 450 },
  { name: "RAZЪEB", desc: "70 мг", price: 450 },
  { name: "Hotspot Morph", desc: "50 мг", price: 450 },
  { name: "Rick & Morty (замерзон)", desc: "50 мг", price: 450 },
  { name: "Podonki Malaysian", desc: "50 мг", price: 450 },
];

const disposables = [
  { name: "Puffmi FLORA", desc: "25 000 тяг", price: 1800 },
  { name: "Funky Lands Di", desc: "15 000 тяг", price: 1100 },
  { name: "HQD Bang", desc: "5 000 тяг", price: 500 },
  { name: "HOTSPOT", desc: "4 000 тяг", price: 700 },
  { name: "WAKA", desc: "20 000 тяг · 5–7%", price: 1800 },
  { name: "HQD Bang Pro", desc: "5 000 тяг", price: 600 },
  { name: "DUALL BAR", desc: "12 000 тяг", price: 1000 },
  { name: "Waka Jupiter Extra", desc: "30 000 тяг", price: 1900 },
  { name: "Рик и Морти (замерзон)", desc: "20 000 тяг", price: 1500 },
];

const coils = [
  { name: "HERO", desc: "0.2 Ом · 50–58W", price: 350 },
  { name: "HERO", desc: "0.3 Ом · 30–38W", price: 350 },
  { name: "HERO", desc: "0.4 Ом · 25–35W", price: 350 },
];

const cartridges = [
  { name: "Aegis Hero (без испарителя)", desc: "Картридж", price: 500 },
  { name: "Vaporesso", desc: "0.6 Ом", price: 350 },
  { name: "Vaporesso", desc: "0.4 Ом", price: 350 },
];

const pods = [
  { name: "Vaporesso Xros 5 Mini", desc: "Под-система", price: 1900 },
  { name: "Aegis Hero 5", desc: "Под-система", price: 3000 },
  { name: "Vaporesso Xros 5", desc: "Под-система", price: 2650 },
];

type Tab = "liquids" | "disposables" | "pods" | "coils" | "cartridges";

const tabs: { id: Tab; label: string; emoji: string }[] = [
  { id: "liquids", label: "Жижи", emoji: "💧" },
  { id: "disposables", label: "Одноразки", emoji: "⚡" },
  { id: "pods", label: "Поды", emoji: "🫧" },
  { id: "coils", label: "Испарители", emoji: "🔥" },
  { id: "cartridges", label: "Картриджи", emoji: "🔋" },
];

const tabIcons: Record<Tab, string> = {
  liquids: "💧",
  disposables: "⚡",
  pods: "🫧",
  coils: "🔥",
  cartridges: "🔋",
};

interface Spark {
  id: number;
  x: number;
  y: number;
  angle: number;
}

function SparkEffect({ sparks }: { sparks: Spark[] }) {
  return (
    <AnimatePresence>
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          className="fixed pointer-events-none z-[200] w-1.5 h-1.5 rounded-full"
          style={{
            left: s.x,
            top: s.y,
            background: ["#fff", "#ffe066", "#ff9d00", "#ffffff"][s.id % 4],
            boxShadow: "0 0 4px 2px rgba(255,200,0,0.7)",
          }}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{
            x: Math.cos(s.angle) * (30 + Math.random() * 50),
            y: Math.sin(s.angle) * (30 + Math.random() * 50),
            scale: 0,
            opacity: 0,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      ))}
    </AnimatePresence>
  );
}

export default function Catalog({ onPromoChange }: { onPromoChange?: (discount: number) => void }) {
  const [tab, setTab] = useState<Tab>("liquids");
  const [promo, setPromo] = useState("");
  const [promoState, setPromoState] = useState<"idle" | "valid" | "invalid">("idle");
  const [sparks, setSparks] = useState<Spark[]>([]);
  const sparkIdRef = useRef(0);

  const items =
    tab === "liquids" ? liquids
    : tab === "disposables" ? disposables
    : tab === "pods" ? pods
    : tab === "coils" ? coils
    : cartridges;

  const checkPromo = () => {
    if (promo.trim().toLowerCase() === "valentino") {
      setPromoState("valid");
      onPromoChange?.(0.1);
    } else {
      setPromoState("invalid");
      onPromoChange?.(0);
    }
  };

  const fireSparks = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const newSparks: Spark[] = Array.from({ length: 14 }, (_, i) => ({
      id: sparkIdRef.current++,
      x: cx,
      y: cy,
      angle: (i / 14) * Math.PI * 2,
    }));
    setSparks((prev) => [...prev, ...newSparks]);
    setTimeout(() => setSparks((prev) => prev.filter((s) => !newSparks.find((n) => n.id === s.id))), 700);
  }, []);

  return (
    <>
      <SparkEffect sparks={sparks} />
      <style>{`
        .vape-cursor { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24'%3E%3Crect x='8' y='10' width='10' height='7' rx='2' fill='%23fff'/%3E%3Crect x='10' y='17' width='6' height='3' rx='1' fill='%23ccc'/%3E%3Crect x='6' y='12' width='3' height='3' rx='1' fill='%23aaa'/%3E%3Cellipse cx='13' cy='8' rx='2' ry='3' fill='rgba(200,220,255,0.5)'/%3E%3C/svg%3E") 14 14, pointer; }
        .neon-wave { position: relative; overflow: hidden; }
        .neon-wave::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, transparent 70%); opacity: 0; transition: opacity 0.3s; }
        .neon-wave:hover::after { opacity: 1; }
        .neon-wave:active::after { opacity: 1; background: radial-gradient(circle at center, rgba(255,255,255,0.6) 0%, transparent 80%); }
      `}</style>

      <section id="catalog" className="bg-neutral-950 py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="uppercase text-neutral-500 text-xs tracking-widest mb-4">Ассортимент</p>
          <h2 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-8 sm:mb-10">
            КАТАЛОГ
          </h2>

          <div className="flex gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 scrollbar-none">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 sm:px-6 uppercase text-xs sm:text-sm tracking-wide border transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  tab === t.id
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-neutral-700 hover:border-white"
                }`}
              >
                <span className="mr-1.5">{t.emoji}</span>{t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="relative bg-neutral-900 border border-neutral-800 p-5 sm:p-6 flex flex-col gap-5 hover:border-neutral-500 hover:bg-neutral-800 transition-all duration-300 group overflow-hidden"
              >
                <span className="absolute top-4 right-5 text-neutral-700 text-3xl font-black leading-none select-none group-hover:text-neutral-600 transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-col gap-1 pr-10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{tabIcons[tab]}</span>
                    <p className="text-neutral-500 text-[10px] uppercase tracking-widest">{item.desc}</p>
                  </div>
                  <h3 className="text-white text-base sm:text-lg font-bold leading-snug">{item.name}</h3>
                </div>

                <div className="h-px bg-neutral-700 group-hover:bg-neutral-500 transition-colors duration-300" />

                <div className="flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-neutral-500 text-[10px] uppercase tracking-widest mb-0.5">Цена</span>
                    <span className="text-white text-2xl sm:text-3xl font-black leading-none">{item.price} <span className="text-lg font-bold">₽</span></span>
                  </div>
                  <motion.a
                    whileTap={{ scale: 0.93 }}
                    href="https://t.me/swwaatteer"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={fireSparks}
                    className="vape-cursor neon-wave bg-white text-black text-xs uppercase tracking-wide font-semibold px-4 py-2.5 hover:bg-neutral-200 transition-colors duration-200"
                  >
                    Заказать
                  </motion.a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 bg-neutral-900 border border-neutral-800 p-5 sm:p-6">
            <p className="text-neutral-400 text-xs uppercase tracking-widest mb-3">Промокод</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={promo}
                onChange={(e) => { setPromo(e.target.value); setPromoState("idle"); }}
                onKeyDown={(e) => e.key === "Enter" && checkPromo()}
                placeholder="Введи промокод..."
                className={`flex-1 bg-neutral-950 text-white text-sm px-4 py-2.5 border outline-none transition-all duration-200 placeholder:text-neutral-600 ${
                  promoState === "invalid" ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                  : promoState === "valid" ? "border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                  : "border-neutral-700 focus:border-neutral-500"
                }`}
              />
              <button
                onClick={checkPromo}
                className="bg-white text-black text-xs uppercase tracking-wide font-semibold px-4 py-2.5 hover:bg-neutral-200 transition-colors"
              >
                Применить
              </button>
            </div>
            <AnimatePresence>
              {promoState === "valid" && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-400 text-xs mt-2">
                  🎉 Промокод активирован — скидка 10%!
                </motion.p>
              )}
              {promoState === "invalid" && (
                <motion.p
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-red-400 text-xs mt-2"
                >
                  ❌ Неверный промокод
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-neutral-500 text-sm mb-4">Вопросы по наличию и заказу — пишите в Telegram</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
              <a
                href="https://t.me/swwaatteer"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 sm:px-8 py-3 uppercase text-sm tracking-wide hover:bg-neutral-200 transition-colors duration-200 text-center"
              >
                @swwaatteer
              </a>
              <a
                href="https://t.me/Pabl0_Eskabar"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-6 sm:px-8 py-3 uppercase text-sm tracking-wide hover:bg-white hover:text-black transition-colors duration-200 text-center"
              >
                @Pabl0_Eskabar
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
