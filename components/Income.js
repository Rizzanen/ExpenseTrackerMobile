import { View, Text, StyleSheet, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Button, Icon } from "@rneui/themed";

export default function Income() {
  //lisää tietokanta taului jossa on erilaisia palkkapäiviä. ja Joku missä niitä voi lisätä
  const [total, setTotal] = useState(0);
  const [employers, setEmployers] = useState([
    {
      name: "VisioHR",
      currentMonthIncome: 106.85,
      currentMonthShiftAmount: 1,
      currentMonthWorkHourAmount: 6,
      totalIncome: 1085.74,
      totalShifts: 40,
    },
  ]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Total income: {total} €</Text>
      </View>
      <View style={styles.employerHeaderContainer}>
        <Text style={styles.header}>Employers</Text>
        <Icon
          type="entypo"
          name="circle-with-plus"
          size={35}
          style={{ marginRight: 20 }}
          color={"white"}
        />
      </View>
      <View>
        <FlatList
          data={employers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.employerView}>
              <View style={{ flex: 1 }}>
                <Text style={{ marginLeft: 15, fontSize: 30, color: "white" }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 18,
                    marginTop: 40,
                    color: "white",
                  }}
                >
                  {item.currentMonthShiftAmount} Shifts
                </Text>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 18,
                    marginTop: 5,
                    color: "white",
                  }}
                >
                  {item.currentMonthWorkHourAmount} hours
                </Text>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 18,
                    marginTop: 5,
                    color: "white",
                  }}
                >
                  Total: {item.currentMonthIncome} €
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "white" }}>More info</Text>
                  <Icon
                    type="antdesign"
                    name="arrowright"
                    size={15}
                    style={{ marginRight: 20 }}
                    color={"white"}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 2,
                    borderColor: "white",
                    padding: 10,
                    marginRight: "auto",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                    }}
                  >
                    Add shift
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
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
  employerHeaderContainer: {
    marginTop: 10,
    backgroundColor: "green",
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContainer: {
    marginTop: 10,
    backgroundColor: "green",
    paddingBottom: 10,
    paddingTop: 10,
  },
  employerView: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 20,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "green",
    flexDirection: "row",
  },
});
