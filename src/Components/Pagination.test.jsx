import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('nao renderiza quando existe apenas uma pagina', () => {
    const { container } = render(
      <Pagination
        page={1}
        totalPages={1}
        totalItems={10}
        perPage={48}
        onPageChange={() => {}}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('permite navegar entre paginas', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        page={2}
        totalPages={4}
        totalItems={160}
        perPage={48}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Anterior' }));
    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: 'Proxima' }));

    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
