import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Agentes',
    description: 'Funcoes, biografias e habilidades dos personagens jogaveis.',
    to: '/agentes',
  },
  {
    title: 'Mapas',
    description: 'Arenas, localizacoes e visao geral dos campos de batalha.',
    to: '/mapas',
  },
  {
    title: 'Modos',
    description: 'Regras, duracao e objetivos dos modos de jogo.',
    to: '/modos',
  },
  {
    title: 'Armas',
    description: 'Categorias, custos e informacoes principais do arsenal.',
    to: '/armas',
  },
];

const Home = () => {
  return (
    <section className="space-y-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-2xl shadow-black/40 md:p-12">
        <div className="absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-16 rounded-full bg-[#ff4655]/30 blur-3xl" />
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[#ffb3ba]">
          Base de dados tatico
        </p>
        <h2 className="max-w-3xl font-display text-5xl uppercase leading-none text-white md:text-7xl">
          Wiki brasileira de Valorant
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Consulte informacoes essenciais de agentes, mapas, modos de jogo e
          armas usando dados publicos da Valorant API.
        </p>
        <Link
          to="/agentes"
          className="mt-8 inline-flex cursor-pointer rounded-full bg-[#ff4655] px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-[#ff6470]"
        >
          Explorar agentes
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {sections.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-black/25 p-6 transition-colors duration-200 hover:border-[#ff4655]/70 hover:bg-white/[0.06]"
          >
            <p className="mb-8 h-1 w-12 bg-[#ff4655] transition-all duration-200 group-hover:w-20" />
            <h3 className="font-display text-2xl text-white">{section.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
