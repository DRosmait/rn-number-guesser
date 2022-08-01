import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";

import Title from "../components/ui/Title";
import Colors from "../constants/colors";

function GameOverScreen({ userNumber, roundsNumber, onStartNewGame }) {
  return (
    <View style={styles.rootContainer}>
      <Title>Game over</Title>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>

      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
        rounds to guess the number{" "}
        <Text style={styles.highlight}>{userNumber}</Text>
      </Text>

      <PrimaryButton onPress={onStartNewGame}>Start new game</PrimaryButton>
    </View>
  );
}

export default GameOverScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: deviceWidth * 0.75,
    width: deviceWidth * 0.75,
    borderRadius: (deviceWidth * 0.75) / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Colors.primary800,
    margin: 36,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
