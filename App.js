import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Income from "./components/Income";
import AddShift from "./components/AddShift";
import EmployerInfo from "./components/EmployerInfo";
import TabNavigator from "./Tabnavigator";
import AddEmployer from "./components/AddEmployer";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTintColor: "green" }}>
        <Stack.Screen
          name="Back"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddShift" component={AddShift} />
        <Stack.Screen name="EmployerInfo" component={EmployerInfo} />
        <Stack.Screen name="AddEmployer" component={AddEmployer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
