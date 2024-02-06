import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { SelectList } from "react-native-dropdown-select-list";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { MotiView } from "moti";
import HeaderRevealAnimation from "./RevealAnimation";

const db = SQLite.openDatabase("incomeExpense.db");

export default function Expense() {
  const [rerender, setRerender] = useState(false);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);

  const [category, setCategory] = useState();
  const [amount, setAmount] = useState();

  const [totalExpenses, setTotalExpenses] = useState();
  const [groceriesTotal, setGroceriesTotal] = useState();
  const [carTotal, setCarTotal] = useState();
  const [clothesTotal, setClothesTotal] = useState();
  const [livingTotal, setLivingTotal] = useState();
  const [otherTotal, setOtherTotal] = useState();

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists expenses (id integer primary key not null, category text, amount real );"
        );
      },
      () => console.error("Error when creating DB"),
      updatePage
    );
  }, [rerender]);

  const updatePage = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from expenses;", [], (_, { rows }) => {
          let carExpenses = 0.0;
          let grocerieExpenses = 0.0;
          let clothingExpenses = 0.0;
          let livingExpenses = 0.0;
          let otherExpenses = 0.0;
          rows._array.forEach((row) => {
            if (row.category == "car") {
              carExpenses += parseFloat(row.amount);
            } else if (row.category == "groceries") {
              grocerieExpenses += parseFloat(row.amount);
            } else if (row.category == "clothing") {
              clothingExpenses += parseFloat(row.amount);
            } else if (row.category == "living") {
              livingExpenses += parseFloat(row.amount);
            } else {
              otherExpenses += parseFloat(row.amount);
            }
          });

          let total =
            carExpenses +
            grocerieExpenses +
            clothingExpenses +
            livingExpenses +
            otherExpenses;
          setTotalExpenses(total.toFixed(2));
          setCarTotal(carExpenses.toFixed(2));
          setGroceriesTotal(grocerieExpenses.toFixed(2));
          setClothesTotal(clothingExpenses.toFixed(2));
          setLivingTotal(livingExpenses.toFixed(2));
          setOtherTotal(otherExpenses.toFixed(2));
        });
      },
      null,
      null
    );
  };

  const addExpense = () => {
    db.transaction((tx) => {
      tx.executeSql("insert into expenses (category, amount) values (?, ?);", [
        category,
        amount,
      ]);
    }, null);
    Keyboard.dismiss();
    setCategory("");
    setAmount("");
    setRerender(!rerender);
  };

  // const resetDatabase = () => {
  //   console.log("Resetting database");
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql("DROP TABLE IF EXISTS expenses;");
  //     },
  //     (error) => console.error("Error during database reset:", error),
  //     () => {
  //       console.log("Database reset successful");
  //       updateList();
  //     }
  //   );
  // };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "rgb(23,24,33)" }}>
      <HeaderRevealAnimation totalExpenses={totalExpenses} />
      {showAddExpenseForm && (
        <View style={styles.addExpenseContainer}>
          <Text style={styles.header}>Add {category} expenses</Text>
          <Input
            keyboardType="numeric"
            placeholder="Amount"
            onChangeText={(text) => {
              setAmount(parseFloat(text.replace(",", ".")));
            }}
            labelStyle={{ color: "white" }}
            inputStyle={{ color: "white" }}
          />
          <Button
            style={styles.button}
            title={"Add"}
            onPress={() => {
              setShowAddExpenseForm(!showAddExpenseForm);
              addExpense();
            }}
            color={"darkgreen"}
          />
        </View>
      )}
      <View style={styles.circleContainer}>
        <Pressable
          onPress={() => {
            setCategory("groceries");
            setShowAddExpenseForm(!showAddExpenseForm);
          }}
          style={styles.circle}
        >
          <Icon
            type="materialIcons"
            name="local-grocery-store"
            size={35}
            style={{ marginRight: 0 }}
            color={"white"}
          />
          <Text style={styles.circleText}>{groceriesTotal} €</Text>
        </Pressable>
        <Pressable
          style={styles.circle}
          onPress={() => {
            setCategory("car");
            setShowAddExpenseForm(!showAddExpenseForm);
          }}
        >
          <Icon
            type="antdesign"
            name="car"
            size={35}
            style={{ marginRight: 0 }}
            color={"white"}
          />
          <Text style={styles.circleText}>{carTotal} €</Text>
        </Pressable>
      </View>
      <View style={styles.circleContainer}>
        <Pressable
          style={styles.circle}
          onPress={() => {
            setCategory("clothing");
            setShowAddExpenseForm(!showAddExpenseForm);
          }}
        >
          <Ionicons
            name="shirt-sharp"
            size={35}
            style={{ marginRight: 0 }}
            color={"white"}
          />
          <Text style={styles.circleText}>{clothesTotal} €</Text>
        </Pressable>
        <Pressable
          style={styles.circle}
          onPress={() => {
            setCategory("living");
            setShowAddExpenseForm(!showAddExpenseForm);
          }}
        >
          <Icon
            type="materialicons"
            name="house"
            size={35}
            style={{ marginRight: 0 }}
            color={"white"}
          />
          <Text style={styles.circleText}>{livingTotal} €</Text>
        </Pressable>
      </View>
      <View style={styles.circleContainer}>
        <Pressable
          style={styles.circle}
          onPress={() => {
            setCategory("other");
            setShowAddExpenseForm(!showAddExpenseForm);
          }}
        >
          <Icon
            type="fontisto"
            name="question"
            size={35}
            style={{ marginRight: 0 }}
            color={"white"}
          />
          <Text style={styles.circleText}>{otherTotal} €</Text>
        </Pressable>
      </View>
    </ScrollView>
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
    marginTop: 10,
  },
  circleContainer: {
    flexDirection: "row",
  },
  addExpenseContainer: {
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
  button: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
