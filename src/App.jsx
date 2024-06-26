import AuthContextProvider from './contexts/auth-context';
import BookingContextProvider from './contexts/booking-context';
import CarsContextProvider from './contexts/car-context';
import CustomerContextProvider from './contexts/customer-context';
import PaymentContextProvider from './contexts/payment-context'
import Router from './routes/index';

function App() {
  return (
    <>
      <AuthContextProvider>
        <CustomerContextProvider>
          <CarsContextProvider>
            <BookingContextProvider>
              <PaymentContextProvider>
                <Router />
              </PaymentContextProvider>
            </BookingContextProvider>
          </CarsContextProvider>
        </CustomerContextProvider>
      </AuthContextProvider >
    </>
  );
}

export default App;
