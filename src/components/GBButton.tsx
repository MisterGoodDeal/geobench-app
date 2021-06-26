import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface ButtonMargin {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface GBButtonProps {
  onPress: () => void;
  children: string | any[];
  disable?: boolean;
  position?: "normal" | "fixed";
  width?: number;
  margins?: ButtonMargin;
  color?: string;
}

export const GBButton: React.FunctionComponent<GBButtonProps> = ({
  onPress,
  children,
  disable,
  position,
  width,
  margins,
  color,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      position === null
        ? styles.appButtonContainer
        : position === "fixed"
        ? styles.appButtonContainerFixed
        : styles.appButtonContainer,
      { opacity: disable === null ? 1 : disable === true ? 0.5 : 1 },
      { zIndex: 99 },
      { width: width ? width : wp("70%") },
      { marginTop: margins?.top },
      { marginBottom: margins?.bottom },
      { marginLeft: margins?.left },
      { marginRight: margins?.right },
      { backgroundColor: color === undefined ? Colors.main : color },
    ]}
    disabled={disable === null ? false : disable}
  >
    <Text style={styles.appButtonText}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    borderRadius: 50,
    paddingVertical: 15,
    textAlign: "center",
  },
  appButtonContainerFixed: {
    position: "absolute",
    top: -30,
    backgroundColor: Colors.white,
    borderRadius: 50,
    paddingVertical: 15,
  },
  appButtonText: {
    fontSize: hp("2%"),
    color: Colors.white,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
});
