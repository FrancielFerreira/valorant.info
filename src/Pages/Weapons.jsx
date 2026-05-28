import React from 'react';
import useFetch from '../Hooks/useFetch';
import { GET_WEAPONS } from '../api/api';
import Loading from '../Components/Helper/Loading';
import Error from '../Components/Helper/Error';
import Card from '../Components/Card';
import ListControls from '../Components/ListControls';
import { ALPHA_SORT_OPTIONS, filterByText, sortItems } from '../utils/listFilters';

function formatCategory(category) {
  return category?.replace('EEquippableCategory::', '') || 'Arma';
}

const Weapons = () => {
  const { data, loading, error, request } = useFetch();
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('az');

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

  const weapons = sortItems(
    filterByText(data.data, search, ['displayName', 'category']),
    sort,
  );

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
          Arsenal
        </p>
        <h1 className="mt-2 font-display text-5xl uppercase text-white">Armas</h1>
      </div>
      <ListControls
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        sortOptions={ALPHA_SORT_OPTIONS}
        placeholder="Buscar arma"
      />
      <ul className="grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {weapons.map((weapon) => (
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
