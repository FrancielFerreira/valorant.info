import React from 'react';
import useFetch from '../Hooks/useFetch';
import { GET_MAPS } from '../api/api';
import Loading from '../Components/Helper/Loading';
import Error from '../Components/Helper/Error';
import Card from '../Components/Card';

const Maps = () => {
  const { data, loading, error, request } = useFetch();

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

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
          Campos de batalha
        </p>
        <h1 className="mt-2 font-display text-5xl uppercase text-white">Mapas</h1>
      </div>
      <ul className="grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {data.data.map((map) => (
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
