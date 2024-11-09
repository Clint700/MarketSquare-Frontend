import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminDashboard() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      <Text>Manage your platform from here.</Text>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
