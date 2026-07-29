import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import Ionicons from "react-native-vector-icons/Ionicons";

import DashboardScreen from "../features/dashboard/screens/DashboardScreen";
// import UsersScreen from "../features/users/screens/UsersScreen";
// import ProfileScreen from "../features/profile/screens/ProfileScreen";
// import SettingsScreen from "../features/settings/screens/SettingsScreen";

export type DrawerParamList = {
  Dashboard: undefined;
  Users: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    // <Drawer.Navigator
    //   initialRouteName="Dashboard"
    //   screenOptions={{
    //     headerShown: true,
    //     drawerType: "front",
    //     drawerActiveTintColor: "#1976D2",
    //     drawerInactiveTintColor: "#666",
    //   }}
    // >
      {/* <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      /> */}

      // <Drawer.Screen
      //   name="Users"
      //   component={UsersScreen}
      //   options={{
      //     drawerIcon: ({ color, size }) => (
      //       <Ionicons
      //         name="people-outline"
      //         size={size}
      //         color={color}
      //       />
      //     ),
      //   }}
      // />

      // <Drawer.Screen
      //   name="Profile"
      //   component={ProfileScreen}
      //   options={{
      //     drawerIcon: ({ color, size }) => (
      //       <Ionicons
      //         name="person-outline"
      //         size={size}
      //         color={color}
      //       />
      //     ),
      //   }}
      // />

      // <Drawer.Screen
      //   name="Settings"
      //   component={SettingsScreen}
      //   options={{
      //     drawerIcon: ({ color, size }) => (
      //       <Ionicons
      //         name="settings-outline"
      //         size={size}
      //         color={color}
      //       />
      //     ),
      //   }}
      // />
    // </Drawer.Navigator>
  );
};

export default DrawerNavigator;