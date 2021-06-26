import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "react-native";
import { templateSelector } from "../store/slices/templateSlice";
import { api } from "../api";
import { GBContainer } from "../components/GBContainer";
import { Colors } from "../constants/Colors";
import { Lang } from "../constants/Lang";
import { UserLocal } from "../utils/interface";
import { localStorage } from "../services/localStorage.service";
import { useNavigation } from "@react-navigation/native";
import { actions } from "../store/action";

export const CarteScreen: React.FunctionComponent<null> = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(templateSelector);
  React.useEffect(() => {
    if (isFetching) {
      // Handle fetching
    }
    if (isSuccess) {
      // Handle success
    }
    if (isError) {
      // Handle error
      console.log(errorMessage);
    }
  }, [isFetching, isSuccess, isError, errorMessage]);

  React.useEffect(() => {
    (async () => {
      const user = await localStorage.get("user");
      if (user !== "") {
        dispatch(actions.user.setUser(JSON.parse(user)));
      } else {
        nav.navigate("Login");
      }
    })();
  }, []);
  return (
    <GBContainer
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      color={Colors.background}
    >
      <Text style={{ textAlign: "center" }}>{"Carte Screen"}</Text>
    </GBContainer>
  );
};
