import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Aside from './Components/Aside';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#070914] text-slate-100">
      <Header />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,70,85,0.28),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(45,212,191,0.16),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:auto,auto,36px_36px]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-10 pt-24 md:flex-row md:gap-8 md:px-6 lg:px-8">
        <Aside />
        <main className="flex w-full min-w-0 flex-col md:pl-64">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
