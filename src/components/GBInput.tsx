import * as React from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";
import { Colors } from "../constants/Colors";
import { hp, wp } from "../utils/functions";

interface GBInputProps {
  multiline: boolean;
  nbLines: number;
  width?: number;
  textAlign?: "left" | "right" | "center";
  spaceAround?: number;
  children?: string;
  placeholder?: string;
  isPassword?: boolean;
  type?: KeyboardTypeOptions;
  maxLength?: number;
  hook: React.Dispatch<React.SetStateAction<string>>;
  disable?: boolean;
  size?: string;
}

export const GBInput: React.FunctionComponent<GBInputProps> = ({
  multiline,
  nbLines,
  width,
  spaceAround,
  children,
  placeholder,
  textAlign,
  type,
  maxLength,
  isPassword,
  disable,
  size,
  hook,
}) => (
  <TextInput
    editable={!disable}
    numberOfLines={nbLines}
    multiline={multiline}
    maxLength={maxLength !== undefined ? maxLength : undefined}
    style={[
      styles.input,
      { borderRadius: 8 },
      { textAlignVertical: multiline ? "top" : "center" },
      { textAlign: textAlign === undefined ? "left" : textAlign },
      { height: multiline ? hp("20%") : undefined },
      { width: width ? width : wp("70%") },
      { marginLeft: spaceAround ? spaceAround : 0 },
      { marginRight: spaceAround ? spaceAround : 0 },
      { fontSize: size === undefined ? hp("1.5%") : hp(size) },
    ]}
    secureTextEntry={
      isPassword ? isPassword : isPassword === null ? undefined : false
    }
    placeholder={placeholder ? placeholder : ""}
    placeholderTextColor={Colors.placeholder}
    onChangeText={(value: string) => hook!(value)}
    keyboardType={type ? type : "default"}
  >
    {children ? children : ""}
  </TextInput>
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.inputColor,
    fontWeight: "bold",
    textAlignVertical: "top",
    padding: 15,
    color: Colors.black,
    fontFamily: "Poppins-Regular",
  },
});
