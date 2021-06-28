import { Platform } from "react-native";

export const env = {
  apiUrl:
    Platform.OS === "android"
      ? "http://192.168.35.156:3000"
      : "http://localhost:3000",
};
