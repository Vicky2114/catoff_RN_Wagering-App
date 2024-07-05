import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { Appbar, Menu, Divider } from "react-native-paper";
import GameCard from "../../Components/GameCard";
import TopSection from "../../Components/TopSection";
import generateFakeGames from "../../utils/fakeData";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";

const HomeScreen = ({ navigation }) => {
  const { logout, user } = useAuth(); // Access user data and logout function from AuthContext
  const nav = useNavigation();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const fetchGames = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newGames = generateFakeGames(50); // Generate 50 games for demonstration
      setGames(newGames);
      setLoading(false);
    }, 1000); // Simulate network delay
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleMenuToggle = () => setMenuVisible(!menuVisible);
  const handleMenuClose = () => setMenuVisible(false);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Wagering App" />
        <Menu
          visible={menuVisible}
          onDismiss={handleMenuClose}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color="black"
              onPress={handleMenuToggle}
            />
          }
          style={{
            marginTop: 70,
            marginLeft: -15,
            width: "50%",
          }}
        >
          <Menu.Item
            onPress={() => {
              /* Navigate to settings */ handleMenuClose();
              nav.navigate("Settings");
            }}
            title="Settings"
            style={{}}
          />
          <Divider />
          <Menu.Item onPress={logout} title="Logout" />
        </Menu>
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <TopSection />
        <Text style={styles.greetingText}>Hello, {user.username}!</Text>
        {games.slice(0, 10).map((game, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("GameDetail", { game })}
          >
            <GameCard {...game} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.viewMoreButton}
          onPress={() => nav.navigate("MoreChallenges", { games })}
        >
          <Text style={styles.viewMoreText}>View More Challenges</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    backgroundColor: "transparent", // Make the header transparent
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  viewMoreButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#004d00",
    borderRadius: 5,
    alignItems: "center",
  },
  viewMoreText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
