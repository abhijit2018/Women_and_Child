import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

interface SplashLoaderProps {
  loading?: boolean;
  message?: string;
}

const SplashLoader: React.FC<SplashLoaderProps> = ({
  loading = true,
  message = "Loading...",
}) => {
  if (!loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#2563EB"
      />

      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
};

export default SplashLoader;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  message: {
    marginTop: 12,
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
});