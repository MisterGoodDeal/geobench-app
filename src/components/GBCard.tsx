import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";
import { hp, wp } from "../utils/functions";

interface GBCardProps {
  children: any;
  width?: string;
  padding?: string;
  elevated?: boolean;
}

export const GBCard: React.FunctionComponent<GBCardProps> = ({
  children,
  width,
  padding,
  elevated,
}) => (
  <View
    style={[
      { padding: padding !== undefined ? hp(padding) : hp("1.5%") },
      { backgroundColor: Colors.white },
      { width: width !== undefined ? wp(width) : wp("90%") },
      {
        borderRadius: 15,
      },
      elevated === true ? styles.elevation : undefined,
    ]}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  elevation: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 5,
  },
});
