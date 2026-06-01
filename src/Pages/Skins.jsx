import React from 'react';
import useFetch from '../Hooks/useFetch';
import { GET_CONTENT_TIERS, GET_WEAPONS } from '../api/api';
import Loading from '../Components/Helper/Loading';
import Error from '../Components/Helper/Error';
import Card from '../Components/Card';
import ListControls from '../Components/ListControls';
import Pagination from '../Components/Pagination';
import {
  ALPHA_SORT_OPTIONS,
  WEAPON_CATEGORY_OPTIONS,
  createContentTierOptions,
  filterByContentTier,
  filterByText,
  filterByWeaponCategory,
  getWeaponCategoryLabel,
  paginateItems,
  sortItems,
} from '../utils/listFilters';

function createTierMap(tiers) {
  return new Map(tiers.map((tier) => [tier.uuid, tier]));
}

function getSkinImage(skin) {
  return skin.displayIcon || skin.chromas?.find((chroma) => chroma.displayIcon)?.displayIcon;
}

function createWeaponOptions(weapons) {
  return [
    { value: 'all', label: 'Todas armas' },
    ...weapons.map((weapon) => ({ value: weapon.uuid, label: weapon.displayName })),
  ];
}

const Skins = () => {
  const weaponsFetch = useFetch();
  const tiersFetch = useFetch();
  const {
    data: weaponsData,
    loading: weaponsLoading,
    error: weaponsError,
    request: requestWeapons,
  } = weaponsFetch;
  const {
    data: tiersData,
    loading: tiersLoading,
    error: tiersError,
    request: requestTiers,
  } = tiersFetch;
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedWeapon, setSelectedWeapon] = React.useState('all');
  const [selectedTier, setSelectedTier] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('az');
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    async function fetchSkinsData() {
      const weapons = GET_WEAPONS();
      const tiers = GET_CONTENT_TIERS();
      await Promise.all([
        requestWeapons(weapons.url, weapons.options),
        requestTiers(tiers.url, tiers.options),
      ]);
    }
    fetchSkinsData();
  }, [requestWeapons, requestTiers]);

  React.useEffect(() => {
    setPage(1);
  }, [search, sort, selectedCategory, selectedWeapon, selectedTier]);

  function handleCategoryChange(value) {
    setSelectedCategory(value);
    setSelectedWeapon('all');
  }

  if (weaponsError) return <Error error={weaponsError} />;
  if (tiersError) return <Error error={tiersError} />;
  if (weaponsLoading || tiersLoading) return <Loading />;
  if (!weaponsData || !tiersData) return null;

  const weapons = weaponsData.data;
  const tierMap = createTierMap(tiersData.data);
  const tierOptions = createContentTierOptions(tiersData.data);
  const categoryWeapons = filterByWeaponCategory(weapons, selectedCategory);
  const weaponOptions = createWeaponOptions(categoryWeapons);
  const activeSelectedWeapon = weaponOptions.some(
    (option) => option.value === selectedWeapon,
  )
    ? selectedWeapon
    : 'all';
  const visibleWeapons =
    activeSelectedWeapon === 'all'
      ? categoryWeapons
      : categoryWeapons.filter((weapon) => weapon.uuid === activeSelectedWeapon);
  const skins = sortItems(
    filterByContentTier(
      filterByText(
        visibleWeapons.flatMap((weapon) =>
          weapon.skins
            .filter((skin) => getSkinImage(skin))
            .map((skin) => ({ ...skin, weaponName: weapon.displayName })),
        ),
        search,
        ['displayName'],
      ),
      selectedTier,
    ),
    sort,
  );
  const paginatedSkins = paginateItems(skins, page);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
          Colecoes cosmeticas
        </p>
        <h1 className="mt-2 font-display text-5xl uppercase text-white">Skins</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Explore skins por categoria e arma, com paginacao para evitar uma lista infinita de cards.
        </p>
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
            value: selectedCategory,
            onChange: handleCategoryChange,
            options: WEAPON_CATEGORY_OPTIONS,
          },
          {
            name: 'weapon',
            label: 'Arma',
            value: activeSelectedWeapon,
            onChange: setSelectedWeapon,
            options: weaponOptions,
          },
          {
            name: 'tier',
            label: 'Edicao',
            value: selectedTier,
            onChange: setSelectedTier,
            options: tierOptions,
          },
        ]}
        placeholder="Buscar skin"
      />
      <p className="text-sm font-semibold text-slate-400">
        {skins.length} skin(s) encontradas
      </p>

      <ul className="grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {paginatedSkins.items.map((skin) => {
          const tier = tierMap.get(skin.contentTierUuid);

          return (
            <Card
              key={skin.uuid}
              data={skin}
              image={getSkinImage(skin)}
              eyebrow={skin.weaponName || getWeaponCategoryLabel(selectedCategory)}
              title={skin.displayName}
              description={tier?.displayName || 'Skin de arma'}
              meta={`${skin.chromas?.length || 0} chromas | ${skin.levels?.length || 0} niveis`}
              to={`/skins/${skin.uuid}`}
            />
          );
        })}
      </ul>
      <Pagination
        page={paginatedSkins.page}
        totalPages={paginatedSkins.totalPages}
        totalItems={paginatedSkins.totalItems}
        perPage={paginatedSkins.perPage}
        onPageChange={setPage}
      />
    </section>
  );
};

export default Skins;
