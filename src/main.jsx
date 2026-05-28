import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Page404 from './Pages/Page404.jsx';
import Home from './Pages/Home.jsx';
import Contact from './Pages/Contact.jsx';
import About from './Pages/About.jsx';
import Agents from './Pages/Agents.jsx';
import AgentDetails from './Pages/AgentDetails.jsx';
import Maps from './Pages/Maps.jsx';
import GameModes from './Pages/GameModes.jsx';
import Weapons from './Pages/Weapons.jsx';
import Skins from './Pages/Skins.jsx';
import SkinDetails from './Pages/SkinDetails.jsx';
import Sprays from './Pages/Sprays.jsx';
import SprayDetails from './Pages/SprayDetails.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />, // página de erro 404
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/agentes',
        element: <Agents />,
      },
      {
        path: '/agentes/:agentId',
        element: <AgentDetails />,
      },
      {
        path: '/mapas',
        element: <Maps />,
      },
      {
        path: '/modos',
        element: <GameModes />,
      },
      {
        path: '/armas',
        element: <Weapons />,
      },
      {
        path: '/skins',
        element: <Skins />,
      },
      {
        path: '/skins/:skinId',
        element: <SkinDetails />,
      },
      {
        path: '/sprays',
        element: <Sprays />,
      },
      {
        path: '/sprays/:sprayId',
        element: <SprayDetails />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routers} />,
);
