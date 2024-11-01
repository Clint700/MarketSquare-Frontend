import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";

const SignupScreen = () => {
  const { signUp, user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = () => {
    signUp(username, password, email)
      .then(() => {
        Alert.alert("Success", "Account created successfully!");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      {user ? (
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Profile</Text>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Role: {user.role}</Text>
        </View>
      ) : (
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Sign Up</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <Button title="Sign Up" onPress={handleSignup} />
        </View>
      )}
    </View>
  );
};

export default SignupScreen;
