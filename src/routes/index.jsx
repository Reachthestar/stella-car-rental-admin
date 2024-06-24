import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Bookings from '../pages/Bookings';
import Settings from '../pages/Settings';
import MainContainer from '../layouts/MainContainer';
import Payments from '../pages/Payments';
import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainContainer />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/bookings',
        element: <Bookings />,
      },
      {
        path: '/payments',
        element: <Payments />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },

  { path: '/login', element: <Login />}
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
