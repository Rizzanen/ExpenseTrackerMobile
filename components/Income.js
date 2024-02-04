import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { Button, Icon, Input } from "@rneui/themed";
import * as SQLite from "expo-sqlite";
import { useIsFocused } from "@react-navigation/native";

const db = SQLite.openDatabase("incomeExpense.db");

export default function Income({ navigation }) {
  const isFocused = useIsFocused();

  const [deductions, setDeductions] = useState(10.65);
  const [netTotal, setNetTotal] = useState(0.0);
  const [total, setTotal] = useState(0);
  const [employers, setEmployers] = useState([]);
  const [employer, setEmployer] = useState({
    name: "",
    currentMonthIncome: 0.0,
    currentMonthShiftAmount: 0,
    currentMonthWorkHourAmount: 0.0,
    hourlyPay: "",
  });
  const [renderer, setRenderer] = useState(false);
  const [showEmployerAddComponent, setShowEmployerAddComponent] =
    useState(false);

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists employers (id integer primary key not null, name text, currentMonthIncome real, currentMonthShiftAmount int, currentMonthWorkHourAmount real, hourlyPay real );"
        );
      },
      () => console.error("Error when creating DB"),
      updateList
    );
  }, [renderer]);

  useEffect(() => {
    if (isFocused) {
      updateList();
    }
  }, [isFocused]);

  const updateList = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from employers;", [], (_, { rows }) => {
          setEmployers(rows._array);
          let totalIncome = 0.0;
          rows._array.forEach((rowObject) => {
            totalIncome += parseFloat(rowObject.currentMonthIncome);
          });
          let net = totalIncome * ((100 - deductions) / 100);
          setTotal(totalIncome);
          setNetTotal(net);
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

  // const resetDatabase = () => {
  //   console.log("Resetting the database");
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql("DROP TABLE IF EXISTS employer;");
  //     },
  //     (error) => console.error("Error during database reset:", error),
  //     () => {
  //       console.log("Database reset successful");
  //       updateList();
  //     }
  //   );
  // };

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(23,24,33)" }}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Gross income: {total.toFixed(2)} €</Text>
      </View>
      <View style={styles.employerHeaderContainer}>
        <Text style={styles.header}>Net income: {netTotal.toFixed(2)} €</Text>
      </View>

      <View style={styles.employerHeaderContainer}>
        <Text style={styles.header}>Employers</Text>
        <Icon
          type="entypo"
          name="circle-with-plus"
          size={35}
          style={{ marginRight: 20 }}
          color={"white"}
          onPress={() => setShowEmployerAddComponent(!showEmployerAddComponent)}
        />
      </View>

      {showEmployerAddComponent && (
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Input
            placeholder="Employer name"
            label="Employer name"
            value={employer.name}
            onChangeText={(text) => setEmployer({ ...employer, name: text })}
            labelStyle={{ color: "white" }}
          />
          <Input
            placeholder="Hourly pay"
            label="Hourly pay"
            value={employer.hourlyPay}
            onChangeText={(text) =>
              setEmployer({ ...employer, hourlyPay: parseFloat(text) })
            }
            labelStyle={{ color: "white" }}
          />
          <Button
            color={"darkgreen"}
            title={"Add"}
            containerStyle={{
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onPress={() => {
              addEmployer();
              setShowEmployerAddComponent(false);
            }}
          />
        </View>
      )}

      <FlatList
        data={employers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.employerView}
            onLongPress={() => deleteItem(item.id)}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.itemNameText}>{item.name}</Text>
              <Text style={styles.shiftAmountText}>
                {item.currentMonthShiftAmount} Shifts
              </Text>
              <Text style={styles.currentMonthHoursText}>
                {item.currentMonthWorkHourAmount} hours
              </Text>
              <Text style={styles.currentMonthIncomeText}>
                Total: {item.currentMonthIncome} €
              </Text>
            </View>
            <View style={styles.employerContainer}>
              <Button
                color={"darkgreen"}
                onPress={() => {
                  navigation.navigate("AddShift", { employer: item });
                }}
              >
                Add shift
              </Button>
            </View>
          </Pressable>
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
  },
  headerContainer: {
    marginTop: 10,
    backgroundColor: "rgb(32, 41, 54)",
    paddingBottom: 10,
    paddingTop: 10,
    borderColor: "darkgreen",
    borderWidth: 2,
    marginBottom: 5,
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
