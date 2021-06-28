import { Linking, Platform } from "react-native";
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

export const openMap = (lat: number, lng: number, label: string) => {
  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${lat},${lng}`;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  Linking.openURL(url!);
};
