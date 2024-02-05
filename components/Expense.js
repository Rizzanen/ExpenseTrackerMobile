import { View, Text, StyleSheet } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";

export default function Expense() {
  return (
    <View style={{ flex: 1, backgroundColor: "rgb(23,24,33)" }}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Total Expenses : 1000€</Text>
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Icon
            type="materialIcons"
            name="local-grocery-store"
            size={35}
            style={{ marginRight: 0 }}
            color={"white"}
          />
          <Text style={styles.circleText}>420.96 €</Text>
        </View>
        <View style={styles.circle}>
          <Icon
            type="antdesign"
            name="car"
            size={35}
            style={{ marginRight: 0 }}
            color={"white"}
          />
          <Text style={styles.circleText}>420.96 €</Text>
        </View>
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Ionicons
            name="shirt-sharp"
            size={35}
            style={{ marginRight: 0 }}
            color={"white"}
          />
          <Text style={styles.circleText}>420.96 €</Text>
        </View>
        <View style={styles.circle}>
          <Icon
            type="materialicons"
            name="house"
            size={35}
            style={{ marginRight: 0 }}
            color={"white"}
          />
          <Text style={styles.circleText}>420.96 €</Text>
        </View>
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Icon
            type="fontisto"
            name="question"
            size={35}
            style={{ marginRight: 0 }}
            color={"white"}
          />
          <Text style={styles.circleText}>420.96 €</Text>
        </View>
      </View>
    </View>
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
  circle: {
    backgroundColor: "rgb(32, 41, 54)",
    shadowColor: "white",
    shadowOffset: { width: 20, height: 10 },
    shadowRadius: 60,
    shadowOpacity: 0.5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
    borderColor: "darkgreen",
    borderWidth: 2,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  circleText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    marginLeft: 5,
  },
  circleContainer: {
    flexDirection: "row",
  },
});
