import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsLandingScreen } from "./Landing.screen";

export const SettingsStack: React.FunctionComponent<null> = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={"Landing"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Landing" component={SettingsLandingScreen} />
    </Stack.Navigator>
  );
};
