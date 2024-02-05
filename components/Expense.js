import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { SelectList } from "react-native-dropdown-select-list";

const db = SQLite.openDatabase("incomeExpense.db");

export default function Expense() {
  const categorys = ["Groceries", "Car", "Clothing", "Housing", "Other"];

  const [category, setCategory] = useState();
  const [amount, setAmount] = useState();
  const [totalExpenses, setTotalExpenses] = useState();
  const [groceriesTotal, setGroceriesTotal] = useState();
  const [carTotal, setCarTotal] = useState();
  const [clothesTotal, setClothesTotal] = useState();
  const [livingTotal, setLivingTotal] = useState();
  const [otherTotal, setOtherTotal] = useState();

  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists expenses (id integer primary key not null, category text, amount real );"
        );
      },
      () => console.error("Error when creating DB"),
      updateList
    );
  }, []);

  const updateList = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from expenses;", [], (_, { rows }) => {
          console.log(rows._array);
        });
      },
      null,
      null
    );
  };

  const addEmployer = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "insert into employers (name, currentMonthIncome, currentMonthShiftAmount, currentMonthWorkHourAmount, hourlyPay) values (?, ?, ?, ?, ?);",
        [
          employer.name,
          employer.currentMonthIncome,
          employer.currentMonthShiftAmount,
          employer.currentMonthWorkHourAmount,
          employer.hourlyPay,
        ]
      );
    }, null);
    setRenderer(!renderer);
    Keyboard.dismiss();
    setShowEmployerAddComponent(false);
    setEmployer({
      name: "",
      currentMonthIncome: 0.0,
      currentMonthShiftAmount: 0,
      currentMonthWorkHourAmount: 0.0,
      hourlyPay: "",
    });
  };

  const deleteItem = (id) => {
    Alert.alert("Confirm", "Are you sure you want to  delete the employer?", [
      {
        text: "Ok",
        onPress: () =>
          db.transaction(
            (tx) => tx.executeSql("delete from employers where id = ?;", [id]),
            null,
            updateList
          ),
      },
      {
        text: "Cancel",
      },
    ]);
  };
  // tee kulujen lisäys toiminto kun categorian palloa klikataan ja tee help nappi joka jossa lisäys ohjeet.
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "rgb(23,24,33)" }}>
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
});
