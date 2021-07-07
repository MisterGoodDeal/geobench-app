import * as React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";

interface GBKeyboardDismissProps {
  children: any;
}

export const GBKeyboardDismiss: React.FunctionComponent<GBKeyboardDismissProps> =
  ({ children }) => (
    <TouchableWithoutFeedback
      style={{ height: "100%" }}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={{ height: "100%" }}>{children}</View>
    </TouchableWithoutFeedback>
  );

const styles = StyleSheet.create({});
