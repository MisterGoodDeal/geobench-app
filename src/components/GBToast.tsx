import * as React from "react";
import Toast from "react-native-toast-message";

export const GBToast = (
  titre: string,
  texte: string,
  type: "success" | "error" | "info",
  onShow?: () => void,
  onHide?: () => void,
  onPress?: () => void
) => {
  Toast.show({
    type: type,
    position: "top",
    text1: titre,
    text2: texte,
    visibilityTime: 8000,
    autoHide: true,
    topOffset: 50,
    bottomOffset: 40,
    onShow: onShow === undefined ? () => {} : onShow,
    onHide: onHide === undefined ? () => {} : onHide,
    onPress: onPress === undefined ? () => {} : onPress,
  });
};
