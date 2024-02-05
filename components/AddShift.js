import { Text, View, StyleSheet } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("incomeExpense.db");

export default function AddShift({ route, navigation }) {
  const { employer } = route.params;
  const [allowance, setAllowance] = useState();
  const [allowanceHours, setAllowanceHours] = useState();
  const [hours, setHours] = useState();

  const addShift = () => {
    let newIncome;
    if (!allowance) {
      newIncome = parseFloat(employer.hourlyPay) * parseFloat(hours);
    } else {
      const amountOfAllowance =
        parseFloat(allowanceHours) *
        parseFloat(employer.hourlyPay) *
        (parseFloat(allowance) / 100);
      newIncome =
        parseFloat(employer.hourlyPay) * parseFloat(hours) + amountOfAllowance;
    }
    employer.currentMonthIncome = employer.currentMonthIncome + newIncome;
    employer.currentMonthWorkHourAmount =
      employer.currentMonthWorkHourAmount + parseFloat(hours);
    employer.currentMonthShiftAmount = employer.currentMonthShiftAmount + 1;

    db.transaction((tx) => {
      tx.executeSql(
        "update employers set currentMonthIncome = ?, currentMonthShiftAmount = ?, currentMonthWorkHourAmount = ? where id = ?;",
        [
          employer.currentMonthIncome.toFixed(2),
          employer.currentMonthShiftAmount,
          employer.currentMonthWorkHourAmount.toFixed(2),
          employer.id,
        ]
      );
    }, null);

    setHours();
    setAllowance();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgb(23,24,33)",
        alignItems: "center",
        paddingTop: "10%",
      }}
    >
      <Input
        label="Hours"
        placeholder="Hours"
        value={hours}
        onChangeText={(text) => setHours(text)}
        labelStyle={{ color: "white" }}
        inputStyle={{ color: "white" }}
        inputContainerStyle={{
          borderBottomColor: "darkgreen",
          borderBottomWidth: 2,
        }}
      />
      <Input
        label="Allowance Percent (optional)"
        placeholder="Allowance Percent"
        value={allowance}
        onChangeText={(text) => setAllowance(text)}
        labelStyle={{ color: "white" }}
        inputStyle={{ color: "white" }}
        inputContainerStyle={{
          borderBottomColor: "darkgreen",
          borderBottomWidth: 2,
        }}
      />
      <Input
        label="Allowance Hours (optional)"
        placeholder="Allowance hours"
        value={allowanceHours}
        onChangeText={(text) => setAllowanceHours(text)}
        labelStyle={{ color: "white" }}
        inputStyle={{ color: "white" }}
        inputContainerStyle={{
          borderBottomColor: "darkgreen",
          borderBottomWidth: 2,
        }}
      />
      <Button
        color={"darkgreen"}
        title={"Add"}
        onPress={() => {
          addShift();
          navigation.navigate("Back");
        }}
        containerStyle={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </View>
  );
}
