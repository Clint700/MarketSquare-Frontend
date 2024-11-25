import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

export default function AdminDashboard() {
  const { user, signOut } = useAuth();

  return (
    <LinearGradient
      colors={["#e3e4e5", "#f5f5f5"]}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                user?.profileImage ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC0EDEBwYBnBuEt5RfgAN1Oc9fw7IKZAs67g&s",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.header}>
            Welcome, {user?.first_name || "Admin"}
          </Text>

          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>User Information</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>First Name:</Text>
              <Text style={styles.infoValue}>{user?.first_name || "N/A"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Name:</Text>
              <Text style={styles.infoValue}>{user?.last_name || "N/A"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Username:</Text>
              <Text style={styles.infoValue}>{user?.username || "N/A"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user?.email || "N/A"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone Number:</Text>
              <Text style={styles.infoValue}>{user?.number || "N/A"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Role:</Text>
              <Text style={styles.infoValue}>{user?.role || "N/A"}</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Address</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Street:</Text>
              <Text style={styles.infoValue}>
                {user?.address?.street || "N/A"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>City:</Text>
              <Text style={styles.infoValue}>
                {user?.address?.city || "N/A"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>County:</Text>
              <Text style={styles.infoValue}>
                {user?.address?.county || "N/A"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Postcode:</Text>
              <Text style={styles.infoValue}>
                {user?.address?.postcode || "N/A"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Country:</Text>
              <Text style={styles.infoValue}>
                {user?.address?.country || "N/A"}
              </Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Theme:</Text>
              <Text style={styles.infoValue}>
                {user?.preferences?.theme || "N/A"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Notifications:</Text>
              <Text style={styles.infoValue}>
                {user?.preferences?.notifications ? "Enabled" : "Disabled"}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    color: "#444",
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
