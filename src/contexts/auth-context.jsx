import { createContext, useContext, useEffect, useState } from 'react';
import { getAdminToken, setAdminToken } from '../utils/local-storage';
import authApi from '../apis/auth';

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isAdminLoading , setIsAdminLoading] = useState(true)

  const fetchAdmin = async () => {
    try {
      if (getAdminToken()) {
        const getAdminRes = await authApi.getAdmin();
        const adminInfo = getAdminRes.data.message;
        setAdmin(adminInfo);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsAdminLoading(false)
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const login = async (input) => {
    const loginRes = await authApi.login(input);
    const token = loginRes.data.adminToken;
    setAdminToken(token);
    const getAdminRes = await authApi.getAdmin();
    const adminInfo = getAdminRes.data.message;
    setAdmin(adminInfo);
  };

  const logout = () => {
    localStorage.clear();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ login, admin, logout, isAdminLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
