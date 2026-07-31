import React from "react";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import DrawerNavigator from "./DrawerNavigator";

import type {
  MainStackParamList,
} from "./types";

const Stack =
  createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {/* <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
      /> */}

      {/*
      Future Screens

      <Stack.Screen
        name="Details"
        component={DetailsScreen}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
      */}
    </Stack.Navigator>
  );
};

export default MainNavigator;