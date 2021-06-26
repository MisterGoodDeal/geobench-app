import * as React from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";
import { Colors } from "../constants/Colors";
import { hp, wp } from "../utils/functions";

interface GBInputProps {
  multiline: boolean;
  nbLines: number;
  width?: number;
  spaceAround?: number;
  children?: string;
  placeholder?: string;
  isPassword?: boolean;
  type?: KeyboardTypeOptions;
  maxLength?: number;
  hook: React.Dispatch<React.SetStateAction<string>>;
  disable?: boolean;
}

export const GBInput: React.FunctionComponent<GBInputProps> = ({
  multiline,
  nbLines,
  width,
  spaceAround,
  children,
  placeholder,
  type,
  maxLength,
  isPassword,
  disable,
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
      { textAlign: multiline ? "left" : "left" },
      { height: multiline ? hp("20%") : undefined },
      { width: width ? width : wp("70%") },
      { marginLeft: spaceAround ? spaceAround : 0 },
      { marginRight: spaceAround ? spaceAround : 0 },
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
    fontSize: hp("1.5%"),
    fontWeight: "bold",
    textAlignVertical: "top",
    padding: 15,
    color: Colors.black,
    fontFamily: "Poppins-Regular",
  },
});
