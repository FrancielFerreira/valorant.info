import { describe, expect, it } from 'vitest';
import {
  filterByText,
  getValidDateValue,
  normalizeText,
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
});
