export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/d7bb2a93-738e-431b-b1b9-744b914d1cf3/files/1a85f291-b66b-42ab-b7df-b19ba58b1984.jpg"
          alt="Premium vape devices"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">Премиум-ассортимент</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Только проверенные бренды — Lost Mary, Elf Bar, Vozol, Geek Vape.
          Большой выбор жидкостей, устройств и расходников. Всё в одном месте.
        </p>
        <a
          href="https://t.me/swwaatteer"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide inline-block"
        >
          Перейти в каталог
        </a>
      </div>
    </div>
  );
}