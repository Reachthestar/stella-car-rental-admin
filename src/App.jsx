import React, { Suspense } from 'react';
import AuthContextProvider from './contexts/auth-context';
import Router from './routes/index';

function App() {
  return (
    <AuthContextProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Router />
      </Suspense>
    </AuthContextProvider>
  );
}

export default App;
