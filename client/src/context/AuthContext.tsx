import { createContext, useRef, useState } from "react";
import { loginRequest } from "../api/userAuth";

interface AuthContextType {
  login: () => void;
  logout: () => void;
  register: () => void;
  verify: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const timeoutId = useRef<number | null>(null);
  const [user, setUser] = useState([]);
  const [isAuthenticades, setIsAuthenticated] = useState<boolean>(false);
  const [messageError, setMessageError] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async () => {
    const res = await loginRequest(user);
    if (res.status === 200) {
      setUser(res.data);
      setIsAuthenticated(true);
    } else {
      setMessageError([res.data[0].message]);
      setIsAuthenticated(false);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(() => {
        setMessageError([]);
      }, 1500);
    }
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};
