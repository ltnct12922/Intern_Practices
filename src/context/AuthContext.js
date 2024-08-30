// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import UserService from '../components/service/UserService';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());
  const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(UserService.isAuthenticated());
      setIsAdmin(UserService.isAdmin());
    };

    checkAuth();
    // Add logic to listen for token changes if applicable
  }, []);

  const login = async (email, password) => {
    try {
      await UserService.login(email, password);
      setIsAuthenticated(true);
      setIsAdmin(UserService.isAdmin());
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    UserService.logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
