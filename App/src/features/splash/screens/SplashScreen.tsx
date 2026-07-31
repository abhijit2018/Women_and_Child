import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../navigation/types";

import AppLogo from "../components/AppLogo";
import SplashLoader from "../components/SplashLoader";
import useSplash from "../hooks/useSplash";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Splash"
>;

const SplashScreen: React.FC<Props> = ({
  navigation,
}) => {
  const {
    initialize,
    loading,
  } = useSplash();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const result = await initialize();

      if (result.isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "Main",
            },
          ],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "Auth",
            },
          ],
        });
      }
    } catch (error) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Auth",
          },
        ],
      });
    }
  };

  return (
    <View style={styles.container}>
      <AppLogo />

      <SplashLoader
        loading={loading}
        message="Initializing Application..."
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
});