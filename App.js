import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./Tabnavigator";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "green",
          headerStyle: { backgroundColor: "rgb(23,24,33)" },
        }}
      >
        <Stack.Screen
          name="Back"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="AddShift" component={AddShift} />
        <Stack.Screen name="EmployerInfo" component={EmployerInfo} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
