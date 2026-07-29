import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import DashboardCard from "./DashboardCard";
import { DashboardCard as DashboardCardType } from "../dashboardTypes";

interface DashboardGridProps {
  data: DashboardCardType[];
  onCardPress?: (item: DashboardCardType) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  data,
  onCardPress,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <DashboardCard
            item={item}
            onPress={onCardPress}
          />
        </View>
      )}
    />
  );
};

export default DashboardGrid;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  row: {
    justifyContent: "space-between",
  },

  item: {
    flex: 1,
    marginHorizontal: 6,
  },
});