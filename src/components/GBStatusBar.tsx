import * as React from "react";
import { StatusBar } from "react-native";

interface GBStatusBarProps {
  color: string;
  textColor: "dark-content" | "light-content";
}

export const GBStatusBar: React.FunctionComponent<GBStatusBarProps> = ({
  color,
  textColor,
}) => (
  <StatusBar backgroundColor={color} translucent={true} barStyle={textColor} />
);
