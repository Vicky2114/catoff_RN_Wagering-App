// screens/GameDashboardScreen.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Button, Title, Paragraph, Card } from "react-native-paper";
import { Accelerometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import axios from "axios";
import { UPDATESCORE } from "../../api/auth";
import { useFocusEffect } from "@react-navigation/native";

const MAX_STEPS = 10000;
const STEP_THRESHOLD = 1.2;
const TIME_BETWEEN_STEPS = 300; // in milliseconds

const GameDashboardScreen = ({ route }) => {
  const { game } = route.params;

  // Function to update the score on the server
  const updateScore = async (score) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.patch(
        UPDATESCORE,
        { score, title: game.title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Update Score Error:", error);
    }
  };

  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [lastStepTime, setLastStepTime] = useState(0);

  const startTracking = async () => {
    setIsTracking(true);
    await AsyncStorage.setItem("isTracking", "true"); // Store tracking status

    Accelerometer.setUpdateInterval(100);

    Accelerometer.addListener((accelerometerData) => {
      const { x, y, z } = accelerometerData;
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      if (magnitude > STEP_THRESHOLD) {
        const now = Date.now();
        if (now - lastStepTime > TIME_BETWEEN_STEPS) {
          setCurrentStepCount((prevCount) => {
            const newCount = prevCount + 1;
            AsyncStorage.setItem("stepCount", newCount.toString());
            return newCount;
          });
          setLastStepTime(now);
        }
      }
    });

    const storedStepCount = await AsyncStorage.getItem("stepCount");
    if (storedStepCount) {
      setCurrentStepCount(parseInt(storedStepCount, 10));
    }
  };

  const stopTracking = async () => {
    setIsTracking(false);
    await AsyncStorage.setItem("isTracking", "false"); // Store tracking status

    Accelerometer.removeAllListeners();
    await updateScore(currentStepCount); // Update score one last time when tracking stops

    const storedStepCount = await AsyncStorage.getItem("stepCount");
    if (storedStepCount) {
      setCurrentStepCount(parseInt(storedStepCount, 10));
    }
  };

  useEffect(() => {
    const fetchStoredStepCount = async () => {
      const storedStepCount = await AsyncStorage.getItem("stepCount");
      if (storedStepCount) {
        setCurrentStepCount(parseInt(storedStepCount, 10));
      }
    };

    const fetchTrackingStatus = async () => {
      const trackingStatus = await AsyncStorage.getItem("isTracking");
      if (trackingStatus === "true") {
        setIsTracking(true);
        startTracking(); // Resume tracking if it was on before
      } else {
        setIsTracking(false);
        stopTracking(); // Ensure tracking is stopped if it was off before
      }
    };

    fetchStoredStepCount();
    fetchTrackingStatus();

    return () => {
      stopTracking();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (isTracking) {
        const interval = setInterval(async () => {
          await updateScore(currentStepCount);
        }, 10000); // Update every 10 seconds

        return () => {
          clearInterval(interval);
          updateScore(currentStepCount); // Ensure score is updated when the user navigates away
        };
      }
    }, [currentStepCount, isTracking])
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Game Dashboard</Title>
          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              size={150}
              width={10}
              fill={(currentStepCount % MAX_STEPS) / (MAX_STEPS / 100)}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
              rotation={0}
              lineCap="round"
            >
              {(fill) => (
                <Text style={styles.progressText}>
                  {currentStepCount} Steps
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>
          <Text style={styles.infoText}>
            Tracking: {isTracking ? "On" : "Off"}
          </Text>
          {!isTracking ? (
            <Button
              mode="contained"
              onPress={startTracking}
              style={styles.button}
            >
              Start Tracking
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={stopTracking}
              style={styles.button}
            >
              Stop Tracking
            </Button>
          )}
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.subtitle}>Game Rules</Title>
          <Paragraph style={styles.paragraph}>
            1. The game tracks your steps and rewards you for reaching the
            maximum of 10,000 steps.
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            2. Complete daily challenges to earn extra points.
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            3. Compete with friends to see who can achieve the most steps.
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            4. Stay active and healthy while having fun!
          </Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  card: {
    marginVertical: 10,
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  progressContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  progressText: {
    fontSize: 18,
    color: "#3d5875",
    textAlign: "center",
    position: "absolute",
  },
  infoText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#00e0ff",
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default GameDashboardScreen;
