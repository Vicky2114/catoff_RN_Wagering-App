import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import LoginScreen from "../Onboarding/LoginScreen";
import SignupScreen from "../Onboarding/SignupScreen";
import HomeScreen from "./HomeScreen";
import GameDetailScreen from "./GameDetailScreen";
import GameDashboardScreen from "./GameDashboardScreen";
import MoreChallenges from "./MoreChallenges";

// Main navigation stack
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
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
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="GameDetail"
          component={GameDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GameDashboard"
          component={GameDashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MoreChallenges"
          component={MoreChallenges}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
