import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Expense from "./components/Expense";
import Income from "./components/Income";
import { FontAwesome5 } from "@expo/vector-icons";
import History from "./components/History";
import { Icon } from "@rneui/base";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "green",
        headerTintColor: "green",
        headerStyle: { backgroundColor: "rgb(23,24,33)" },
        tabBarStyle: { backgroundColor: "rgb(23,24,33)" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;

          if (route.name === "Income") {
            iconComponent = (
              <FontAwesome5 name="coins" size={size} color={color} />
            );
          } else if (route.name === "Expense") {
            iconComponent = (
              <FontAwesome5 name="money-check-alt" size={size} color={color} />
            );
          } else if (route.name === "History") {
            iconComponent = (
              <Icon type="material" name="history" size={size} color={color} />
            );
          }
          return iconComponent;
        },
      })}
    >
      <Tab.Screen
        name="Income"
        component={Income}
        options={{
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? "darkgreen" : color }}>Income</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Expense"
        component={Expense}
        options={{
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? "darkgreen" : color }}>
              Expenses
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? "darkgreen" : color }}>
              History
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
