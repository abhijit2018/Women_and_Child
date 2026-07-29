import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { DashboardCard as DashboardCardType } from "../dashboardTypes";

interface DashboardCardProps {
  item: DashboardCardType;
  onPress?: (item: DashboardCardType) => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.card,
        item.color
          ? {
              borderLeftColor: item.color,
            }
          : null,
      ]}
      onPress={() => onPress?.(item)}
    >
      <View style={styles.content}>
        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.value}>
          {item.value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderLeftWidth: 6,
    borderLeftColor: "#2563EB",
    padding: 18,
    marginVertical: 8,
    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  content: {
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },

  value: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },
});