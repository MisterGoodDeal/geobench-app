import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useColorScheme, Image } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./src/store/store";
import { Provider } from "react-redux";

import { hp } from "./src/utils/functions";
import { Lang } from "./src/constants/Lang";
import { Colors } from "./src/constants/Colors";
import { SettingsStack } from "./src/screens/Settings/Settings.index";
import { CarteScreen } from "./src/screens/Carte.screen";
import { CommunauteScreen } from "./src/screens/Communaute.screen";
import { IndexScreens } from "./src/screens/Screens.index";
import { LoginScreen } from "./src/screens/Settings/Login.screen";
import { ForgotPasswordScreen } from "./src/screens/Settings/ForgotPassword.screen";
import { RegisterScreen } from "./src/screens/Settings/Register.screen";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"Index"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Index" component={IndexScreens} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ animationEnabled: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ animationEnabled: true }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ animationEnabled: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
