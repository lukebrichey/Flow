import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Root from './pages/Root';
import Focus from './pages/Focus';
import Pomodoro from './pages/Pomodoro';
import './assets/index.css';
import { initializeDailyFocus } from './lib/initialize';
import { ArrowPathIcon } from '@heroicons/react/20/solid';

const router = createHashRouter([
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

export default function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  // This function calculates the streaks and initializes the daily focus data
  // for the current day. This function is called on every app launch.
  // We have the useEffect to ensure data is ready before rendering the app.
  useEffect(() => {
    initializeDailyFocus().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <ArrowPathIcon className="h-11 w-11 text-red-500 animate-spin" />;
  }

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
