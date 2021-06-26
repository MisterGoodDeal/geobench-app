import * as React from "react";
import { ViewStyle } from "react-native";
import {
  FlexAlignType,
  SafeAreaView,
  StyleProp,
  StyleSheet,
} from "react-native";
import { Colors } from "../constants/Colors";

interface GBContainerProps {
  flex?: number;
  color?: string;
  children: any;
  alignItems?: FlexAlignType;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  direction?: "row" | "column" | "row-reverse" | "column-reverse" | undefined;
  extraStyle?: ViewStyle;
}

export const GBContainer: React.FunctionComponent<GBContainerProps> = ({
  flex,
  color,
  children,
  alignItems,
  justifyContent,
  direction,
  extraStyle,
}) => (
  <SafeAreaView
    style={[
      { flex: flex !== undefined ? flex : undefined },
      { backgroundColor: color !== undefined ? color : Colors.transparent },
      { alignItems: alignItems !== undefined ? alignItems : undefined },
      {
        justifyContent:
          justifyContent !== undefined ? justifyContent : undefined,
      },
      { flexDirection: direction !== undefined ? direction : undefined },
      extraStyle,
    ]}
  >
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({});
