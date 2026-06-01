import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

const cardData = {
  displayName: 'Raze',
};

describe('Card', () => {
  it('renderiza conteudo textual e imagem quando recebe dados completos', () => {
    render(
      <MemoryRouter>
        <Card
          data={cardData}
          image="https://example.com/raze.png"
          eyebrow="Duelista"
          title="Raze"
          description="Agente brasileira explosiva."
          meta="4 habilidades"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Duelista')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Raze' })).toBeInTheDocument();
    expect(screen.getByText('Agente brasileira explosiva.')).toBeInTheDocument();
    expect(screen.getByText('4 habilidades')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Agente brasileira explosiva.' })).toHaveAttribute(
      'src',
      'https://example.com/raze.png',
    );
  });

  it('vira link interno quando recebe a propriedade to', () => {
    render(
      <MemoryRouter>
        <Card
          data={cardData}
          title="Raze"
          description="Detalhes da agente"
          to="/agentes/raze-id"
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /Raze/i })).toHaveAttribute(
      'href',
      '/agentes/raze-id',
    );
  });

  it('mostra fallback visual quando nao ha imagem', () => {
    render(
      <MemoryRouter>
        <Card data={cardData} title="Sem imagem" />
      </MemoryRouter>,
    );

    expect(screen.getByText('VI')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
