
import Login from '../pages/Login';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Bookings from '../pages/Bookings';
import Settings from '../pages/Settings';
import MainContainer from '../layouts/MainContainer';
import Payments from '../pages/Payments';
import Cars from '../pages/Cars';
import Statistics from '../pages/Statistics';
import Customers from "../pages/Customers";
import CustomerContextProvider from '../contexts/customer-context';
import CarsContextProvider from '../contexts/car-context';
import BookingContextProvider from '../contexts/booking-context';
import PaymentContextProvider from '../contexts/payment-context';






const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: '/',
    element:
        <CustomerContextProvider>
          <CarsContextProvider>
            <BookingContextProvider>
              <PaymentContextProvider>
                <MainContainer />
              </PaymentContextProvider>
            </BookingContextProvider>
          </CarsContextProvider>
        </CustomerContextProvider>
    ,
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
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/cars",

        element: <Cars />,
      },
      {
        path: '/payments',
        element: <Payments />,
      },
      {
        path: '/statistics',
        element: <Statistics />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
