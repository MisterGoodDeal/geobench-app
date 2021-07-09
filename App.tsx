import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./src/store/store";
import { Provider } from "react-redux";

import { IndexScreens } from "./src/screens/Screens.index";
import { LoginScreen } from "./src/screens/Settings/Login.screen";
import { ForgotPasswordScreen } from "./src/screens/Settings/ForgotPassword.screen";
import { RegisterScreen } from "./src/screens/Settings/Register.screen";
import { localStorage } from "./src/services/localStorage.service";

import { AppearanceProvider, useColorScheme } from "react-native-appearance";

import Toast from "react-native-toast-message";

import linking from "./src/linking";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  React.useEffect(() => {
    (async () => {
      const darkMode = await localStorage.get("darkMode");
      if (darkMode === "") {
        localStorage.store("darkMode", "false");
      }
    })();

    console.log(isDarkMode);
  }, [isDarkMode]);
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
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
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
