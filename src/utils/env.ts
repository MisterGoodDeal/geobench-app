import { Platform } from "react-native";

export const env = {
  apiUrl:
    Platform.OS === "android"
      ? "http://192.168.82.156:3000"
      : "http://localhost:3000",
  imgBB: {
    key: "06faf38ae3e57ecce08a265d1168e417",
    url: "https://api.imgbb.com",
  },
};
