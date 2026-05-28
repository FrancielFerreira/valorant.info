import React from 'react';
import useFetch from '../Hooks/useFetch';
import { GET_MAPS } from '../api/api';
import Loading from '../Components/Helper/Loading';
import Error from '../Components/Helper/Error';
import Card from '../Components/Card';
import ListControls from '../Components/ListControls';
import { ALPHA_SORT_OPTIONS, filterByText, sortItems } from '../utils/listFilters';

const Maps = () => {
  const { data, loading, error, request } = useFetch();
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('az');

  React.useEffect(() => {
    async function fetchMaps() {
      const { url, options } = GET_MAPS();
      await request(url, options);
    }
    fetchMaps();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;

  const maps = sortItems(
    filterByText(data.data, search, [
      'displayName',
      'tacticalDescription',
      'narrativeDescription',
    ]),
    sort,
  );

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
          Campos de batalha
        </p>
        <h1 className="mt-2 font-display text-5xl uppercase text-white">Mapas</h1>
      </div>
      <ListControls
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        sortOptions={ALPHA_SORT_OPTIONS}
        placeholder="Buscar mapa"
      />
      <ul className="grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {maps.map((map) => (
          <Card
            key={map.uuid}
            data={map}
            image={map.splash || map.displayIcon}
            eyebrow={map.coordinates || 'Mapa'}
            title={map.displayName}
            description={map.tacticalDescription || map.narrativeDescription}
            meta={map.tacticalDescription || 'Arena Valorant'}
          />
        ))}
      </ul>
    </section>
  );
};

export default Maps;
