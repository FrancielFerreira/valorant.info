import React from 'react';
import useFetch from '../Hooks/useFetch';
import { GET_SPRAYS } from '../api/api';
import Loading from '../Components/Helper/Loading';
import Error from '../Components/Helper/Error';
import Card from '../Components/Card';

function getSprayImage(spray) {
  return spray.fullTransparentIcon || spray.fullIcon || spray.displayIcon;
}

const filters = [
  { value: 'all', label: 'Todos' },
  { value: 'animated', label: 'Animados' },
  { value: 'static', label: 'Estaticos' },
];

const Sprays = () => {
  const { data, loading, error, request } = useFetch();
  const [filter, setFilter] = React.useState('all');

  React.useEffect(() => {
    async function fetchSprays() {
      const { url, options } = GET_SPRAYS();
      await request(url, options);
    }
    fetchSprays();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;

  const sprays = data.data
    .filter((spray) => !spray.isNullSpray && getSprayImage(spray))
    .filter((spray) => {
      const isAnimated = Boolean(spray.animationGif || spray.animationPng);
      if (filter === 'animated') return isAnimated;
      if (filter === 'static') return !isAnimated;
      return true;
    });

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
          Identidade visual
        </p>
        <h1 className="mt-2 font-display text-5xl uppercase text-white">Sprays</h1>
      </div>

      <div className="flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-black/25 p-3">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] transition-colors duration-200 ${
              filter === item.value
                ? 'border-[#ff4655] bg-[#ff4655] text-white'
                : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-[#ff4655]/70 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <ul className="grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {sprays.map((spray) => (
          <Card
            key={spray.uuid}
            data={spray}
            image={getSprayImage(spray)}
            eyebrow={spray.animationGif || spray.animationPng ? 'Animado' : 'Spray'}
            title={spray.displayName}
            description="Cosmetico de expressao dentro do jogo."
            meta={`${spray.levels?.length || 0} niveis`}
            to={`/sprays/${spray.uuid}`}
          />
        ))}
      </ul>
    </section>
  );
};

export default Sprays;
