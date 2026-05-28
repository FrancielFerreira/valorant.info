import React from 'react';
import useFetch from '../Hooks/useFetch';
import { GET_CONTENT_TIERS, GET_WEAPONS } from '../api/api';
import Loading from '../Components/Helper/Loading';
import Error from '../Components/Helper/Error';
import Card from '../Components/Card';

function createTierMap(tiers) {
  return new Map(tiers.map((tier) => [tier.uuid, tier]));
}

function getSkinImage(skin) {
  return skin.displayIcon || skin.chromas?.find((chroma) => chroma.displayIcon)?.displayIcon;
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
  const [selectedWeapon, setSelectedWeapon] = React.useState('Vandal');

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

  if (weaponsError) return <Error error={weaponsError} />;
  if (tiersError) return <Error error={tiersError} />;
  if (weaponsLoading || tiersLoading) return <Loading />;
  if (!weaponsData || !tiersData) return null;

  const weapons = weaponsData.data;
  const tierMap = createTierMap(tiersData.data);
  const activeWeapon =
    weapons.find((weapon) => weapon.displayName === selectedWeapon) || weapons[0];
  const skins = activeWeapon.skins.filter((skin) => getSkinImage(skin));

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
          Colecoes cosmeticas
        </p>
        <h1 className="mt-2 font-display text-5xl uppercase text-white">Skins</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Explore as skins por arma. O filtro evita carregar centenas de imagens de uma vez.
        </p>
      </div>

      <div className="flex gap-3 overflow-x-auto rounded-2xl border border-white/10 bg-black/25 p-3">
        {weapons.map((weapon) => (
          <button
            key={weapon.uuid}
            type="button"
            onClick={() => setSelectedWeapon(weapon.displayName)}
            className={`shrink-0 cursor-pointer rounded-xl border px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] transition-colors duration-200 ${
              activeWeapon.uuid === weapon.uuid
                ? 'border-[#ff4655] bg-[#ff4655] text-white'
                : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-[#ff4655]/70 hover:text-white'
            }`}
          >
            {weapon.displayName}
          </button>
        ))}
      </div>

      <ul className="grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {skins.map((skin) => {
          const tier = tierMap.get(skin.contentTierUuid);

          return (
            <Card
              key={skin.uuid}
              data={skin}
              image={getSkinImage(skin)}
              eyebrow={activeWeapon.displayName}
              title={skin.displayName}
              description={tier?.displayName || 'Skin de arma'}
              meta={`${skin.chromas?.length || 0} chromas | ${skin.levels?.length || 0} niveis`}
              to={`/skins/${skin.uuid}`}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Skins;
