import { Suspense } from 'react';
import AuthContextProvider from './contexts/auth-context';
import Router from './routes/index';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Router />
        </Suspense>
      </AuthContextProvider>
    </>
  );
}

export default App;
