import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import {
  Text,
  Button,
  Appbar,
  Divider,
  Dialog,
  Portal,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GAMEJOIN, GET_GAME_DETAILS } from "../../api/auth";

const GameDetailScreen = ({ route, navigation }) => {
  const { game } = route.params;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [gamedata, setGameData] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  const showDialog = (message) => {
    setDialogMessage(message);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true); // Set loading state to true at the beginning
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(GET_GAME_DETAILS(game.title), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        setGameData(response.data.game);

        // Check if the game is already joined
        if (response.data.game.status === "joined") {
          setIsJoined(true);
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 404) {
          showDialog(
            "You are not registered for this game. Please join and play the game."
          );
        } else {
          console.error("Fetch Game Details Error:", error);
          showDialog("Unable to fetch game details. Please try again later.");
        }
      } finally {
        setLoading(false); // Set loading state to false after request completes
      }
    };

    fetchGameDetails();
  }, [game.title]);

  const joinGame = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const response = await axios.post(
        GAMEJOIN,
        {
          title: game.title,
          score: 0,
          status: "joined",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      setIsJoined(true);
      showDialog("You have successfully joined the game!");
    } catch (error) {
      setLoading(false);
      console.error("Join Game Error:", error);
      showDialog("Unable to join the game. Please try again later.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Game Detail" />
        <Appbar.Action icon="share-variant" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.startDate}>Starts on {game.startDate}</Text>
        <Text style={styles.title}>{game.title}</Text>
        <View style={styles.tagsContainer}>
          {game.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Image source={{ uri: game.image }} style={styles.image} />
        <Text style={styles.winnerText}>Winner Takes Home</Text>
        <Text style={styles.credits}>{game.amount} Credits</Text>
        <Text style={styles.rate}>2 Credits = 1 USDT</Text>
        <Divider style={styles.divider} />
        <Text style={styles.aboutTitle}>ABOUT THE CHALLENGE</Text>
        <Text style={styles.description}>{game.description}</Text>
        <Text style={styles.readMore}>Read More</Text>
        <Divider style={styles.divider} />
        <Text style={styles.notesTitle}>IMPORTANT NOTES</Text>
        <Text style={styles.notes}>* Outdoor Challenge</Text>
        <Text style={styles.notes}>* Tracker Device should be on</Text>
        <Text style={styles.notes}>* Malpractices will not be encouraged</Text>
        <Divider style={styles.divider} />
        <View style={styles.playersContainer}>
          <Text style={styles.playersText}>{game.joined} Players joined</Text>
          <Text style={styles.playersTotal}>of {game.totalPlayers} Total</Text>
        </View>

        {loading ? (
          <ActivityIndicator animating={true} />
        ) : isJoined ? (
          <Button
            mode="contained"
            onPress={() => navigation.navigate("GameDashboard", { game })}
            style={[styles.button, { backgroundColor: "#333" }]}
          >
            View Status
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={joinGame}
            style={styles.button}
          >
            Join Game
          </Button>
        )}
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Game Join Status</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  startDate: {
    fontSize: 16,
    color: "gray",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  tagText: {
    fontSize: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
  winnerText: {
    fontSize: 18,
    color: "gray",
  },
  credits: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  rate: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  divider: {
    marginVertical: 10,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
  readMore: {
    fontSize: 14,
    color: "blue",
    marginVertical: 10,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  notes: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  playersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  playersText: {
    fontSize: 14,
  },
  playersTotal: {
    fontSize: 14,
    color: "gray",
  },
  button: {
    backgroundColor: "black",
    marginTop: 10,
  },
});

export default GameDetailScreen;
