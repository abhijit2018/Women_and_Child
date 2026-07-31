import { NavigationContainer } from "@react-navigation/native";

import { useAppSelector } from "@/hooks";
import { selectIsAuthenticated } from "../features/auth/authSelectors";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

const AppNavigator = () => {
  const isAuthenticated = useAppSelector(
    selectIsAuthenticated
  );

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;