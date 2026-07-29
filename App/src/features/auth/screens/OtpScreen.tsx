import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import type { OtpScreenProps } from "../../../navigation/types";

const OtpScreen = ({
  navigation,
  route,
}: OtpScreenProps) => {
  const [otp, setOtp] = useState("");

  const userName = route.params?.user_name ?? "";

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert(
        "Validation",
        "Please enter a valid 6-digit OTP."
      );
      return;
    }

    console.log("User:", userName);
    console.log("OTP:", otp);

    // TODO:
    // await dispatch(
    //   verifyOtp({
    //     user_name: userName,
    //     otp,
    //   })
    // );

    Alert.alert(
      "Success",
      "OTP Verified Successfully."
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        OTP Verification
      </Text>

      <Text style={styles.subtitle}>
        Enter the OTP sent to your registered mobile or email.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter 6-digit OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerify}
      >
        <Text style={styles.buttonText}>
          Verify OTP
        </Text>
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

export default OtpScreen;

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
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 55,
    fontSize: 18,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#1976D2",
    height: 55,
    borderRadius: 10,
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