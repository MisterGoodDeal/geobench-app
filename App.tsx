import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useColorScheme, Image } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { store } from "./src/store/store";
import { Provider } from "react-redux";

import { TemplateScreen } from "./src/screens/Template.screen";
import { hp } from "./src/utils/functions";
import { Lang } from "./src/constants/Lang";
import { Colors } from "./src/constants/Colors";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{ showLabel: false }}>
          <Tab.Screen
            name="Home"
            component={TemplateScreen}
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
                  source={require("./src/assets/images/navigation/home.png")}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
