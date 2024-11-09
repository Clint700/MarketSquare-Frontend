import React, { createContext, useContext, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, register } from "../services/authService";

type AuthContextType = {
  user: any;
  role: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    number: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState<string | null>(null);

  const signIn = (username: string, password: string) => {
    return login(username, password)
      .then((response) => {
        setUser(response.data.user);
        setRole(response.data.user.role);
        AsyncStorage.setItem("authToken", response.data.token);
        AsyncStorage.setItem("userRole", response.data.user.role);
      })
      .catch((error) => {
        console.error("Login error:", error);
        throw new Error("Login failed");
      });
  };

  const signUp = (
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    number: string
  ) => {
    const role = "customer"; // Default role for new sign-ups
    return register(username, password, firstName, lastName, email, number, role).then((response) => {
      const { user: userData, token } = response.data;
      setUser({ ...userData, token });
      AsyncStorage.setItem("authToken", token);
      AsyncStorage.setItem("userRole", userData.role);
    });
  };

  const signOut = () => {
    setUser(null);
    setRole(null);
    AsyncStorage.removeItem("authToken");
    AsyncStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ user, role, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
