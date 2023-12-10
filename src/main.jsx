import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Page404 from './Pages/Page404.jsx';
import Home from './Pages/Home.jsx';
import Contact from './Pages/Contact.jsx';
import About from './Pages/About.jsx';

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
  <React.StrictMode>
    <RouterProvider router={routers} />
  </React.StrictMode>,
);
