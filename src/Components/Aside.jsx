import { NavLink } from 'react-router-dom';

const Aside = () => {
  return (
    <aside className="pt-28 ps-8 pe-12 w-max">
      <nav className="flex flex-col">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="agentes">Agentes</NavLink>
      </nav>
    </aside>
  );
};

export default Aside;
