import { hp } from "@mistergooddeal/rn-components";
import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";

interface GBCloseProps {
  onPress: () => void;
}

export const GBClose: React.FunctionComponent<GBCloseProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      position: "absolute",
      top: hp("4%"),
      left: hp("2%"),
      zIndex: 99,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
    }}
  >
    <Image
      source={require("../assets/images/close.png")}
      style={{
        width: hp("2.5%"),
        height: hp("2.5%"),
        tintColor: Colors.main,
      }}
    />
  </TouchableOpacity>
);
