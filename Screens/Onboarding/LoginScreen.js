import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Text,
  useTheme,
  Title,
  Snackbar,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { LOGIN } from "../../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth(); // Access login function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true); // Set loading state to true during request

      const response = await axios.post(LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Store token and user data in AsyncStorage
      // Show loader or any loading indicator here

      // Set AsyncStorage items with a delay
      await login(token, user);
      // await AsyncStorage.setItem("token", token);
      // await AsyncStorage.setItem("user", JSON.stringify(user));

      // Simulate a delay for loader (you can adjust the time as needed)
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 1000 milliseconds (1 second) delay
      setLoading(false); // Set loading state to false after request completes
      // Navigate to home screen or any other screen
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false); // Ensure loading state is reset on error
      console.error("Login Error:", error.response);
      setError("Invalid email or password"); // Example error message handling
      setSnackbarMessage("Login failed. Please try again.");
      setSnackbarVisible(true);
    }
  };

  const onDismissSnackbar = () => setSnackbarVisible(false);

  return (
    <LinearGradient
      colors={["#FFF9C4", "#FFF59D", "#FFF176"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Title style={styles.title}>Mini Wagering</Title>
        <Title style={styles.subTite}>Easy Game</Title>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
        />
        {error ? (
          <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
        ) : null}
        <View style={{ alignItems: "center" }}>
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            loading={loading} // Show loader based on loading state
          >
            Login
          </Button>
          <Button
            onPress={() => navigation.navigate("Signup")}
            style={styles.button}
          >
            Go to Signup
          </Button>
        </View>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackbar}
          duration={3000} // Adjust duration as needed
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    color: "black",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    width: "60%",
    marginVertical: 8,
  },
  error: {
    marginBottom: 12,
    textAlign: "center",
  },
  subTite: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 40,
    color: "black",
  },
});

export default LoginScreen;
