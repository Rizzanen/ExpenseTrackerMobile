import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Expense from "./components/Expense";
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

          if (route.name === "Expenses") {
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
        name="Expenses"
        component={Expense}
        options={{
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? "darkgreen" : color }}>
              Expense tracker
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
