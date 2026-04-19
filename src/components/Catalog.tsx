import { useState } from "react";

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

export default function Catalog() {
  const [tab, setTab] = useState<Tab>("liquids");
  const items =
    tab === "liquids" ? liquids
    : tab === "disposables" ? disposables
    : tab === "pods" ? pods
    : tab === "coils" ? coils
    : cartridges;

  return (
    <section id="catalog" className="bg-neutral-950 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="uppercase text-neutral-500 text-xs tracking-widest mb-4">Ассортимент</p>
        <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tight mb-10">
          КАТАЛОГ
        </h2>

        <div className="flex gap-2 mb-10">
          <button
            onClick={() => setTab("liquids")}
            className={`px-6 py-2 uppercase text-sm tracking-wide border transition-all duration-200 cursor-pointer ${
              tab === "liquids"
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-neutral-700 hover:border-white"
            }`}
          >
            Жижи
          </button>
          <button
            onClick={() => setTab("disposables")}
            className={`px-6 py-2 uppercase text-sm tracking-wide border transition-all duration-200 cursor-pointer ${
              tab === "disposables"
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-neutral-700 hover:border-white"
            }`}
          >
            Одноразки
          </button>
          <button
            onClick={() => setTab("pods")}
            className={`px-6 py-2 uppercase text-sm tracking-wide border transition-all duration-200 cursor-pointer ${
              tab === "pods"
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-neutral-700 hover:border-white"
            }`}
          >
            Поды
          </button>
          <button
            onClick={() => setTab("coils")}
            className={`px-6 py-2 uppercase text-sm tracking-wide border transition-all duration-200 cursor-pointer ${
              tab === "coils"
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-neutral-700 hover:border-white"
            }`}
          >
            Испарители
          </button>
          <button
            onClick={() => setTab("cartridges")}
            className={`px-6 py-2 uppercase text-sm tracking-wide border transition-all duration-200 cursor-pointer ${
              tab === "cartridges"
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-neutral-700 hover:border-white"
            }`}
          >
            Картриджи
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-neutral-950 p-6 flex flex-col justify-between gap-4 hover:bg-neutral-900 transition-colors duration-200 group"
            >
              <div>
                <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">{item.desc}</p>
                <h3 className="text-white text-lg font-semibold leading-tight">{item.name}</h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-2xl font-bold">{item.price} ₽</span>
                <a
                  href="https://t.me/swwaatteer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wide text-neutral-400 border border-neutral-700 px-3 py-1.5 group-hover:border-white group-hover:text-white transition-all duration-200"
                >
                  Заказать
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-neutral-500 text-sm mb-4">Вопросы по наличию и заказу — пишите в Telegram</p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://t.me/swwaatteer"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-3 uppercase text-sm tracking-wide hover:bg-neutral-200 transition-colors duration-200"
            >
              @swwaatteer
            </a>
            <a
              href="https://t.me/Pabl0_Eskabar"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-8 py-3 uppercase text-sm tracking-wide hover:bg-white hover:text-black transition-colors duration-200"
            >
              @Pabl0_Eskabar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}