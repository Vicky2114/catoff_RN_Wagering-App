// navigation/MainStack.js
import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import HomeScreen from "../Screens/Main/HomeScreen";
import GameDetailScreen from "../Screens/Main/GameDetailScreen";
import GameDashboardScreen from "../Screens/Main/GameDashboardScreen";
import MoreChallenges from "../Screens/Main/MoreChallenges";
import BottomTabStack from "./BottomTabStack";

const Stack = createStackNavigator();

const MainStack = () => {
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
      {/* <Stack.Screen name="BottomTab" component={BottomTabStack} /> */}
      <Stack.Screen
        name="BottomTab"
        component={BottomTabStack}
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

      {/* <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "" }}
      /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
