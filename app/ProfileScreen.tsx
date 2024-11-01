import { View, Text } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function HomeScreen() {
  const { user, role } = useAuth();

  return (
    <View>
      <Text>Welcome, {user?.username || "Guest"}</Text>
      <Text>Your role is: {role}</Text>
    </View>
  );
}
