import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { AuthStackParamList } from "./types";

import LoginScreen from "../features/auth/screens/LoginScreen";
import OtpScreen from "../features/auth/screens/OtpScreen";
import ForgotPasswordScreen from "../features/auth/screens/ForgotPasswordScreen";

const Stack =
  createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Otp"
        component={OtpScreen}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;