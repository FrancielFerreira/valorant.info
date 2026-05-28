import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import { GET_SPRAY } from '../api/api';
import Loading from '../Components/Helper/Loading';
import Error from '../Components/Helper/Error';
import Skeleton from '../Components/Helper/Skeleton';

function getSprayImage(spray) {
  return spray.animationGif || spray.animationPng || spray.fullTransparentIcon || spray.fullIcon || spray.displayIcon;
}

const SprayDetails = () => {
  const { sprayId } = useParams();
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchSpray() {
      const { url, options } = GET_SPRAY(sprayId);
      await request(url, options);
    }
    fetchSpray();
  }, [sprayId, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;

  const spray = data.data;
  const isAnimated = Boolean(spray.animationGif || spray.animationPng);

  return (
    <section className="space-y-8">
      <Link
        to="/sprays"
        className="inline-flex cursor-pointer rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-300 transition-colors duration-200 hover:border-[#ff4655]/70 hover:text-white"
      >
        Voltar para sprays
      </Link>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-2xl shadow-black/40 md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
            {isAnimated ? 'Spray animado' : 'Spray estatico'}
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-none text-white md:text-7xl">
            {spray.displayName}
          </h1>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffb3ba]">Tipo</p>
              <p className="mt-3 font-display text-xl text-white">{isAnimated ? 'Animado' : 'Estatico'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffb3ba]">Niveis</p>
              <p className="mt-3 font-display text-xl text-white">{spray.levels?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#101728] to-[#26080f] p-8 shadow-2xl shadow-black/40">
          {getSprayImage(spray) ? (
            <Skeleton src={getSprayImage(spray)} alt={spray.displayName} />
          ) : (
            <div className="flex aspect-square items-center justify-center font-display text-5xl text-white/20">VI</div>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">Progressao</p>
        <h2 className="mt-2 font-display text-4xl uppercase text-white">Niveis</h2>
      </div>

      <ul className="grid list-none gap-4 md:grid-cols-2">
        {spray.levels?.map((level) => (
          <li key={level.uuid} className="rounded-2xl border border-white/10 bg-black/25 p-5">
            <h3 className="font-display text-xl text-white">{level.displayName}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-400">
              {level.sprayLevel || 'Nivel de spray'}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SprayDetails;
