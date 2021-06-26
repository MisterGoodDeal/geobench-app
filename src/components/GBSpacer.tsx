import * as React from "react";
import { View } from "react-native";
import { Colors } from "../constants/Colors";
import { hp, wp } from "../utils/functions";

interface GBSpacerProps {
  space: string;
  visible: boolean;
  width?: string;
  color?: string;
}

export const GBSpacer: React.FunctionComponent<GBSpacerProps> = ({
  space,
  visible,
  width,
  color,
}) => (
  <View
    style={[
      { marginTop: hp(space) / 2, marginBottom: hp(space) / 2 },
      {
        height: visible ? 1 : 0,
        width: width !== undefined ? wp(width) : "80%",
      },
      {
        borderColor:
          visible && color !== undefined
            ? color
            : visible && color === undefined
            ? Colors.border
            : undefined,
      },
      { borderWidth: visible ? 1 : 0, borderRadius: 50 },
    ]}
  ></View>
);
