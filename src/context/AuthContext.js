// src/context/AuthContext.js
import { createContext } from 'react';

const AuthContext = createContext({
  setIsLoading: () => {},
});

export default AuthContext;