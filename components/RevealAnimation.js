import "react-native-reanimated";
import "react-native-gesture-handler";
import { MotiView } from "moti";
import { View, Text, StyleSheet } from "react-native";

export default function HeaderRevealAnimation({ totalExpenses }) {
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: "timing",
      }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Total Expenses: {totalExpenses} €</Text>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginLeft: 10,
    color: "white",
  },
  headerContainer: {
    marginTop: 10,
    backgroundColor: "rgb(32, 41, 54)",
    paddingBottom: 10,
    paddingTop: 10,
    borderColor: "darkgreen",
    borderWidth: 2,
    marginBottom: 5,
    shadowColor: "white",
    shadowOffset: { width: 20, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 0.5,
  },
});
