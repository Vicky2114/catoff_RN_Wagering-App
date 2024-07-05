// screens/MoreChallenges.js
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import GameCard from "../../Components/GameCard";
import generateFakeGames from "../../utils/fakeData";

const PAGE_SIZE = 10;

const MoreChallenges = ({ route, navigation }) => {
  const { games: initialGames } = route.params;
  const [games, setGames] = useState(initialGames.slice(0, PAGE_SIZE)); // Show only the first PAGE_SIZE games initially
  const [allGames, setAllGames] = useState(initialGames); // Keep the full list of games separately
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState('');
  useEffect(() => {
    setFilteredGames(
      games.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, games]);

  const fetchMoreGames = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newGames = generateFakeGames(PAGE_SIZE); // Generate more games for demonstration
      setAllGames((prevGames) => [...prevGames, ...newGames]); // Update the full list of games
      setGames((prevGames) => [...prevGames, ...newGames.slice(0, PAGE_SIZE)]); // Append only the first PAGE_SIZE new games to the displayed list
      setLoading(false);
      setPage((prevPage) => prevPage + 1);
    }, 1000); // Simulate network delay
  };

  const handleScroll = ({ nativeEvent }) => {
    const paddingToBottom = 20;
    const isNearBottom =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - paddingToBottom;

    if (isNearBottom && !loading) {
      fetchMoreGames();
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <Text style={styles.header}>More Challenges</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search challenges"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16} // More responsive scroll events
      >
        {games.map((game, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("GameDetail", { game })}
          >
            <GameCard {...game} />
          </TouchableOpacity>
        ))}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading more challenges...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default MoreChallenges;
