import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getMyProfile } from "../services/userService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    if (!token) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    try {
      const profile = await getMyProfile();
      setCurrentUser(profile);
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setCurrentUser(userData || null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCurrentUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      currentUser,
      loading,
      login,
      logout,
      refreshProfile: loadProfile,
    }),
    [token, currentUser, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
