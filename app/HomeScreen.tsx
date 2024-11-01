import { View, Text, Button } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function HomeScreen() {
  const { user, role, signOut } = useAuth();

  return (
    <View>
      <Text>Welcome, {user?.username || "Guest"}</Text>
      <Text>Your role is: {role}</Text>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
}
