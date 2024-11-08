import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export default function ManageUsersScreen() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://marketsquare-backend-6yy4.onrender.com/api/admin/users", {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.user}>
            <Text>Username: {item.username}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Role: {item.role}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  user: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  loading: { flex: 1, justifyContent: "center" },
});
