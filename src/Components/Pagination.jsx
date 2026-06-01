const Pagination = ({ page, totalPages, totalItems, perPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter(
      (item) =>
        item === 1 ||
        item === totalPages ||
        Math.abs(item - page) <= 1,
    );

  return (
    <nav
      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Paginacao"
    >
      <p className="font-semibold">
        Mostrando ate {perPage} por pagina de {totalItems} itens
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-bold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:border-[#ff4655]/70 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Anterior
        </button>

        {visiblePages.map((item, index) => {
          const previous = visiblePages[index - 1];
          const showGap = previous && item - previous > 1;

          return (
            <span key={item} className="flex items-center gap-2">
              {showGap && <span className="px-1 text-slate-500">...</span>}
              <button
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={item === page ? 'page' : undefined}
                className={`cursor-pointer rounded-xl border px-3 py-2 font-bold transition-colors duration-200 ${
                  item === page
                    ? 'border-[#ff4655] bg-[#ff4655] text-white'
                    : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-[#ff4655]/70 hover:text-white'
                }`}
              >
                {item}
              </button>
            </span>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-bold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:border-[#ff4655]/70 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Proxima
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
