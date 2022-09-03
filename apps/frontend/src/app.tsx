import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';
import { REGISTRATION_ROUTE } from './utils/const';

export function App() {
  const [isAuth, setIsAuth] = useState(false);
  const token = localStorage.getItem('access_token');

  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else if (location.pathname === REGISTRATION_ROUTE) {
      navigate(REGISTRATION_ROUTE);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
