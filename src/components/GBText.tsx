import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Colors";
import { hp } from "../utils/functions";

interface GBTextProps {
  children: string | undefined;
  size: string;
  color?: string;
  align?: "left" | "center" | "right" | "justify";
  transform?: "capitalize" | "uppercase" | "lowercase";
  style:
    | "thin"
    | "extra-light"
    | "light"
    | "regular"
    | "medium"
    | "semi-bold"
    | "bold"
    | "extra-bold"
    | "black";
}

export const GBText: React.FunctionComponent<GBTextProps> = ({
  children,
  size,
  color,
  style,
  align,
  transform,
}) => (
  <Text
    style={[
      { fontSize: hp(size) },
      { color: color !== undefined ? color : Colors.black },
      { textAlign: align !== undefined ? align : undefined },
      { textTransform: transform !== undefined ? transform : undefined },
      {
        fontFamily:
          style === "thin"
            ? "Poppins-Thin"
            : style === "extra-light"
            ? "Poppins-ExtraLight"
            : style === "light"
            ? "Poppins-Light"
            : style === "regular"
            ? "Poppins-Regular"
            : style === "medium"
            ? "Poppins-Medium"
            : style === "semi-bold"
            ? "Poppins-SemiBold"
            : style === "bold"
            ? "Poppins-Bold"
            : style === "extra-bold"
            ? "Poppins-ExtraBold"
            : style === "black"
            ? "Poppins-Black"
            : undefined,
      },
    ]}
  >
    {children === undefined ? "" : children}
  </Text>
);

const styles = StyleSheet.create({});
