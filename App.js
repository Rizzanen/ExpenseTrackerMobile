import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Expense from "./components/Expense";
import Income from "./components/Income";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "darkgreen",
          tabBarIcon: ({ focused, color, size }) => {
            let iconComponent;

            if (route.name === "Income") {
              iconComponent = (
                <FontAwesome5 name="coins" size={size} color={color} />
              );
            } else if (route.name === "Expense") {
              iconComponent = (
                <FontAwesome5
                  name="money-check-alt"
                  size={size}
                  color={color}
                />
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
              <Text style={{ color: focused ? "darkgreen" : color }}>
                Income
              </Text>
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
      </Tab.Navigator>
    </NavigationContainer>
  );
}
