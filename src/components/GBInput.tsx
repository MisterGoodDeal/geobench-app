import * as React from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Colors, ColorsDark } from "../constants/Colors";
import { hp, wp } from "../utils/functions";

interface GBInputProps {
  color?: string;
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
  setPasswordShow?: React.Dispatch<React.SetStateAction<boolean>>;
  passwordShow?: boolean;
  disable?: boolean;
  size?: string;
}

export const GBInput: React.FunctionComponent<GBInputProps> = ({
  color,
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
  passwordShow,
  setPasswordShow,
  disable,
  size,
  hook,
}) => (
  <View
    style={[
      styles.input,
      {
        borderRadius: 8,
        backgroundColor: color === undefined ? Colors.inputColor : color,
      },
      { height: multiline ? hp("20%") : undefined },
      { width: width ? width : wp("70%") },
      { marginLeft: spaceAround ? spaceAround : 0 },
      { marginRight: spaceAround ? spaceAround : 0 },
    ]}
  >
    <TextInput
      editable={!disable}
      numberOfLines={nbLines}
      multiline={multiline}
      maxLength={maxLength !== undefined ? maxLength : undefined}
      style={[
        {
          width: "90%",
          fontWeight: "bold",
          color: disable
            ? Colors.placeholder
            : color === undefined
            ? Colors.black
            : ColorsDark.white,
          fontFamily: "Poppins-Regular",
          padding: 0,
        },
        { textAlignVertical: multiline ? "top" : "center" },
        { textAlign: textAlign === undefined ? "left" : textAlign },
        { fontSize: size === undefined ? hp("1.5%") : hp(size) },
      ]}
      secureTextEntry={passwordShow === undefined ? false : passwordShow}
      placeholder={placeholder ? placeholder : ""}
      placeholderTextColor={Colors.placeholder}
      onChangeText={(value: string) => hook!(value)}
      keyboardType={type ? type : "default"}
    >
      {children ? children : ""}
    </TextInput>
    {isPassword && (
      <TouchableOpacity
        style={{}}
        onPress={() => setPasswordShow!(!passwordShow)}
      >
        <Image
          source={
            passwordShow
              ? require("../assets/images/pwd_visible.png")
              : require("../assets/images/pwd_invisible.png")
          }
          style={{
            width: hp("2.5%"),
            height: hp("2.5%"),
            tintColor: Colors.placeholder,
          }}
        />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    textAlignVertical: "top",
    padding: hp("1.5%"),
  },
});
