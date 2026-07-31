import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import type {
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";

import type {
  DrawerScreenProps,
} from "@react-navigation/drawer";

//
// ==============================
// Auth Stack
// ==============================
//

export type AuthStackParamList = {
  Login: undefined;

  Otp: {
    user_name: string;
  };

  ForgotPassword: undefined;
};

//
// ==============================
// Bottom Tabs
// ==============================
//

export type BottomTabParamList = {
  Dashboard: undefined;

  Users: undefined;

  Profile: undefined;

  Settings: undefined;
};

//
// ==============================
// Drawer
// ==============================
//

export type DrawerParamList = {
  Dashboard: undefined;

  Users: undefined;

  Profile: undefined;

  Settings: undefined;
};

//
// ==============================
// Main Stack
// ==============================
//

export type MainStackParamList = {
  Drawer: undefined;

  BottomTabs: undefined;

  Details: {
    id: string;
    title?: string;
  };
};

//
// ==============================
// Root Stack
// ==============================
//

export type RootStackParamList = {
  Splash: undefined;

  Auth: undefined;

  Main: undefined;
};

//
// ==============================
// Screen Props
// ==============================
//

// Auth Screens

export type LoginScreenProps =
  NativeStackScreenProps<
    AuthStackParamList,
    "Login"
  >;

export type OtpScreenProps =
  NativeStackScreenProps<
    AuthStackParamList,
    "Otp"
  >;

export type ForgotPasswordScreenProps =
  NativeStackScreenProps<
    AuthStackParamList,
    "ForgotPassword"
  >;

// Main Stack

export type DetailsScreenProps =
  NativeStackScreenProps<
    MainStackParamList,
    "Details"
  >;

// Bottom Tabs

export type DashboardTabProps =
  BottomTabScreenProps<
    BottomTabParamList,
    "Dashboard"
  >;

export type UsersTabProps =
  BottomTabScreenProps<
    BottomTabParamList,
    "Users"
  >;

export type ProfileTabProps =
  BottomTabScreenProps<
    BottomTabParamList,
    "Profile"
  >;

export type SettingsTabProps =
  BottomTabScreenProps<
    BottomTabParamList,
    "Settings"
  >;

// Drawer

export type DashboardDrawerProps =
  DrawerScreenProps<
    DrawerParamList,
    "Dashboard"
  >;

//
// ==============================
// Navigation Props
// ==============================
//

export type AuthNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

export type MainNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;