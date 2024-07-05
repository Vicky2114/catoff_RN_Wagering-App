import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { IconButton } from "react-native-paper";

const TopSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.creditsContainer}>
        <Text style={styles.creditsText}>
          Low on credits? Add more and join challenge
        </Text>
        <Text style={styles.addCredits}>Add Credits</Text>
      </View>
      <TextInput style={styles.input} placeholder="Enter Invitation Link" />
      <View style={styles.iconContainer}>
        <View style={styles.iconWrapper}>
          <IconButton
            icon="account-plus"
            size={40}
            onPress={() => console.log("Dare A Friend pressed")}
            style={styles.iconButton}
          />
          <Text style={styles.iconLabel}>Dare A Friend</Text>
        </View>

        <View style={styles.iconWrapper}>
          <IconButton
            icon="sword-cross"
            size={40}
            onPress={() => console.log("Versus A Friend pressed")}
            style={styles.iconButton}
          />
          <Text style={styles.iconLabel}>Versus A Friend</Text>
        </View>

        <View style={styles.iconWrapper}>
          <IconButton
            icon="account-group"
            size={40}
            onPress={() => console.log("Multiplayer pressed")}
            style={styles.iconButton}
          />
          <Text style={styles.iconLabel}>Multiplayer</Text>
        </View>

        <View style={styles.iconWrapper}>
          <IconButton
            icon="playlist-plus"
            size={40}
            onPress={() => console.log("Create Your Challenge pressed")}
            style={styles.iconButton}
          />
          <Text style={styles.iconLabel}>Create Your Challenge</Text>
        </View>

        <View style={styles.iconWrapper}>
          <IconButton
            icon="gamepad-variant"
            size={40}
            onPress={() => console.log("My Live Challenges pressed")}
            style={styles.iconButton}
          />
          <Text style={styles.iconLabel}>My Live Challenges</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  creditsContainer: {
    backgroundColor: "#004d00",
    padding: 30,
    borderRadius: 5,

    marginBottom: 10,
  },
  creditsText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  addCredits: {
    color: "#ffd700",
    marginTop: 5,
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  iconWrapper: {
    alignItems: "center",
    marginBottom: 10,
  },
  iconButton: {
    marginBottom: 5, // Adjust margin as needed
  },
  iconLabel: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default TopSection;
