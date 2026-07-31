import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface DashboardLoaderProps {
  loading?: boolean;
  message?: string;
}

const DashboardLoader: React.FC<
  DashboardLoaderProps
> = ({
  loading = false,
  message = "Loading Dashboard...",
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

export default DashboardLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  message: {
    marginTop: 12,
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
    textAlign: "center",
  },
});