import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import AuthStack from "./AuthStack";
import MainTabNavigator from "./MainTabNavigator";

export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user } = useAuth();

  return user ? <MainTabNavigator /> : <AuthStack />;
}
