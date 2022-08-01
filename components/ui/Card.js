import { Dimensions, StyleSheet, View } from "react-native";

import Colors from "../../constants/colors";

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: deviceWidth > 380 ? 36 : 18,
    marginHorizontal: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
