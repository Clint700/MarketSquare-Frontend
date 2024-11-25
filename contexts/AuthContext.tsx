import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, register } from "../services/authService";

type AuthContextType = {
  user: any;
  role: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    number: string,
    role: string,
    address: Object,
    preferences: Object
  ) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        const storedRole = await AsyncStorage.getItem("userRole");
        const storedUser = await AsyncStorage.getItem("userData");

        if (storedToken && storedRole && storedUser) {
          setUser(JSON.parse(storedUser));
          setRole(storedRole);
        }
      } catch (error) {
        console.error("Failed to load user data from AsyncStorage:", error);
      }
    };
    loadUserData();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await login(username, password);
      const userData = response.data.user;
      const token = response.data.token;

      setUser(userData);
      setRole(userData.role);

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userRole", userData.role);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  const signUp = async (
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    number: string,
    role: string,
    address: Object,
    preferences: Object
  ) => {
    try {
      const response = await register(
        username,
        password,
        firstName,
        lastName,
        email,
        number,
        role,
        address,
        preferences
      );
      const userData = response.data.user;
      const token = response.data.token;

      setUser(userData);
      setRole(role);

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userRole", role);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Signup failed");
    }
  };

  const signOut = async () => {
    setUser(null);
    setRole(null);
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userRole");
    await AsyncStorage.removeItem("userData");
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
