import { Text, View } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("incomeExpense.db");

export default function AddShift({ route, navigation }) {
  const { employer } = route.params;
  const [allowance, setAllowance] = useState();
  const [allowanceHours, setAllowanceHours] = useState();
  const [hours, setHours] = useState();

  useEffect(() => {
    console.log(employer);
  }, []);

  const addShift = () => {
    let newIncome;
    if (!allowance) {
      console.log("without allowance");
      newIncome = parseFloat(employer.hourlyPay) * parseFloat(hours);
    } else {
      console.log("with allowance");
      const amountOfAllowance =
        parseFloat(allowanceHours) *
        parseFloat(employer.hourlyPay) *
        (parseFloat(allowance) / 100);
      console.log("amount of allowance" + amountOfAllowance);
      newIncome =
        parseFloat(employer.hourlyPay) * parseFloat(hours) + amountOfAllowance;
    }
    employer.currentMonthIncome = employer.currentMonthIncome + newIncome;
    employer.currentMonthWorkHourAmount =
      employer.currentMonthWorkHourAmount + parseFloat(hours);
    employer.currentMonthShiftAmount = employer.currentMonthShiftAmount + 1;

    console.log("did employer calues change?" + JSON.stringify(employer));

    db.transaction((tx) => {
      console.log("starting transaction");
      tx.executeSql(
        "update employers set currentMonthIncome = ?, currentMonthShiftAmount = ?, currentMonthWorkHourAmount = ? where id = ?;",
        [
          employer.currentMonthIncome.toFixed(2),
          employer.currentMonthShiftAmount,
          employer.currentMonthWorkHourAmount.toFixed(2),
          employer.id,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log("Update successful");
          } else {
            console.log("Update failed");
          }
        }
      );
    }, null);

    setHours();
    setAllowance();
  };
  return (
    <View style={{ flex: 1 }}>
      <Text>Add Shift</Text>
      <Input
        label="Hours"
        placeholder="Hours"
        value={hours}
        onChangeText={(text) => setHours(text)}
      />
      <Input
        label="Allowance Percent (optional)"
        placeholder="Allowance Percent"
        value={allowance}
        onChangeText={(text) => setAllowance(text)}
      />
      <Input
        label="Allowance Hours (optional)"
        placeholder="Allowance hours"
        value={allowanceHours}
        onChangeText={(text) => setAllowanceHours(text)}
      />
      <Button onPress={() => addShift()}>Add</Button>
    </View>
  );
}
