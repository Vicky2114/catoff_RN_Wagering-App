import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Circle } from "react-native-svg";

const GameCard = ({
  title,
  description,
  joined,
  totalPlayers,
  startDate,
  tags,
  image,
}) => {
  // Ensure totalPlayers is not zero to avoid division by zero
  const percentageJoined = totalPlayers !== 0 ? joined * 100 : 0;

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.details}>
            {joined} Joined
          </Text>
          <Text style={styles.details}>Start Date: {startDate}</Text>
          <Text style={styles.tags}>Tags: {tags.join(", ")}</Text>
        </View>

        <View style={styles.progressBarContainer}>
          <AnimatedCircularProgress
            size={65}
            width={6}
            fill={
              (parseFloat(joined.split("/")[0]) /
                parseFloat(joined.split("/")[1])) *
              100
            }
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
            rotation={0}
            lineCap="round"
            style={styles.progressBar}
            renderCap={({ center }) => (
              <Circle cx={center.x} cy={center.y} r="10" fill="blue" />
            )}
          >
            {(fill) => (
              <Text style={styles.progressText}>{Math.round(fill)}%</Text>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    maxWidth: "100%", // Adjust maximum width as needed
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    marginBottom: 5,
  },
  details: {
    fontSize: 10,
    color: "#888",
  },
  tags: {
    fontSize: 10,
    marginTop: 5,
    color: "#007BFF",
  },
  progressBarContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    position: "absolute",
  },
  progressText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginTop: 30,
  },
});

export default GameCard;
