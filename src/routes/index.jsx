

import Login from '../pages/Login';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import Settings from "../pages/Settings";
import MainContainer from "../layouts/MainContainer";
import Payments from "../pages/Payments";
import Cars from "../pages/Cars";
import BookingContextProvider from '../contexts/booking-context';
import CarsContextProvider from '../contexts/car-context';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/bookings",
        element:
          <BookingContextProvider>
            <Bookings />
          </BookingContextProvider>
        ,
      },
      {
        path: "/cars",
        element:<Cars />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  { path: '/login', element: <Login /> }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
