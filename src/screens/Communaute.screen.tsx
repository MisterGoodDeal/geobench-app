import * as React from "react";
import { Text } from "react-native";
import { api } from "../api";
import { GBContainer } from "../components/GBContainer";
import { Colors } from "../constants/Colors";
import { Lang } from "../constants/Lang";

export const CommunauteScreen: React.FunctionComponent<null> = () => {
  return (
    <GBContainer
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      color={Colors.background}
    >
      <Text style={{ textAlign: "center" }}>{"Communaute Screen"}</Text>
    </GBContainer>
  );
};
