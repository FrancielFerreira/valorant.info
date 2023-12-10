import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Page404 from './Pages/Page404.jsx';
import Home from './Pages/Home.jsx';
import Contact from './Pages/Contact.jsx';
import About from './Pages/About.jsx';
import Agents from './Pages/Agents.jsx';

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
