import * as React from "react";
import { ImageSourcePropType, StyleSheet, Image } from "react-native";
import { hp } from "../utils/functions";

interface GBImageProps {
  source: ImageSourcePropType;
  size: string;
  tint?: string;
}

export const GBImage: React.FunctionComponent<GBImageProps> = ({
  source,
  size,
  tint,
}) => (
  <Image
    source={source}
    style={[
      { width: hp(size), height: hp(size), resizeMode: "contain" },
      { tintColor: tint !== undefined ? tint : undefined },
    ]}
  />
);

const styles = StyleSheet.create({});
