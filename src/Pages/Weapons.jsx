import React from 'react';
import useFetch from '../Hooks/useFetch';
import { GET_WEAPONS } from '../api/api';
import Loading from '../Components/Helper/Loading';
import Error from '../Components/Helper/Error';
import Card from '../Components/Card';

function formatCategory(category) {
  return category?.replace('EEquippableCategory::', '') || 'Arma';
}

const Weapons = () => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchWeapons() {
      const { url, options } = GET_WEAPONS();
      await request(url, options);
    }
    fetchWeapons();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
          Arsenal
        </p>
        <h1 className="mt-2 font-display text-5xl uppercase text-white">Armas</h1>
      </div>
      <ul className="grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {data.data.map((weapon) => (
          <Card
            key={weapon.uuid}
            data={weapon}
            image={weapon.displayIcon}
            eyebrow={formatCategory(weapon.category)}
            title={weapon.displayName}
            description={weapon.shopData?.categoryText || 'Equipamento do arsenal Valorant.'}
            meta={weapon.shopData?.cost ? `${weapon.shopData.cost} creditos` : 'Sem custo'}
          />
        ))}
      </ul>
    </section>
  );
};

export default Weapons;
