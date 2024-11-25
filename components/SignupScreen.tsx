import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainTabNavigator"
>;

export default function SignupScreen() {
  const { signUp } = useAuth();
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhoneNumber = (number: string) => /^\d{10,11}$/.test(number);
  const isValidName = (name: string) => /^[A-Za-z\s]+$/.test(name);
  const isValidUsername = (username: string) => /^[A-Za-z0-9]{5,}$/.test(username);
  const isValidPassword = (password: string) => password.length >= 6;

  const validateInputs = () => {
    if (!isValidUsername(username)) {
      Alert.alert(
        "Invalid Username",
        "Username must be at least 5 characters and contain only letters and numbers."
      );
      return false;
    }
    if (!isValidPassword(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 6 characters long."
      );
      return false;
    }
    if (!isValidName(firstName)) {
      Alert.alert(
        "Invalid First Name",
        "First name should only contain letters."
      );
      return false;
    }
    if (!isValidName(lastName)) {
      Alert.alert(
        "Invalid Last Name",
        "Last name should only contain letters."
      );
      return false;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return false;
    }
    if (!isValidPhoneNumber(number)) {
      Alert.alert(
        "Invalid Phone Number",
        "Phone number should be 10 or 11 digits long."
      );
      return false;
    }
    if (!street || !city || !county || !postcode || !country) {
      Alert.alert("Invalid Address", "Please complete your address details.");
      return false;
    }
    return true;
  };

  const handleSignup = () => {
    const address = { street, city, county, postcode, country };
    const preferences = { theme, notifications };

    if (!validateInputs()) return;

    setLoading(true);
    signUp(
      username,
      password,
      firstName,
      lastName,
      email,
      number,
      role,
      address,
      preferences
    )
      .then(() => {
        setLoading(false);
        Alert.alert("Success", "Account created successfully!");
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabNavigator", params: { screen: "Home" } }],
        });
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert(
          "Error",
          error.response?.data?.msg || "Signup failed. Please try again."
        );
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Creating your account...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Sign Up</Text>

        {/* Basic Info Section */}
        <Text style={styles.sectionTitle}>Basic Info</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter your password"
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email address"
          placeholderTextColor="#888"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={setNumber}
          placeholder="Enter your phone number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
        />

        {/* Address Section */}
        <Text style={styles.sectionTitle}>Address</Text>
        <Text style={styles.label}>Street</Text>
        <TextInput
          style={styles.input}
          value={street}
          onChangeText={setStreet}
          placeholder="Enter your street"
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Enter your city"
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>County</Text>
        <TextInput
          style={styles.input}
          value={county}
          onChangeText={setCounty}
          placeholder="Enter your county"
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>Postcode</Text>
        <TextInput
          style={styles.input}
          value={postcode}
          onChangeText={setPostcode}
          placeholder="Enter your postcode"
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
          placeholder="Enter your country"
          placeholderTextColor="#888"
        />

        {/* Preferences Section */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Text style={styles.label}>Theme:</Text>
        <Picker
          selectedValue={theme}
          onValueChange={(value) => setTheme(value)}
          style={Platform.select({
            ios: styles.pickerIOS,
            android: styles.picker,
          })}
        >
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
        </Picker>
        <Text style={styles.label}>Notifications:</Text>
        <Picker
          selectedValue={notifications}
          onValueChange={(value) => setNotifications(value)}
          style={Platform.select({
            ios: styles.pickerIOS,
            android: styles.picker,
          })}
        >
          <Picker.Item label="Enabled" value={true} />
          <Picker.Item label="Disabled" value={false} />
        </Picker>

        {/* Role Section */}
        <Text style={styles.sectionTitle}>Role</Text>
        <Picker
          selectedValue={role}
          onValueChange={(value) => setRole(value)}
          style={Platform.select({
            ios: styles.pickerIOS,
            android: styles.picker,
          })}
        >
          <Picker.Item label="Customer" value="customer" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>

        {/* Submit Button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("AuthStack", { screen: "Login" })}
        >
          <Text style={styles.loginText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4A5568",
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#4A5568",
  },
  input: {
    height: 50,
    borderColor: "#CBD5E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    borderColor: "#CBD5E0",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  pickerIOS: {
    height: 200,
    marginBottom: 15,
  },
  signupButton: {
    height: 50,
    backgroundColor: "#3182CE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    textAlign: "center",
    color: "#3182CE",
    fontSize: 16,
    marginTop: 15,
    textDecorationLine: "underline",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4A5568",
  },
});