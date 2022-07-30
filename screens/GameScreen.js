import { useEffect, useState } from "react";
import { View, StyleSheet, Alert, FlatList, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import CardTitle from "../components/ui/CardTitle";
import PrimaryButton from "../components/ui/PrimaryButton";

import Title from "../components/ui/Title";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }

  return rndNum;
}

let minBoundary = 1;
let maxBoundary = 99;

function GameScreen({ userNumber, onGameOver }) {
  const [currentGuess, setCurrentGuess] = useState(() =>
    generateRandomBetween(minBoundary, maxBoundary, userNumber)
  );
  const [guessRound, setGuessRound] = useState([currentGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRound.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 99;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that it's wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newGuess = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newGuess);
    setGuessRound((currentGuessRound) => [newGuess, ...currentGuessRound]);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <CardTitle>Lower or greater?</CardTitle>

        <View style={styles.buttonsContainer}>
          <PrimaryButton
            style={styles.buttonWrapper}
            onPress={() => nextGuessHandler("lower")}
          >
            <Ionicons name="md-remove" size={36} color="white" />
          </PrimaryButton>
          <PrimaryButton
            style={styles.buttonWrapper}
            onPress={() => nextGuessHandler("greater")}
          >
            <Ionicons name="md-add" size={36} color="white" />
          </PrimaryButton>
        </View>
      </Card>

      <View style={styles.listContainer}>
        <FlatList
          data={guessRound}
          renderItem={({ item, index }) => (
            <GuessLogItem
              roundNumber={guessRound.length - index}
              guess={item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  buttonWrapper: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
