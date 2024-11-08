import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text>Username: {user?.username}</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Phone Number: {user?.number}</Text>
      <Text>Role: {user?.role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
