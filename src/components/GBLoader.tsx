import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";
import Spinner from "react-native-spinkit";
import { hp, wp } from "../utils/functions";

interface GBLoaderProps {
  visible: boolean;
  color: "blanc" | "noir";
}

export const GBLoader: React.FunctionComponent<GBLoaderProps> = ({
  visible,
  color,
}) => (
  <Spinner
    style={{
      position: "absolute",
      top: hp("5%"),
      alignSelf: "center",
      zIndex: 999,
    }}
    isVisible={visible}
    size={hp("4%")}
    type={"FadingCircleAlt"}
    color={color === "blanc" ? Colors.white : Colors.black}
  />
);

const styles = StyleSheet.create({});
