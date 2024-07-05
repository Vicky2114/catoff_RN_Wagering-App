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
import axios from "axios";
import { REGISTER } from "../../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSignup = async () => {
    try {
      setLoading(true); // Set loading state to true during request

      const response = await axios.post(REGISTER, {
        username: name,
        email,
        password,
      });
      setLoading(false); // Set loading state to false after request completes
      
      console.log("Signup successful:", response.data);
      setSnackbarMessage("Signup successful.");
      setSnackbarVisible(true);
      
      navigation.navigate("Login");
      // Navigate to login screen or any other screen
  
    } catch (error) {
      setLoading(false); // Ensure loading state is reset on error

      if (error.response) {
        // The request was made and the server responded with a status code
        console.log(
          "Server responded with non-2xx status:",
          error.response.data
        );
        console.log("Status code:", error.response.status);
        console.log("Headers:", error.response.headers);
        setSnackbarMessage("Signup failed. Please try again.");
        setSnackbarVisible(true);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Request made but no response received:", error.request);
        setSnackbarMessage(
          "Network error. Please check your internet connection."
        );
        setSnackbarVisible(true);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error during request setup:", error.message);
        setSnackbarMessage("Error during signup. Please try again later.");
        setSnackbarVisible(true);
      }

      console.error("Axios error:", error);
      throw error; // Re-throw the error to handle it in the calling function
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
        <Title style={styles.subTitle}>Easy Signup</Title>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
        />
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
            onPress={handleSignup}
            style={styles.button}
            loading={loading} // Show loader based on loading state
          >
            Signup
          </Button>
          <Button
            onPress={() => navigation.navigate("Login")}
            style={styles.button}
          >
            Go to Login
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
  subTitle: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 40,
    color: "black",
  },
});

export default SignupScreen;
