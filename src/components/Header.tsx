interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-4 sm:p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="text-white text-xs sm:text-sm uppercase tracking-wide font-bold">Valentino Vape Shop</div>
        <nav className="flex items-center gap-4 sm:gap-8">
          <a
            href="#catalog"
            className="text-white hover:text-neutral-400 transition-colors duration-300 uppercase text-xs sm:text-sm"
          >
            Каталог
          </a>
          <a
            href="https://t.me/swwaatteer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-neutral-400 transition-colors duration-300 uppercase text-xs sm:text-sm"
          >
            Telegram
          </a>
        </nav>
      </div>
    </header>
  );
}
