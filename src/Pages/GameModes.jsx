import React from 'react';
import useFetch from '../Hooks/useFetch';
import { GET_GAME_MODES } from '../api/api';
import Loading from '../Components/Helper/Loading';
import Error from '../Components/Helper/Error';
import Card from '../Components/Card';
import ListControls from '../Components/ListControls';
import { ALPHA_SORT_OPTIONS, filterByText, sortItems } from '../utils/listFilters';

const GameModes = () => {
  const { data, loading, error, request } = useFetch();
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('az');

  React.useEffect(() => {
    async function fetchGameModes() {
      const { url, options } = GET_GAME_MODES();
      await request(url, options);
    }
    fetchGameModes();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;

  const modes = sortItems(
    filterByText(data.data, search, ['displayName', 'description', 'duration']),
    sort,
  );

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
          Regras e objetivos
        </p>
        <h1 className="mt-2 font-display text-5xl uppercase text-white">Modos</h1>
      </div>
      <ListControls
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        sortOptions={ALPHA_SORT_OPTIONS}
        placeholder="Buscar modo"
      />
      <ul className="grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {modes.map((mode) => (
          <Card
            key={mode.uuid}
            data={mode}
            image={mode.displayIcon || mode.listViewIconTall}
            eyebrow={mode.duration || 'Modo de jogo'}
            title={mode.displayName}
            description={mode.description}
            meta={mode.isTeamVoiceAllowed ? 'Voz em equipe' : 'Sem voz em equipe'}
          />
        ))}
      </ul>
    </section>
  );
};

export default GameModes;
