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
import Swipeable from "react-native-gesture-handler/Swipeable";

const db = SQLite.openDatabase("incomeExpense.db");

export default function Income({ navigation }) {
  const [total, setTotal] = useState(0);
  const [employers, setEmployers] = useState([]);
  const [name, setName] = useState("");
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0.0);
  const [currentMonthShiftAmount, setCurrentMonthShiftAmount] = useState(0);
  const [currentMonthWorkHourAmount, setCurrentMonthWorkHourAmount] =
    useState(0.0);
  const [totalIncome, setTotalIncome] = useState(0.0);
  const [totalShifts, setTotalShifts] = useState(0);
  const [hourlyPay, setHourlyPay] = useState();
  const [renderer, setRenderer] = useState(false);
  const [showEmployerAddComponent, setShowEmployerAddComponent] =
    useState(false);

  useEffect(() => {
    console.log("useEffect executed");
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists employers (id integer primary key not null, name text, currentMonthIncome real, currentMonthShiftAmount int, currentMonthWorkHourAmount real, totalIncome real, totalShifts int, hourlyPay real );"
        );
      },
      () => console.error("Error when creating DB"),
      updateList
    );
  }, [renderer]);

  const updateList = () => {
    console.log("Update executed");
    db.transaction(
      (tx) => {
        tx.executeSql("select * from employers;", [], (_, { rows }) => {
          setEmployers(rows._array);
        });
      },
      null,
      null
    );
  };

  const saveItem = () => {
    console.log("saveItem was excecuted");
    db.transaction((tx) => {
      tx.executeSql(
        "insert into employers (name, currentMonthIncome, currentMonthShiftAmount, currentMonthWorkHourAmount, totalIncome, totalShifts, hourlyPay) values (?, ?, ?, ?, ?, ?, ?);",
        [
          name,
          currentMonthIncome,
          currentMonthShiftAmount,
          currentMonthWorkHourAmount,
          totalIncome,
          totalShifts,
          hourlyPay,
        ]
      );
    }, null);
    setRenderer(!renderer);
    Keyboard.dismiss();
    setShowEmployerAddComponent(false);
    setName("");
    setHourlyPay(0.0);
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
          onPress={() => setShowEmployerAddComponent(true)}
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
            value={name}
            onChangeText={(text) => setName(text)}
            labelStyle={{ color: "green" }}
          />
          <Input
            placeholder="Hourly pay"
            label="Hourly pay"
            value={hourlyPay}
            onChangeText={(text) => setHourlyPay(parseFloat(text))}
            labelStyle={{ color: "green" }}
          />
          <Button
            color={"green"}
            title={"Add"}
            containerStyle={{
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onPress={() => {
              saveItem();
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
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 30,
                  color: "white",
                }}
              >
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    marginTop: 10,
                  }}
                  onPress={() => navigation.navigate("EmployerInfo")} // Fix the typo here
                >
                  More info
                </Text>
                <Icon
                  type="antdesign"
                  name="arrowright"
                  size={15}
                  style={{
                    marginRight: 20,
                    marginTop: 10,
                  }}
                  color={"white"}
                  onPress={() => navigation.navigate("EmployerInfo")}
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
                  onPress={() => navigation.navigate("AddShift")}
                >
                  Add shift
                </Text>
              </View>
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
    marginTop: 10,
    marginBottom: 10,
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
    flex: 1,
  },
});
