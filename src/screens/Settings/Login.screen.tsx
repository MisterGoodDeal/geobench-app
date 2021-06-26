import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GBContainer } from "../../components/GBContainer";
import { Colors } from "../../constants/Colors";
import { Lang } from "../../constants/Lang";
import { useNavigation } from "@react-navigation/native";
import { GBCard } from "../../components/GBCard";
import { GBText } from "../../components/GBText";
import { GBImage } from "../../components/GBImage";
import { GBSpacer } from "../../components/GBSpacer";
import { GBInput } from "../../components/GBInput";
import { useState } from "react";
import { GBButton } from "../../components/GBButton";
import { GBStatusBar } from "../../components/GBStatusBar";
import { GBLink } from "../../components/GBLink";
import { GBPopup } from "../../components/GBPopup";
import { api } from "../../api";
import { userSelector } from "../../store/slices/userSlice";
import { actions } from "../../store/action";
import { getLoginErrorMsg } from "../../api/utils";
import { Popup } from "../../utils/interface";
import { GBLoader } from "../../components/GBLoader";

export const LoginScreen: React.FunctionComponent<null> = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const [loader, setLoader] = useState(false);

  const [popup, setPopup] = useState<Popup>();

  React.useEffect(() => {
    if (isFetching) {
      console.log("fetching");
      setLoader(true);
    }
    if (isSuccess) {
      setLoader(false);
      setPopup({
        visible: true,
        title: Lang.login.success.title,
        content: Lang.login.success.message,
        image: "success",
        validText: Lang.login.success.button,
        valid: () => nav.navigate("Map"),
      });
      dispatch(actions.user.clearState());
    }
    if (isError) {
      setLoader(false);
      const error = getLoginErrorMsg(errorMessage!.title);
      setPopup({
        visible: true,
        title: error!.title,
        content: error!.message,
        image: "error",
        validText: error!.button,
        valid: hidePopup,
      });
      dispatch(actions.user.clearState());
    }
  }, [isFetching, isSuccess, isSuccess, errorMessage]);

  React.useEffect(() => {
    password.length === 0 || login.length === 0
      ? setDisable(true)
      : setDisable(false);
  }, [login, password]);

  const handleSubmit = (login: string, password: string) => {
    dispatch(api.user.login({ login: login, password: password }));
  };
  const hidePopup = () => {
    setPopup({
      visible: false,
      title: "",
      content: "",
      image: "error",
      validText: "",
      valid: () => null,
    });
  };
  return (
    <GBContainer
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      color={Colors.background}
    >
      <GBLoader visible={loader} color={"noir"} />
      <GBStatusBar color={Colors.background} textColor={"dark-content"} />
      {popup?.visible && (
        <GBPopup
          visible={popup.visible}
          title={popup.title}
          content={popup.content}
          image={popup.image}
          valid={popup.valid}
          validText={popup.validText}
          notValidText={popup.notValidText}
          notValid={popup.notValid}
        />
      )}
      <GBImage source={require("../../assets/images/bench.png")} size={"12%"} />
      <GBSpacer space={"8%"} visible={false} />
      <GBText size={"2.2%"} style={"bold"} color={Colors.darkGrey}>
        {Lang.login.title}
      </GBText>
      <GBText size={"1.5%"} style={"medium"} color={Colors.border}>
        {Lang.login.connect}
      </GBText>
      <GBSpacer space={"8%"} visible={false} />
      <GBInput
        multiline={false}
        nbLines={1}
        placeholder={Lang.login.ph_login}
        hook={setLogin}
      >
        {login}
      </GBInput>
      <GBSpacer space={"2%"} visible={false} />
      <GBInput
        multiline={false}
        nbLines={1}
        isPassword={true}
        placeholder={Lang.login.ph_password}
        hook={setPassword}
      >
        {password}
      </GBInput>
      <GBSpacer space={"5%"} visible={false} />
      <GBButton onPress={() => handleSubmit(login, password)} disable={disable}>
        {Lang.login.button}
      </GBButton>
      <GBSpacer space={"1.5%"} visible={false} />
      <GBLink onPress={() => nav.navigate("ForgotPassword")} size={"1.5%"}>
        {Lang.login.forgot_password}
      </GBLink>
      <GBSpacer space={"5%"} visible={false} />
      <GBContainer direction={"row"} color={Colors.background}>
        <GBText size={"1.5%"} color={Colors.darkGrey} style={"regular"}>
          {Lang.login.no_account.text}
        </GBText>
        <GBLink size={"1.5%"} onPress={() => nav.navigate("Register")}>
          {Lang.login.no_account.link}
        </GBLink>
      </GBContainer>
    </GBContainer>
  );
};
