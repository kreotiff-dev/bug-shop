import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';
import { REGISTRATION_ROUTE } from './utils/const';

export function App() {
  const [isAuth, setIsAuth] = useState(false);
  const token = localStorage.getItem('access_token');

  const location = useLocation();
  const adminPath = location.pathname.slice(0, 6) === '/admin';
  const basketPath = location.pathname.slice(0, 7) === '/basket';
  const profilePath = location.pathname.slice(0,8) === '/profile'

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else if (location.pathname === REGISTRATION_ROUTE) {
      navigate(REGISTRATION_ROUTE);
    } else if(adminPath || basketPath || profilePath){
      navigate('/shop');
      setIsAuth(false)
    }else{
      setIsAuth(false)
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
