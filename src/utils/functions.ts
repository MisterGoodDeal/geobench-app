import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

export const wp = (size: string) => {
  return widthPercentageToDP(size);
};
export const hp = (size: string) => {
  return heightPercentageToDP(size);
};
