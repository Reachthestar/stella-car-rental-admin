import AuthContextProvider from './contexts/auth-context';
import CarsContextProvider from './contexts/car-context';
import Router from './routes/index';

function App() {
  return (
    <>
      <AuthContextProvider>
        <CarsContextProvider>
          <Router />
        </CarsContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
