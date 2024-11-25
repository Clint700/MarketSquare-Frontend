import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { fetchAllCustomers } from "../../services/adminService";

interface User {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  role: string;
}

const ManageUsersScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchAllCustomers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4682B4" />
        <Text style={styles.loadingText}>Loading Users...</Text>
      </View>
    );
  }

  if (!users.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Users Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <View style={styles.userRow}>
              <Text style={styles.userLabel}>Username:</Text>
              <Text style={styles.userText}>{item.username}</Text>
            </View>
            <View style={styles.userRow}>
              <Text style={styles.userLabel}>First Name:</Text>
              <Text style={styles.userText}>{item.first_name}</Text>
            </View>
            <View style={styles.userRow}>
              <Text style={styles.userLabel}>Last Name:</Text>
              <Text style={styles.userText}>{item.last_name}</Text>
            </View>
            <View style={styles.userRow}>
              <Text style={styles.userLabel}>Email:</Text>
              <Text style={styles.userText}>{item.email}</Text>
            </View>
            <View style={styles.userRow}>
              <Text style={styles.userLabel}>Phone Number:</Text>
              <Text style={styles.userText}>{item.number}</Text>
            </View>
            <View style={styles.userRow}>
              <Text style={styles.userLabel}>Role:</Text>
              <Text style={styles.userText}>{item.role}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ManageUsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4f0",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
  },
  userCard: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    width: 110,
  },
  userText: {
    fontSize: 15,
    color: "#444",
  },
});