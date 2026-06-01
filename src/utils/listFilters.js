export const ALPHA_SORT_OPTIONS = [
  { value: 'az', label: 'A-Z' },
  { value: 'za', label: 'Z-A' },
];

export const DATE_SORT_OPTIONS = [
  ...ALPHA_SORT_OPTIONS,
  { value: 'newest', label: 'Mais recentes' },
  { value: 'oldest', label: 'Mais antigos' },
];

export const ITEMS_PER_PAGE = 48;

export const WEAPON_CATEGORY_OPTIONS = [
  { value: 'all', label: 'Todas categorias' },
  { value: 'Sidearm', label: 'Pistolas' },
  { value: 'SMG', label: 'Submetralhadoras' },
  { value: 'Shotgun', label: 'Escopetas' },
  { value: 'Rifle', label: 'Fuzis' },
  { value: 'Sniper', label: 'Fuzis de precisao' },
  { value: 'Heavy', label: 'Metralhadoras' },
  { value: 'Melee', label: 'Corpo a corpo' },
];

export const NO_CONTENT_TIER_VALUE = 'no-tier';

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

export function createAgentRoleOptions(agents) {
  const roleMap = new Map();

  agents.forEach((agent) => {
    if (agent.role?.uuid && agent.role?.displayName) {
      roleMap.set(agent.role.uuid, agent.role.displayName);
    }
  });

  return [
    { value: 'all', label: 'Todas funcoes' },
    ...[...roleMap.entries()]
      .sort((a, b) => a[1].localeCompare(b[1], 'pt-BR'))
      .map(([value, label]) => ({ value, label })),
  ];
}

export function filterByAgentRole(items, role) {
  if (!role || role === 'all') return items;

  return items.filter((item) => item.role?.uuid === role);
}

export function getWeaponCategoryValue(category) {
  return category?.replace('EEquippableCategory::', '') || 'Unknown';
}

export function getWeaponCategoryLabel(category) {
  const value = getWeaponCategoryValue(category);
  return (
    WEAPON_CATEGORY_OPTIONS.find((option) => option.value === value)?.label ||
    'Arma'
  );
}

export function filterByWeaponCategory(items, category) {
  if (!category || category === 'all') return items;

  return items.filter(
    (item) => getWeaponCategoryValue(item.category) === category,
  );
}

export function createContentTierOptions(tiers) {
  return [
    { value: 'all', label: 'Todas edicoes' },
    ...[...tiers]
      .sort((a, b) => a.rank - b.rank)
      .map((tier) => ({ value: tier.uuid, label: tier.displayName })),
    { value: NO_CONTENT_TIER_VALUE, label: 'Sem edicao' },
  ];
}

export function filterByContentTier(items, tier) {
  if (!tier || tier === 'all') return items;

  if (tier === NO_CONTENT_TIER_VALUE) {
    return items.filter((item) => !item.contentTierUuid);
  }

  return items.filter((item) => item.contentTierUuid === tier);
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

export function paginateItems(items, page, perPage = ITEMS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    page: safePage,
    totalPages,
    totalItems: items.length,
    perPage,
  };
}
