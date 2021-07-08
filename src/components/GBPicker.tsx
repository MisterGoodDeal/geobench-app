import * as React from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Colors } from "../constants/Colors";
import { AddBench } from "../utils/interface";

export interface PickerItem {
  label: string;
  value: string;
}

interface GBPickerProps {
  items: PickerItem[];
  placeholder: string;
  value?: string;
  setPickedItem: React.Dispatch<React.SetStateAction<number>>;
}

export const GBPicker: React.FunctionComponent<GBPickerProps> = ({
  items,
  placeholder,
  setPickedItem,
  value,
}) => (
  <RNPickerSelect
    onValueChange={(value) => setPickedItem!(parseInt(value))}
    placeholder={{
      label: placeholder,
      value: "-1",
    }}
    value={value === undefined ? undefined : value}
    items={items}
    style={pickerSelectStyles}
    useNativeAndroidPickerStyle={false}
  />
);
export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: heightPercentageToDP("1.5%"),
    backgroundColor: Colors.inputColor,
    fontWeight: "bold",
    padding: 15,
    color: Colors.darkGrey,
    fontFamily: "Poppins-Regular",
    borderRadius: 8,
    textAlign: "center",
  },
  inputAndroid: {
    fontSize: heightPercentageToDP("1.5%"),
    backgroundColor: Colors.inputColor,
    fontWeight: "bold",
    padding: 15,
    color: Colors.darkGrey,
    fontFamily: "Poppins-Regular",
    borderRadius: 8,
    textAlign: "center",
    width: widthPercentageToDP("70%"),
  },
});
