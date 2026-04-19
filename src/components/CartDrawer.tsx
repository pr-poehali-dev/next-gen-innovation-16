import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
  promoDiscount: number;
}

export default function CartDrawer({ promoDiscount }: CartDrawerProps) {
  const [open, setOpen] = useState(false);
  const { items, removeItem, clearCart, total, count } = useCart();

  const discounted = Math.round(total * (1 - promoDiscount));

  const telegramMessage = encodeURIComponent(
    items.map((i) => `${i.emoji} ${i.name} (${i.desc}) × ${i.qty} — ${i.price * i.qty} ₽`).join("\n") +
    `\n\nИТОГО: ${discounted} ₽` +
    (promoDiscount > 0 ? `\nПромокод применён (-${promoDiscount * 100}%)` : "")
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center justify-center w-10 h-10 text-white hover:text-neutral-300 transition-colors"
        aria-label="Корзина"
      >
        <CartIcon count={count} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-neutral-950 border-l border-neutral-800 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-neutral-800">
                <h2 className="text-white font-bold text-lg uppercase tracking-wide">Корзина</h2>
                <button onClick={() => setOpen(false)} className="text-neutral-400 hover:text-white text-2xl leading-none">&times;</button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
                {items.length === 0 ? (
                  <div className="text-neutral-500 text-center mt-20 text-sm">Корзина пуста 💨</div>
                ) : (
                  items.map((item) => (
                    <div key={item.name + item.desc} className="flex items-center justify-between bg-neutral-900 border border-neutral-800 p-3 gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-xl flex-shrink-0">{item.emoji}</span>
                        <div className="min-w-0">
                          <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                          <p className="text-neutral-500 text-xs">{item.desc} · ×{item.qty}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-white font-bold text-sm">{item.price * item.qty} ₽</span>
                        <button onClick={() => removeItem(item.name, item.desc)} className="text-neutral-600 hover:text-red-400 transition-colors text-lg leading-none">&times;</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-5 border-t border-neutral-800 flex flex-col gap-3">
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-400">Скидка по промокоду</span>
                      <span className="text-green-400">−{promoDiscount * 100}%</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400 text-sm">Итого</span>
                    <span className="text-white text-2xl font-black">{discounted} ₽</span>
                  </div>
                  <a
                    href={`https://t.me/swwaatteer?text=${telegramMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={clearCart}
                    className="block text-center bg-white text-black py-3 uppercase text-sm font-bold tracking-wide hover:bg-neutral-200 transition-colors"
                  >
                    Оформить в Telegram
                  </a>
                  <button onClick={clearCart} className="text-neutral-500 text-xs hover:text-white transition-colors text-center">
                    Очистить корзину
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function CartIcon({ count }: { count: number }) {
  return (
    <div className="relative">
      <motion.div
        key={count}
        animate={count > 0 ? { rotate: [-8, 8, -5, 5, 0], scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </motion.div>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0, y: -4 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
