import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListControls from './ListControls';

const sortOptions = [
  { value: 'az', label: 'A-Z' },
  { value: 'za', label: 'Z-A' },
];

describe('ListControls', () => {
  it('renderiza busca e ordenacao com valores controlados', () => {
    render(
      <ListControls
        search="raze"
        onSearchChange={() => {}}
        sort="az"
        onSortChange={() => {}}
        sortOptions={sortOptions}
        placeholder="Buscar agente"
      />,
    );

    expect(screen.getByPlaceholderText('Buscar agente')).toHaveValue('raze');
    expect(screen.getByRole('combobox')).toHaveValue('az');
    expect(screen.getByRole('option', { name: 'Z-A' })).toBeInTheDocument();
  });

  it('notifica mudancas quando usuario digita e troca ordenacao', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    const onSortChange = vi.fn();

    function ControlledListControls() {
      const [search, setSearch] = React.useState('');
      const [sort, setSort] = React.useState('az');

      function handleSearchChange(value) {
        onSearchChange(value);
        setSearch(value);
      }

      function handleSortChange(value) {
        onSortChange(value);
        setSort(value);
      }

      return (
        <ListControls
          search={search}
          onSearchChange={handleSearchChange}
          sort={sort}
          onSortChange={handleSortChange}
          sortOptions={sortOptions}
        />
      );
    }

    render(<ControlledListControls />);

    await user.type(screen.getByRole('searchbox'), 'sage');
    await user.selectOptions(screen.getByRole('combobox'), 'za');

    expect(onSearchChange).toHaveBeenLastCalledWith('sage');
    expect(onSortChange).toHaveBeenCalledWith('za');
  });
});
