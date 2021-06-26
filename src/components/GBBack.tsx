import * as React from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Colors } from "../constants/Colors";
import { hp } from "../utils/functions";
import { GBImage } from "./GBImage";

interface GBBackProps {
  onPress: () => void;
}

export const GBBack: React.FunctionComponent<GBBackProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.back}>
    <GBImage
      source={require("../assets/images/navigation/back.png")}
      size={"2.5%"}
      tint={Colors.main}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  back: {
    position: "absolute",
    top: Platform.OS === "ios" ? hp("7%") : hp("2%"),
    left: hp("2%"),
  },
});
