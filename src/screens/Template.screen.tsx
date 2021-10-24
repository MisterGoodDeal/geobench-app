import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "react-native";
import { templateSelector } from "@store/slices/templateSlice";
import { api } from "@api/index";
import { Colors } from "@constants/Colors";
import { Lang } from "@constants/Lang";
import { GBContainer } from "@components/GBContainer";

export const TemplateScreen: React.FunctionComponent<null> = () => {
  const dispatch = useDispatch();
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
    dispatch(api.template.fetch);
  }, []);
  return (
    <GBContainer
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      color={Colors.background}
    >
      <Text style={{ textAlign: "center" }}>{"Template Screen"}</Text>
    </GBContainer>
  );
};
