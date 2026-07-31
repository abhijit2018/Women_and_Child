import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";

const AppLogo: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}

      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* App Name */}

      <Text style={styles.title}>
        My Application
      </Text>

      {/* Tag Line */}

      <Text style={styles.subtitle}>
        Welcome
      </Text>
    </View>
  );
};

export default AppLogo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 140,
    height: 140,
  },

  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748B",
  },
});