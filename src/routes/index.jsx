import React, { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectAdminRoute from '../authentication/ProtectAdminRoute';
import MainContainer from '../layouts/MainContainer';
import CustomerContextProvider from '../contexts/customer-context';
import CarsContextProvider from '../contexts/car-context';
import BookingContextProvider from '../contexts/booking-context';
import PaymentContextProvider from '../contexts/payment-context';
import FilterContextProvider from '../contexts/filter-context';
import DashboardContextProvider from '../contexts/dashboard-context';

// Lazy loading components
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Bookings = lazy(() => import('../pages/Bookings'));
const Customers = lazy(() => import('../pages/Customers'));
const Cars = lazy(() => import('../pages/Cars'));
const Payments = lazy(() => import('../pages/Payments'));
const Statistics = lazy(() => import('../pages/Statistics'));

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: (
      <ProtectAdminRoute>
        <CustomerContextProvider>
          <CarsContextProvider>
            <BookingContextProvider>
              <PaymentContextProvider>
                <FilterContextProvider>
                  <MainContainer />
                </FilterContextProvider>
              </PaymentContextProvider>
            </BookingContextProvider>
          </CarsContextProvider>
        </CustomerContextProvider>
      </ProtectAdminRoute>
    ),
    children: [
      {
        path: '/',
        element:
          <DashboardContextProvider>
            <Dashboard />
          </DashboardContextProvider>
        ,
      },
      {
        path: '/bookings',
        element: <Bookings />,
      },
      {
        path: '/customers',
        element: <Customers />,
      },
      {
        path: '/cars',
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
    ],
  },
]);

export default function Router() {
  return (<RouterProvider router={router} />);
}
