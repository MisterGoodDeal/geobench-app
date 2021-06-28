import * as React from "react";
import { Image } from "react-native";
import { Colors } from "../constants/Colors";
import { Lang } from "../constants/Lang";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { hp } from "../utils/functions";
import { CarteScreen } from "./Carte.screen";
import { CommunauteScreen } from "./Communaute.screen";
import { SettingsStack } from "./Settings/Settings.index";

export const IndexScreens: React.FunctionComponent<null> = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{ showLabel: false }}
      initialRouteName={"Map"}
    >
      <Tab.Screen
        name="Communaute"
        component={CommunauteScreen}
        options={{
          tabBarLabel: Lang.navigation.home,
          tabBarIcon: ({ color, focused }) => (
            <Image
              style={{
                width: hp("4%"),
                height: hp("4%"),
                tintColor: focused
                  ? Colors.navigation.focus
                  : Colors.navigation.unfocus,
              }}
              source={require("../assets/images/navigation/community.png")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={CarteScreen}
        options={{
          tabBarLabel: Lang.navigation.home,
          tabBarIcon: ({ color, focused }) => (
            <Image
              style={{
                width: hp("4%"),
                height: hp("4%"),
                tintColor: focused
                  ? Colors.navigation.focus
                  : Colors.navigation.unfocus,
              }}
              source={require("../assets/images/navigation/map.png")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarLabel: Lang.navigation.home,
          tabBarIcon: ({ color, focused }) => (
            <Image
              style={{
                width: hp("4%"),
                height: hp("4%"),
                tintColor: focused
                  ? Colors.navigation.focus
                  : Colors.navigation.unfocus,
              }}
              source={require("../assets/images/navigation/settings.png")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};