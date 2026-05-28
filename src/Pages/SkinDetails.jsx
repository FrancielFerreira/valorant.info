import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import { GET_CONTENT_TIERS, GET_WEAPON_SKIN, GET_WEAPONS } from '../api/api';
import Loading from '../Components/Helper/Loading';
import Error from '../Components/Helper/Error';
import Skeleton from '../Components/Helper/Skeleton';

function getSkinImage(skin) {
  return skin.displayIcon || skin.chromas?.find((chroma) => chroma.displayIcon)?.displayIcon;
}

const SkinDetails = () => {
  const { skinId } = useParams();
  const skinFetch = useFetch();
  const weaponsFetch = useFetch();
  const tiersFetch = useFetch();
  const {
    data: skinData,
    loading: skinLoading,
    error: skinError,
    request: requestSkin,
  } = skinFetch;
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

  React.useEffect(() => {
    async function fetchSkinData() {
      const skin = GET_WEAPON_SKIN(skinId);
      const weapons = GET_WEAPONS();
      const tiers = GET_CONTENT_TIERS();
      await Promise.all([
        requestSkin(skin.url, skin.options),
        requestWeapons(weapons.url, weapons.options),
        requestTiers(tiers.url, tiers.options),
      ]);
    }
    fetchSkinData();
  }, [skinId, requestSkin, requestWeapons, requestTiers]);

  if (skinError) return <Error error={skinError} />;
  if (weaponsError) return <Error error={weaponsError} />;
  if (tiersError) return <Error error={tiersError} />;
  if (skinLoading || weaponsLoading || tiersLoading) return <Loading />;
  if (!skinData || !weaponsData || !tiersData) return null;

  const skin = skinData.data;
  const weapon = weaponsData.data.find((item) =>
    item.skins?.some((weaponSkin) => weaponSkin.uuid === skin.uuid),
  );
  const tier = tiersData.data.find((item) => item.uuid === skin.contentTierUuid);
  const chromas = skin.chromas?.filter((chroma) => chroma.displayIcon || chroma.fullRender) || [];
  const levels = skin.levels?.filter((level) => level.displayName) || [];

  return (
    <section className="space-y-8">
      <Link
        to="/skins"
        className="inline-flex cursor-pointer rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-300 transition-colors duration-200 hover:border-[#ff4655]/70 hover:text-white"
      >
        Voltar para skins
      </Link>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-2xl shadow-black/40 md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
            {weapon?.displayName || 'Skin de arma'}
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-none text-white md:text-7xl">
            {skin.displayName}
          </h1>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffb3ba]">Edicao</p>
              <p className="mt-3 font-display text-xl text-white">{tier?.displayName || 'Nao informado'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffb3ba]">Chromas</p>
              <p className="mt-3 font-display text-xl text-white">{chromas.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffb3ba]">Niveis</p>
              <p className="mt-3 font-display text-xl text-white">{levels.length}</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#101728] to-[#26080f] p-6 shadow-2xl shadow-black/40">
          {getSkinImage(skin) ? (
            <Skeleton src={getSkinImage(skin)} alt={skin.displayName} />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center font-display text-5xl text-white/20">VI</div>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">Variacoes</p>
        <h2 className="mt-2 font-display text-4xl uppercase text-white">Chromas</h2>
      </div>

      <ul className="grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {chromas.map((chroma) => (
          <li key={chroma.uuid} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
            {(chroma.fullRender || chroma.displayIcon) && (
              <Skeleton src={chroma.fullRender || chroma.displayIcon} alt={chroma.displayName} />
            )}
            <h3 className="mt-4 font-display text-xl text-white">{chroma.displayName}</h3>
          </li>
        ))}
      </ul>

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">Progressao</p>
        <h2 className="mt-2 font-display text-4xl uppercase text-white">Niveis</h2>
      </div>

      <ul className="grid list-none gap-4 md:grid-cols-2">
        {levels.map((level) => (
          <li key={level.uuid} className="rounded-2xl border border-white/10 bg-black/25 p-5">
            <h3 className="font-display text-xl text-white">{level.displayName}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-400">
              {level.levelItem || 'Nivel cosmetico'}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SkinDetails;
