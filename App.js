import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "./navigation/MainStack";
import AuthStack from "./navigation/AuthStack";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider, useAuth } from "./context/AuthContext";

const RootStack = createStackNavigator();

const App = () => {
  const { user, checkAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      await checkAuth();
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    return null; // Render loading indicator or splash screen
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <>
              <RootStack.Screen name="Main" component={MainStack} />
              {/* <RootStack.Screen name="BottomTab" component={BottomTabStack} /> */}
            </>
          ) : (
            <RootStack.Screen name="Auth" component={AuthStack} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
