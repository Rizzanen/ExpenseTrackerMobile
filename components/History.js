import { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("incomeExpense.db");

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // db.transaction((tx) => tx.executeSql("delete from history"), null);
    db.transaction(
      (tx) => {
        tx.executeSql("select * from history;", [], (_, { rows }) => {
          const noDuplicates = new Map();
          rows._array.filter((item) => {
            const key = `${item.month}-${item.year}`;
            if (!noDuplicates.has(key)) {
              noDuplicates.set(key, item);
            }
          });
          setData(Array.from(noDuplicates.values()));
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
          <View style={styles.expenseContainer}>
            <Text style={styles.expenseText}>
              {item.month} / {item.year}
            </Text>
            <Text style={styles.expenseText}>Expenses: {item.expenses} €</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  expenseContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "darkgreen",
    justifyContent: "space-around",
    padding: 10,
    shadowColor: "white",
    shadowOffset: { width: 40, height: 50 },
    shadowRadius: 60,
    shadowOpacity: 0.5,
  },
  expenseText: {
    fontSize: 25,
    color: "white",
  },
});
