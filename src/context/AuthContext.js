// src/context/AuthContext.js
import { createContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  setIsLoading: () => {},
  setAuthState: () => {},
  login: () => {},
  logout: () => {},
  register: () => {},
});

export default AuthContext;