import * as React from "react";
import { FlexAlignType, SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

interface GGTemplateProps {
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
}

export const Container: React.FunctionComponent<GGTemplateProps> = ({
  flex,
  color,
  children,
  alignItems,
  justifyContent,
  direction,
}) => (
  <SafeAreaView
    style={[
      { flex: flex !== undefined ? flex : undefined },
      { backgroundColor: color !== undefined ? color : Colors.white },
      { alignItems: alignItems !== undefined ? alignItems : undefined },
      {
        justifyContent:
          justifyContent !== undefined ? justifyContent : undefined,
      },
      { flexDirection: direction !== undefined ? direction : undefined },
    ]}
  >
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({});
