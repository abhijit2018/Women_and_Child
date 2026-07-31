import React, {
  useCallback,
  useEffect,
} from "react";

import {
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";

import DashboardHeader from "../components/DashboardHeader";
import DashboardGrid from "../components/DashboardGrid";
import DashboardLoader from "../components/DashboardLoader";
import DashboardMenu from "../components/DashboardMenu";

import useDashboard from "../hooks/useDashboard";

import {
  DashboardCard,
  DashboardMenu as DashboardMenuType,
} from "../dashboardTypes";

const DashboardScreen: React.FC = () => {
  const {
    loading,
    title,
    cards,
    menus,
    load,
  } = useDashboard();

  const initialize = useCallback(async () => {
    try {
      await load();
    } catch (error) {
      console.log("Dashboard Error:", error);
    }
  }, [load]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleCardPress = (
    item: DashboardCard
  ) => {
    Alert.alert(item.title, item.value);
  };

  const handleMenuPress = (
    menu: DashboardMenuType
  ) => {
    Alert.alert(menu.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DashboardLoader
        loading={loading}
      />

      {!loading && (
        <>
          <DashboardHeader
            title={title}
            subtitle="Have a great day!"
          />

          <DashboardGrid
            data={cards}
            onCardPress={
              handleCardPress
            }
          />

          <DashboardMenu
            menus={menus}
            onPress={
              handleMenuPress
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
});