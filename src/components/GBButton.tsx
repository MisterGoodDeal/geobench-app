import * as React from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors } from "../constants/Colors";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { sizes } from "@constants/Sizes";
import { Container } from "@mistergooddeal/rn-components";

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
  icon?: ImageSourcePropType;
}

export const GBButton: React.FunctionComponent<GBButtonProps> = ({
  onPress,
  children,
  disable,
  position,
  width,
  margins,
  color,
  icon,
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
      { alignItems: "center", justifyContent: "center" },
    ]}
    disabled={disable === null ? false : disable}
  >
    {icon && (
      <Container direction="row" justifyContent="space-between">
        <Image
          source={icon}
          style={{
            width: hp("2.5%"),
            height: hp("2.5%"),
            marginRight: wp("2%"),
          }}
        />
        <Text style={styles.appButtonText}>{children}</Text>
      </Container>
    )}
    {!icon && <Text style={styles.appButtonText}>{children}</Text>}
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
    fontSize: hp(sizes.texts.buttons),
    color: Colors.white,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
});
