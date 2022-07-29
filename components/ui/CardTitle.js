import { StyleSheet, Text } from "react-native";

import Colors from "../../constants/colors";

function CardTitle({ children, style }) {
  return <Text style={[styles.cardTitle, style]}>{children}</Text>;
}

export default CardTitle;

const styles = StyleSheet.create({
  cardTitle: {
    color: Colors.accent500,
    fontSize: 16,
  },
});
