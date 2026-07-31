import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  DashboardMenu as DashboardMenuType,
} from "../dashboardTypes";

interface DashboardMenuProps {
  menus: DashboardMenuType[];
  onPress?: (menu: DashboardMenuType) => void;
}

const DashboardMenu: React.FC<DashboardMenuProps> = ({
  menus,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={menus}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.menuItem}
            onPress={() => onPress?.(item)}
          >
            <Text style={styles.menuTitle}>
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default DashboardMenu;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  list: {
    paddingHorizontal: 16,
  },

  menuItem: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 110,
  },

  menuTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});