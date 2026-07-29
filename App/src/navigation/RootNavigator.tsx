import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import SplashScreen from "../features/splash/screens/SplashScreen";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

import type {
  RootStackParamList,
} from "./types";

const Stack =
  createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
        />

        <Stack.Screen
          name="Main"
          component={MainNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;