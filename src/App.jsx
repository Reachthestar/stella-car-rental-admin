import React, { Suspense } from 'react';
import AuthContextProvider from './contexts/auth-context';
import Router from './routes/index';

function App() {
  return (
    <AuthContextProvider>
      <Suspense>
        <Router />
      </Suspense>
    </AuthContextProvider>
  );
}

export default App;
