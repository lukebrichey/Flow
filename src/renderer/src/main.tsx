import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Focus from './pages/Focus';
import Pomodoro from './pages/Pomodoro';
import './assets/index.css';
import { initializeDailyFocus } from './lib/initialize';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/focus',
        element: <Focus />
      },
      {
        path: '/pomo',
        element: <Pomodoro />
      }
    ]
  }
]);

initializeDailyFocus();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
