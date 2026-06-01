import React from 'react';
import useFetch from '../Hooks/useFetch';
import { GET_WEAPONS } from '../api/api';
import Loading from '../Components/Helper/Loading';
import Error from '../Components/Helper/Error';
import Card from '../Components/Card';
import ListControls from '../Components/ListControls';
import Pagination from '../Components/Pagination';
import {
  ALPHA_SORT_OPTIONS,
  WEAPON_CATEGORY_OPTIONS,
  filterByText,
  filterByWeaponCategory,
  getWeaponCategoryLabel,
  paginateItems,
  sortItems,
} from '../utils/listFilters';

const Weapons = () => {
  const { data, loading, error, request } = useFetch();
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('az');
  const [category, setCategory] = React.useState('all');
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    async function fetchWeapons() {
      const { url, options } = GET_WEAPONS();
      await request(url, options);
    }
    fetchWeapons();
  }, [request]);

  React.useEffect(() => {
    setPage(1);
  }, [search, sort, category]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;

  const weapons = sortItems(
    filterByWeaponCategory(
      filterByText(data.data, search, ['displayName', 'category']),
      category,
    ),
    sort,
  );
  const paginatedWeapons = paginateItems(weapons, page);

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
        filters={[
          {
            name: 'category',
            label: 'Categoria',
            value: category,
            onChange: setCategory,
            options: WEAPON_CATEGORY_OPTIONS,
          },
        ]}
        placeholder="Buscar arma"
      />
      <p className="text-sm font-semibold text-slate-400">
        {weapons.length} arma(s) encontradas
      </p>
      <ul className="grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {paginatedWeapons.items.map((weapon) => (
          <Card
            key={weapon.uuid}
            data={weapon}
            image={weapon.displayIcon}
            eyebrow={getWeaponCategoryLabel(weapon.category)}
            title={weapon.displayName}
            description={weapon.shopData?.categoryText || 'Equipamento do arsenal Valorant.'}
            meta={weapon.shopData?.cost ? `${weapon.shopData.cost} creditos` : 'Sem custo'}
          />
        ))}
      </ul>
      <Pagination
        page={paginatedWeapons.page}
        totalPages={paginatedWeapons.totalPages}
        totalItems={paginatedWeapons.totalItems}
        perPage={paginatedWeapons.perPage}
        onPageChange={setPage}
      />
    </section>
  );
};

export default Weapons;
