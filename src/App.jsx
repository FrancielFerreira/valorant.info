import './App.css';

import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Aside from './Components/Aside';

function App() {
  return (
    <>
      <Header />
      <div className="flex">
        <Aside />
        <main className="pt-28 px-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
