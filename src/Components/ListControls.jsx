const ListControls = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  sortOptions,
  placeholder = 'Buscar por nome',
}) => {
  return (
    <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/25 p-3 md:grid-cols-[minmax(0,1fr)_220px]">
      <label className="block">
        <span className="sr-only">Buscar</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white outline-none transition-colors duration-200 placeholder:text-slate-500 focus:border-[#ff4655]"
        />
      </label>

      <label className="block">
        <span className="sr-only">Ordenar</span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#101728] px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white outline-none transition-colors duration-200 focus:border-[#ff4655]"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default ListControls;
