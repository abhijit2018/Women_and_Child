import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import type { ForgotPasswordScreenProps } from "../../../navigation/types";

const ForgotPasswordScreen = ({
  navigation,
}: ForgotPasswordScreenProps) => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!userName.trim()) {
      Alert.alert(
        "Validation",
        "Please enter your User Name or Email."
      );
      return;
    }

    try {
      setLoading(true);

      // TODO:
      // await dispatch(
      //   forgotPassword({
      //     user_name: userName,
      //   })
      // );

      Alert.alert(
        "Success",
        "Password reset instructions have been sent."
      );

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error",
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Forgot Password
      </Text>

      <Text style={styles.subtitle}>
        Enter your User Name or Email to receive password reset instructions.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="User Name / Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={userName}
        onChangeText={setUserName}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleForgotPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>
            Send Reset Link
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    height: 55,
    borderRadius: 10,
    backgroundColor: "#1976D2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  backText: {
    textAlign: "center",
    color: "#1976D2",
    fontSize: 16,
  },
});