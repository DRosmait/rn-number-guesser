import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/colors";

preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [guessNumber, setGuessNumber] = useState(1);
  const [gameIsOver, setGameIsOver] = useState(true);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      hideAsync();
    }
  }, [fontsLoaded, hideAsync]);

  if (!fontsLoaded) return null;

  function pickedNumberHandler(number) {
    setUserNumber(number);
    setGameIsOver(false);
  }

  function gameOverHandler() {
    setGameIsOver(true);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessNumber(1);
    setGameIsOver(false);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen onGameOver={gameOverHandler} userNumber={userNumber} />
    );
  }
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessNumber}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  // TODO remove it
  screen = <GameOverScreen userNumber={userNumber} />;

  return (
    <>
      <StatusBar style="inverted" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/dices.jpeg")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
