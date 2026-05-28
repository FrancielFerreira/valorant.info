import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { GET_AGENT } from '../api/api';
import useFetch from '../Hooks/useFetch';
import Error from '../Components/Helper/Error';
import Loading from '../Components/Helper/Loading';
import Skeleton from '../Components/Helper/Skeleton';

const AGENT_ORIGINS = {
  Astra: { country: 'Gana', flag: '🇬🇭' },
  Breach: { country: 'Suecia', flag: '🇸🇪' },
  Brimstone: { country: 'Estados Unidos', flag: '🇺🇸' },
  Chamber: { country: 'Franca', flag: '🇫🇷' },
  Clove: { country: 'Escocia', flag: '🏴' },
  Cypher: { country: 'Marrocos', flag: '🇲🇦' },
  Deadlock: { country: 'Noruega', flag: '🇳🇴' },
  Fade: { country: 'Turquia', flag: '🇹🇷' },
  Gekko: { country: 'Estados Unidos', flag: '🇺🇸' },
  Harbor: { country: 'India', flag: '🇮🇳' },
  Iso: { country: 'China', flag: '🇨🇳' },
  Jett: { country: 'Coreia do Sul', flag: '🇰🇷' },
  Killjoy: { country: 'Alemanha', flag: '🇩🇪' },
  Miks: { country: 'Croacia', flag: '🇭🇷' },
  Neon: { country: 'Filipinas', flag: '🇵🇭' },
  Phoenix: { country: 'Reino Unido', flag: '🇬🇧' },
  Raze: { country: 'Brasil', flag: '🇧🇷' },
  Reyna: { country: 'Mexico', flag: '🇲🇽' },
  Sage: { country: 'China', flag: '🇨🇳' },
  Skye: { country: 'Australia', flag: '🇦🇺' },
  Sova: { country: 'Russia', flag: '🇷🇺' },
  Tejo: { country: 'Colombia', flag: '🇨🇴' },
  Veto: { country: 'Senegal', flag: '🇸🇳' },
  Viper: { country: 'Estados Unidos', flag: '🇺🇸' },
  Waylay: { country: 'Tailandia', flag: '🇹🇭' },
  Yoru: { country: 'Japao', flag: '🇯🇵' },
};

function formatReleaseDate(releaseDate) {
  if (!releaseDate || releaseDate.startsWith('1970-01-01')) {
    return 'Nao informado pela API';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(releaseDate));
}

const AgentDetails = () => {
  const { agentId } = useParams();
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchAgent() {
      const { url, options } = GET_AGENT(agentId);
      await request(url, options);
    }
    fetchAgent();
  }, [agentId, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;

  const agent = data.data;
  const abilities = agent.abilities?.filter((ability) => ability.displayName) || [];
  const origin = AGENT_ORIGINS[agent.displayName];
  const releaseDate = formatReleaseDate(agent.releaseDate);

  return (
    <section className="space-y-8">
      <Link
        to="/agentes"
        className="inline-flex cursor-pointer rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-300 transition-colors duration-200 hover:border-[#ff4655]/70 hover:text-white"
      >
        Voltar para agentes
      </Link>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-2xl shadow-black/40 md:p-10">
          {agent.background && (
            <img
              src={agent.background}
              alt=""
              className="pointer-events-none absolute right-0 top-0 h-full w-full object-cover opacity-10"
            />
          )}
          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
              {agent.role?.displayName || 'Agente'}
            </p>
            <h1 className="mt-3 font-display text-6xl uppercase leading-none text-white md:text-8xl">
              {agent.displayName}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {agent.description}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#101728] to-[#26080f] p-4 shadow-2xl shadow-black/40">
          {agent.fullPortrait ? (
            <Skeleton src={agent.fullPortrait} alt={agent.displayName} />
          ) : (
            <div className="flex aspect-[3/4] items-center justify-center font-display text-5xl text-white/20">
              VI
            </div>
          )}
        </div>
      </div>

      {agent.role && (
        <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffb3ba]">
            Funcao
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
            {agent.role.displayIcon && (
              <img
                src={agent.role.displayIcon}
                alt={agent.role.displayName}
                className="h-14 w-14 rounded-xl border border-white/10 bg-white/10 p-3"
              />
            )}
            <div>
              <h2 className="font-display text-3xl text-white">
                {agent.role.displayName}
              </h2>
              <p className="mt-2 leading-7 text-slate-300">
                {agent.role.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffb3ba]">
            Nacionalidade
          </p>
          <div className="mt-4 flex items-center gap-4">
            {origin?.flag && (
              <span className="text-4xl" aria-hidden="true">
                {origin.flag}
              </span>
            )}
            <p className="font-display text-2xl text-white">
              {origin?.country || 'Nao informado pela API'}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffb3ba]">
            Lancamento
          </p>
          <p className="mt-4 font-display text-2xl text-white">{releaseDate}</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
          Kit de habilidades
        </p>
        <h2 className="mt-2 font-display text-4xl uppercase text-white">
          Habilidades
        </h2>
      </div>

      <ul className="grid list-none gap-5 md:grid-cols-2">
        {abilities.map((ability) => (
          <li
            key={ability.slot}
            className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30"
          >
            <div className="flex items-start gap-4">
              {ability.displayIcon && (
                <img
                  src={ability.displayIcon}
                  alt={ability.displayName}
                  className="h-14 w-14 rounded-xl border border-white/10 bg-black/30 p-3"
                />
              )}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffb3ba]">
                  {ability.slot}
                </p>
                <h3 className="mt-1 font-display text-2xl text-white">
                  {ability.displayName}
                </h3>
              </div>
            </div>
            <p className="mt-4 leading-7 text-slate-300">
              {ability.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AgentDetails;
