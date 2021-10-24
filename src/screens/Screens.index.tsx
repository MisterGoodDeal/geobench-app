import * as React from "react";
import { Image } from "react-native";
import { Colors, ColorsDark } from "@constants/Colors";
import { Lang } from "@constants/Lang";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { hp, wp } from "@mistergooddeal/rn-components";
import { CarteScreen } from "./Carte.screen";
import { CommunauteScreen } from "./Communaute.screen";
import { SettingsStack } from "./Settings/Settings.index";
import { useSelector } from "react-redux";
import { userSelector } from "@store/slices/userSlice";
import { ifIphoneX } from "react-native-iphone-x-helper";

export const IndexScreens: React.FunctionComponent<null> = () => {
  const Tab = createBottomTabNavigator();
  const { darkMode } = useSelector(userSelector);

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: darkMode ? ColorsDark.bottomTabBar : "white",
          position: "absolute",
          bottom: hp("1.5%"),
          left: wp("5%"),
          right: wp("5%"),
          borderRadius: 50,
          height: hp("7%"),
          shadowColor: "#000",
          borderTopWidth: 0,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 3,

          elevation: 3,
        },
      }}
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
                ...ifIphoneX({
                  top: 15,
                }),
                width: hp("4%"),
                height: hp("4%"),
                tintColor: focused
                  ? Colors.navigation.focus
                  : darkMode
                  ? Colors.darkGrey
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
                ...ifIphoneX({
                  top: 15,
                }),
                width: hp("4%"),
                height: hp("4%"),
                tintColor: focused
                  ? Colors.navigation.focus
                  : darkMode
                  ? Colors.darkGrey
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
                ...ifIphoneX({
                  top: 15,
                }),
                alignSelf: "center",
                width: hp("4%"),
                height: hp("4%"),
                tintColor: focused
                  ? Colors.navigation.focus
                  : darkMode
                  ? Colors.darkGrey
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
