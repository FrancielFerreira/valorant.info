import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/agentes', label: 'Agentes' },
  { to: '/mapas', label: 'Mapas' },
  { to: '/modos', label: 'Modos' },
  { to: '/armas', label: 'Armas' },
];

const Aside = () => {
  return (
    <aside className="mb-8 w-full md:fixed md:top-28 md:w-56">
      <nav className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/30 backdrop-blur md:flex md:flex-col">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `cursor-pointer rounded-xl border px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] transition-colors duration-200 ${
                isActive
                  ? 'border-[#ff4655] bg-[#ff4655] text-white shadow-lg shadow-[#ff4655]/20'
                  : 'border-white/10 bg-black/20 text-slate-300 hover:border-[#ff4655]/70 hover:text-white'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Aside;
