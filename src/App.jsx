import AuthContextProvider from './contexts/auth-context';
import Router from './routes/index';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider >
    </>
  );
}

export default App;
