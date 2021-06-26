import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import { GBText } from "./GBText";

interface GBLinkProps {
  children: string;
  size: string;
  onPress: () => void;
}

export const GBLink: React.FunctionComponent<GBLinkProps> = ({
  onPress,
  children,
  size,
}) => (
  <TouchableOpacity onPress={onPress}>
    <GBText size={size} color={Colors.main} style={"regular"}>
      {children}
    </GBText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({});
