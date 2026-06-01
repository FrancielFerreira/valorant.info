const ListControls = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  sortOptions,
  filters = [],
  placeholder = 'Buscar por nome',
}) => {
  const shouldStackSearch = filters.length >= 3;
  const containerClassName = shouldStackSearch
    ? 'space-y-3 rounded-2xl border border-white/10 bg-black/25 p-3'
    : 'flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/25 p-3 lg:flex-row';
  const controlsClassName = shouldStackSearch
    ? 'grid gap-3 sm:grid-cols-2 xl:grid-cols-4'
    : filters.length
      ? 'grid gap-3 sm:grid-cols-2 lg:w-[456px]'
      : 'grid gap-3 lg:w-32';

  return (
    <div className={containerClassName}>
      <label className="block lg:flex-1">
        <span className="sr-only">Buscar</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white outline-none transition-colors duration-200 placeholder:text-slate-500 focus:border-[#ff4655]"
        />
      </label>

      <div className={controlsClassName}>
        {filters.map((filter) => (
          <label key={filter.name} className="block">
            <span className="sr-only">{filter.label}</span>
            <select
              value={filter.value}
              onChange={(event) => filter.onChange(event.target.value)}
              className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#101728] px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white outline-none transition-colors duration-200 focus:border-[#ff4655]"
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}

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
    </div>
  );
};

export default ListControls;
