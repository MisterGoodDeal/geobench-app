import * as React from "react";
import { GBContainer } from "../../components/GBContainer";
import { Colors } from "../../constants/Colors";
import { Lang } from "../../constants/Lang";
import { useNavigation } from "@react-navigation/native";
import { GBText } from "../../components/GBText";
import { GBImage } from "../../components/GBImage";
import { GBSpacer } from "../../components/GBSpacer";
import { GBInput } from "../../components/GBInput";
import { useState } from "react";
import { GBButton } from "../../components/GBButton";
import { GBStatusBar } from "../../components/GBStatusBar";
const { passwordStrength } = require("check-password-strength");
const validator = require("email-validator");
import { GBLink } from "../../components/GBLink";
import { api } from "../../api";
import { GBLoader } from "../../components/GBLoader";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/slices/userSlice";
import { actions } from "../../store/action";
import { getRegisterErrorMsg } from "../../api/utils";
import { GBToast } from "../../components/GBToast";

export const RegisterScreen: React.FunctionComponent<null> = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd1, setPdw1] = useState("");
  const [pwd2, setPdw2] = useState("");
  const [message, setMessage] = useState("");
  const [canRegister, setCanRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  React.useEffect(() => {
    const check = passwordStrength(pwd1);
    if (
      fullname.length > 0 &&
      username.length > 0 &&
      validator.validate(email) &&
      pwd1 === pwd2 &&
      pwd1 !== "" &&
      pwd2 !== "" &&
      check.length >= 8 &&
      check.contains.length === 4
    ) {
      setCanRegister(true);
    }

    if (pwd1 !== pwd2) {
      setCanRegister(false);
      setMessage(Lang.forgotPassword.popupMessages.password_missmatch);
    } else {
      setMessage("");
    }
  }, [fullname, username, email, pwd1, pwd2]);

  React.useEffect(() => {
    if (isFetching) {
      setIsLoading(true);
    }
    if (isSuccess) {
      setIsLoading(false);
      if (isRegister) {
        GBToast(
          Lang.register.messages.success.title,
          Lang.register.messages.success.message,
          "success"
        );
      }
      setIsRegister(false);
      dispatch(actions.user.clearState());
      nav.navigate("Login");
    }
    if (isError) {
      setIsLoading(false);
      const error = getRegisterErrorMsg(errorMessage!.title);
      if (isRegister) {
        GBToast(error.title, error.message, "error");
      }
      setIsRegister(false);
      dispatch(actions.user.clearState());
    }
  }, [isFetching, isSuccess, isError]);

  const handleSubmit = () => {
    setIsRegister(true);
    const sliced = fullname.split(" ");
    const firstname = sliced[0];
    const lastname = sliced[1] !== undefined ? sliced[1] : "";
    dispatch(
      api.user.register({
        prenom: firstname,
        nom: lastname,
        username: username,
        email: email,
        password: pwd1,
      })
    );
  };
  return (
    <GBContainer
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      color={Colors.background}
    >
      <GBStatusBar color={Colors.background} textColor={"dark-content"} />
      <GBLoader color={"noir"} visible={isLoading} />
      <GBImage source={require("../../assets/images/bench.png")} size={"12%"} />
      <GBSpacer space={"4%"} visible={false} />
      <GBText size={"2.2%"} style={"bold"} color={Colors.darkGrey}>
        {Lang.register.title}
      </GBText>
      <GBText size={"1.5%"} style={"medium"} color={Colors.border}>
        {Lang.register.pickup}
      </GBText>
      <GBSpacer space={"4%"} visible={false} />
      <GBInput
        multiline={false}
        nbLines={1}
        placeholder={Lang.register.ph_fullname}
        hook={setFullname}
      >
        {fullname}
      </GBInput>
      <GBSpacer space={"1%"} visible={false} />
      <GBInput
        multiline={false}
        nbLines={1}
        placeholder={Lang.register.ph_email}
        hook={setEmail}
        type={"email-address"}
      >
        {email}
      </GBInput>
      <GBSpacer space={"1%"} visible={false} />
      <GBInput
        multiline={false}
        nbLines={1}
        placeholder={Lang.register.ph_username}
        hook={setUsername}
        maxLength={15}
      >
        {username}
      </GBInput>
      <GBSpacer space={"3%"} visible={false} />
      <GBContainer extraStyle={{ width: "70%" }}>
        <GBText
          style={"regular"}
          size={"1.1%"}
          align={"justify"}
          color={Colors.darkGrey}
        >
          {Lang.forgotPassword.popupMessages.password_weak}
        </GBText>
      </GBContainer>
      <GBSpacer space={"1.5%"} visible={false} />
      <GBInput
        multiline={false}
        nbLines={1}
        placeholder={Lang.register.ph_pwd1}
        isPassword={true}
        hook={setPdw1}
      >
        {pwd1}
      </GBInput>
      <GBSpacer space={"1%"} visible={false} />
      <GBInput
        multiline={false}
        nbLines={1}
        placeholder={Lang.register.ph_pwd2}
        hook={setPdw2}
        isPassword={true}
      >
        {pwd2}
      </GBInput>
      <GBSpacer space={"1%"} visible={false} />

      <GBSpacer space={"4%"} visible={false} />
      <GBButton onPress={() => handleSubmit()} disable={!canRegister}>
        {Lang.register.button}
      </GBButton>
      <GBSpacer space={"3%"} visible={false} />
      <GBContainer direction={"row"} color={Colors.background}>
        <GBText size={"1.5%"} color={Colors.darkGrey} style={"regular"}>
          {Lang.register.alreadyAccount.text}
        </GBText>
        <GBLink size={"1.5%"} onPress={() => nav.navigate("Login")}>
          {Lang.register.alreadyAccount.link}
        </GBLink>
      </GBContainer>
    </GBContainer>
  );
};
