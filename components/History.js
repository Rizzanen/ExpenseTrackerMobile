import { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("incomeExpense.db");

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log("Resetting database");
    // db.transaction(
    //   (tx) => {
    //     tx.executeSql("DROP TABLE IF EXISTS history;");
    //   },
    //   (error) => console.error("Error during database reset:", error),
    //   () => {
    //     console.log("Database reset successful");
    //     updateList();
    //   }
    // );

    // db.transaction(
    //   (tx) => tx.executeSql("insert into lastTimeUsed (month) values (?)", [1]),
    //   null
    // );
    db.transaction(
      (tx) => {
        tx.executeSql("select * from history;", [], (_, { rows }) => {
          setData(rows._array);
        });
      },
      null,
      null
    );
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "rgb(23,24,33)" }}>
      <FlatList
        style={{ height: 400, width: "100%" }}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Perkele</Text>
            <Text>I {item.income}</Text>
            <Text>E {item.expenses}</Text>
            <Text>M {item.month}</Text>
            <Text>Y {item.year}</Text>
          </View>
        )}
      />
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
    backgroundColor: "rgb(32, 41, 54)",
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "darkgreen",
    borderWidth: 2,
    marginBottom: 5,
    shadowColor: "white",
    shadowOffset: { width: 20, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 0.5,
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
    shadowRadius: 50,
    shadowOpacity: 0.5,
  },
  employerView: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 20,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "rgb(32, 41, 54)",
    flexDirection: "row",
    flex: 1,
    borderColor: "darkgreen",
    borderWidth: 2,
    shadowColor: "white",
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 100,
    shadowOpacity: 0.3,
  },
  itemNameText: {
    marginLeft: 15,
    fontSize: 30,
    color: "white",
  },
  shiftAmountText: {
    marginLeft: 15,
    fontSize: 18,
    marginTop: 40,
    color: "white",
  },
  currentMonthHoursText: {
    marginLeft: 15,
    fontSize: 18,
    marginTop: 5,
    color: "white",
  },
  currentMonthIncomeText: {
    marginLeft: 15,
    fontSize: 18,
    marginTop: 5,
    color: "white",
  },
  employerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flex: 1,
  },
  addShiftContainer: {
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    backgroundColor: "white",
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
