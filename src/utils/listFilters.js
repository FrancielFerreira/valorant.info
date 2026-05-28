export const ALPHA_SORT_OPTIONS = [
  { value: 'az', label: 'A-Z' },
  { value: 'za', label: 'Z-A' },
];

export const DATE_SORT_OPTIONS = [
  ...ALPHA_SORT_OPTIONS,
  { value: 'newest', label: 'Mais recentes' },
  { value: 'oldest', label: 'Mais antigos' },
];

export function normalizeText(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function filterByText(items, search, fields = ['displayName']) {
  const query = normalizeText(search).trim();
  if (!query) return items;

  return items.filter((item) =>
    fields.some((field) => normalizeText(item[field]).includes(query)),
  );
}

export function getValidDateValue(date) {
  if (!date || String(date).startsWith('1970-01-01')) return null;

  const value = new Date(date).getTime();
  return Number.isNaN(value) ? null : value;
}

export function sortItems(items, sort, getDate) {
  return [...items].sort((a, b) => {
    if (sort === 'za') {
      return b.displayName.localeCompare(a.displayName, 'pt-BR');
    }

    if (sort === 'newest' || sort === 'oldest') {
      const dateA = getDate?.(a) || null;
      const dateB = getDate?.(b) || null;

      if (dateA === null && dateB === null) {
        return a.displayName.localeCompare(b.displayName, 'pt-BR');
      }

      if (dateA === null) return 1;
      if (dateB === null) return -1;

      return sort === 'newest' ? dateB - dateA : dateA - dateB;
    }

    return a.displayName.localeCompare(b.displayName, 'pt-BR');
  });
}
