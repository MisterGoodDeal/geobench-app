import * as React from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors } from "../constants/Colors";
import { hp } from "../utils/functions";

interface GBRoundButtonProps {
  width: string;
  color: string;
  tint: string;
  icon: ImageSourcePropType;
  onPress: () => void;
  disable: boolean;
}

export const GBRoundButton: React.FunctionComponent<GBRoundButtonProps> = ({
  width,
  color,
  tint,
  icon,
  onPress,
  disable,
}) => (
  <TouchableOpacity
    disabled={disable}
    onPress={onPress}
    style={{
      backgroundColor: color,
      borderRadius: 50,
      padding: 15,
      opacity: disable ? 0.5 : 1,
    }}
  >
    <Image
      source={icon}
      style={{
        width: hp(width),
        height: hp(width),
        resizeMode: "contain",
        tintColor: tint,
      }}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({});
