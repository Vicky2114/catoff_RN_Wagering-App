// navigation/AuthStack.js
import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import LoginScreen from "../Screens/Onboarding/LoginScreen";
import SignupScreen from "../Screens/Onboarding/SignupScreen";


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "" }}
      />
      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "" }}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
