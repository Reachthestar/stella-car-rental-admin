import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Lazy loading components
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Bookings = lazy(() => import('../pages/Bookings'));
const Settings = lazy(() => import('../pages/Settings'));
const MainContainer = lazy(() => import('../layouts/MainContainer'));
const Payments = lazy(() => import('../pages/Payments'));
const Cars = lazy(() => import('../pages/Cars'));
const Statistics = lazy(() => import('../pages/Statistics'));
const Customers = lazy(() => import('../pages/Customers'));
const CustomerContextProvider = lazy(() =>
  import('../contexts/customer-context')
);
const CarsContextProvider = lazy(() => import('../contexts/car-context'));
const BookingContextProvider = lazy(() =>
  import('../contexts/booking-context')
);
const PaymentContextProvider = lazy(() =>
  import('../contexts/payment-context')
);
const ProtectAdminRoute = lazy(() =>
  import('../authentication/ProtectAdminRoute')
);
const Chat = lazy(() => import('../pages/Chat'));

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
                <MainContainer />
              </PaymentContextProvider>
            </BookingContextProvider>
          </CarsContextProvider>
        </CustomerContextProvider>
      </ProtectAdminRoute>
    ),
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
      {
        path: '/statistics/income',
        element: <Statistics />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      { path: '/chat', element: <Chat /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
