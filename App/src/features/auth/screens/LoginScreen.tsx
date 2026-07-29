import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";

import { Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import LoginForm from "../components/LoginForm";

type RootStackParamList = {
  Login: undefined;
  Otp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {

  const handleLoginSuccess = () => {
    // Navigate after successful login
    navigation.navigate("Otp");
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}

          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Welcome Text */}

          <Text
            variant="headlineMedium"
            style={styles.title}
          >
            Welcome Back
          </Text>

          <Text
            variant="bodyMedium"
            style={styles.subtitle}
          >
            Login to continue
          </Text>

          {/* Login Form */}

          <LoginForm
            onSuccess={handleLoginSuccess}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  logo: {
    width: 140,
    height: 140,
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
});