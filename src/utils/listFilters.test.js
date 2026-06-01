import { describe, expect, it } from 'vitest';
import {
  NO_CONTENT_TIER_VALUE,
  createAgentRoleOptions,
  createContentTierOptions,
  filterByAgentRole,
  filterByContentTier,
  filterByWeaponCategory,
  filterByText,
  getWeaponCategoryLabel,
  getValidDateValue,
  normalizeText,
  paginateItems,
  sortItems,
} from './listFilters';

describe('listFilters', () => {
  it('normaliza texto removendo acentos e caixa alta', () => {
    expect(normalizeText('São PAULO')).toBe('sao paulo');
  });

  it('filtra por texto em campos configurados', () => {
    const items = [
      { displayName: 'Raze', role: 'Duelista' },
      { displayName: 'Sage', role: 'Sentinela' },
      { displayName: 'Sova', role: 'Iniciador' },
    ];

    expect(filterByText(items, 'sentinela', ['displayName', 'role'])).toEqual([
      items[1],
    ]);
  });

  it('retorna todos os itens quando a busca esta vazia', () => {
    const items = [{ displayName: 'Vandal' }, { displayName: 'Phantom' }];

    expect(filterByText(items, '   ')).toBe(items);
  });

  it('cria opcoes e filtra agentes por funcao', () => {
    const agents = [
      {
        displayName: 'Omen',
        role: { uuid: 'controller', displayName: 'Controlador' },
      },
      {
        displayName: 'Raze',
        role: { uuid: 'duelist', displayName: 'Duelista' },
      },
      {
        displayName: 'Viper',
        role: { uuid: 'controller', displayName: 'Controlador' },
      },
    ];

    expect(createAgentRoleOptions(agents)).toEqual([
      { value: 'all', label: 'Todas funcoes' },
      { value: 'controller', label: 'Controlador' },
      { value: 'duelist', label: 'Duelista' },
    ]);
    expect(filterByAgentRole(agents, 'controller')).toEqual([
      agents[0],
      agents[2],
    ]);
  });

  it('ordena itens por A-Z e Z-A sem alterar a lista original', () => {
    const items = [
      { displayName: 'Viper' },
      { displayName: 'Astra' },
      { displayName: 'Brimstone' },
    ];

    expect(sortItems(items, 'az').map((item) => item.displayName)).toEqual([
      'Astra',
      'Brimstone',
      'Viper',
    ]);
    expect(sortItems(items, 'za').map((item) => item.displayName)).toEqual([
      'Viper',
      'Brimstone',
      'Astra',
    ]);
    expect(items.map((item) => item.displayName)).toEqual([
      'Viper',
      'Astra',
      'Brimstone',
    ]);
  });

  it('ignora datas invalidas ao ordenar por recentes', () => {
    const items = [
      { displayName: 'Antigo', releaseDate: '2020-01-01T00:00:00.000Z' },
      { displayName: 'Sem data', releaseDate: '1970-01-01T00:00:00.000Z' },
      { displayName: 'Novo', releaseDate: '2023-01-01T00:00:00.000Z' },
    ];

    const sorted = sortItems(items, 'newest', (item) =>
      getValidDateValue(item.releaseDate),
    );

    expect(sorted.map((item) => item.displayName)).toEqual([
      'Novo',
      'Antigo',
      'Sem data',
    ]);
  });

  it('filtra armas por categoria da API', () => {
    const items = [
      { displayName: 'Classic', category: 'EEquippableCategory::Sidearm' },
      { displayName: 'Vandal', category: 'EEquippableCategory::Rifle' },
      { displayName: 'Operator', category: 'EEquippableCategory::Sniper' },
    ];

    expect(filterByWeaponCategory(items, 'Rifle')).toEqual([items[1]]);
    expect(getWeaponCategoryLabel(items[2].category)).toBe('Fuzis de precisao');
  });

  it('pagina itens usando limite seguro para grid', () => {
    const items = Array.from({ length: 60 }, (_, index) => ({ id: index + 1 }));

    expect(paginateItems(items, 1).items).toHaveLength(48);
    expect(paginateItems(items, 2).items).toHaveLength(12);
    expect(paginateItems(items, 99).page).toBe(2);
  });

  it('cria opcoes e filtra skins por edicao', () => {
    const tiers = [
      { uuid: 'premium', displayName: 'Edicao Premium', rank: 2 },
      { uuid: 'select', displayName: 'Edicao Selecionada', rank: 0 },
    ];
    const skins = [
      { displayName: 'Skin Premium', contentTierUuid: 'premium' },
      { displayName: 'Skin Padrao', contentTierUuid: null },
    ];

    expect(createContentTierOptions(tiers).map((option) => option.value)).toEqual([
      'all',
      'select',
      'premium',
      NO_CONTENT_TIER_VALUE,
    ]);
    expect(filterByContentTier(skins, 'premium')).toEqual([skins[0]]);
    expect(filterByContentTier(skins, NO_CONTENT_TIER_VALUE)).toEqual([skins[1]]);
  });
});
