import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import DashboardScreen from "../features/dashboard/screens/DashboardScreen";
import UsersScreen from "../features/users/screens/UsersScreen";
import ProfileScreen from "../features/profile/screens/ProfileScreen";
import SettingsScreen from "../features/settings/screens/SettingsScreen";

export type BottomTabParamList = {
  Dashboard: undefined;
  Users: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab =
  createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",

        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          switch (route.name) {
            case "Dashboard":
              iconName = "home";
              break;

            case "Users":
              iconName = "people";
              break;

            case "Profile":
              iconName = "person";
              break;

            case "Settings":
              iconName = "settings";
              break;

            default:
              iconName = "ellipse";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
      />

      <Tab.Screen
        name="Users"
        component={UsersScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;