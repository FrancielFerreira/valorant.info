import './App.css';

import Home from './Pages/Home';
import Contact from './Pages/Contact';
import About from './Pages/About';

import Layout from './Components/Layout';

import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from 'react-router-dom';

const router = createBrowserRouter([{ path: '*', Component: Root }]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}
