const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-20 w-full border-b border-white/10 bg-[#070914]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <h1 className="font-display text-xl uppercase tracking-[0.34em] text-white">
          Valorant<span className="text-[#ff4655]">Info</span>
        </h1>
        <span className="hidden rounded-full border border-[#ff4655]/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#ffb3ba] sm:inline-block">
          Wiki BR
        </span>
      </div>
    </header>
  );
};

export default Header;
