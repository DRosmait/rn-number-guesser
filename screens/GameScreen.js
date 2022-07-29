import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import CardTitle from "../components/ui/CardTitle";
import PrimaryButton from "../components/ui/PrimaryButton";

import Title from "../components/ui/Title";

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

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

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

    setCurrentGuess(
      generateRandomBetween(minBoundary, maxBoundary, currentGuess)
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <CardTitle>Lower or greater?</CardTitle>

        <PrimaryButton onPress={() => nextGuessHandler("lower")}>
          -
        </PrimaryButton>
        <PrimaryButton onPress={() => nextGuessHandler("greater")}>
          +
        </PrimaryButton>
      </Card>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});
