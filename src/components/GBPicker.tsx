import * as React from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Colors, ColorsDark } from "../constants/Colors";
import { AddBench } from "../utils/interface";

export interface PickerItem {
  label: string;
  value: string;
}

interface GBPickerProps {
  items: PickerItem[];
  placeholder: string;
  value?: string;
  setPickedItem:
    | React.Dispatch<React.SetStateAction<number>>
    | React.Dispatch<React.SetStateAction<string>>;
  darkMode: boolean;
  width?: number;
}

export const GBPicker: React.FunctionComponent<GBPickerProps> = ({
  items,
  placeholder,
  setPickedItem,
  value,
  darkMode,
  width,
}) => (
  <RNPickerSelect
    onValueChange={(value) =>
      !isNaN(parseInt(value))
        ? setPickedItem!(parseInt(value))
        : setPickedItem(value)
    }
    placeholder={{
      label: placeholder,
      value: "-1",
    }}
    value={value === undefined ? undefined : value}
    items={items}
    style={{
      inputIOS: {
        width: width ? width : undefined,
        fontSize: heightPercentageToDP("1.5%"),
        backgroundColor: darkMode ? ColorsDark.inputColor : Colors.inputColor,
        fontWeight: "bold",
        padding: 15,
        color: darkMode ? ColorsDark.white : Colors.darkGrey,
        fontFamily: "Poppins-Regular",
        borderRadius: 8,
        textAlign: "center",
      },
      inputAndroid: {
        width: width ? width : undefined,
        fontSize: heightPercentageToDP("1.5%"),
        backgroundColor: darkMode ? ColorsDark.inputColor : Colors.inputColor,
        fontWeight: "bold",
        padding: 15,
        color: darkMode ? ColorsDark.white : Colors.darkGrey,
        fontFamily: "Poppins-Regular",
        borderRadius: 8,
        textAlign: "center",
        width: widthPercentageToDP("70%"),
      },
    }}
    useNativeAndroidPickerStyle={false}
  />
);
