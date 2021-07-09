import * as React from "react";
import { GBContainer } from "../../components/GBContainer";
import { Colors, ColorsDark } from "../../constants/Colors";
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
import { GBKeyboardDismiss } from "../../components/GBKeyboardDismiss";

export const RegisterScreen: React.FunctionComponent<null> = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage, darkMode } =
    useSelector(userSelector);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd1, setPdw1] = useState("");
  const [pwd2, setPdw2] = useState("");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [canRegister, setCanRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(true);
  const [passwordVisible2, setPasswordVisible2] = useState(true);

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

    if ((check.length < 8 || check.contains.length !== 4) && pwd1 !== "") {
      setCanRegister(false);
      setMessage2(Lang.forgotPassword.popupMessages.password_weak);
    } else {
      setMessage2("");
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
    <GBKeyboardDismiss>
      <GBContainer
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        color={darkMode ? ColorsDark.background : Colors.background}
      >
        <GBStatusBar
          color={darkMode ? ColorsDark.background : Colors.background}
          textColor={darkMode ? "light-content" : "dark-content"}
        />
        <GBLoader color={"noir"} visible={isLoading} />
        <GBImage
          source={require("../../assets/images/bench.png")}
          size={"12%"}
        />
        <GBSpacer space={"4%"} visible={false} />
        <GBText
          size={"2.2%"}
          style={"bold"}
          color={darkMode ? ColorsDark.white : Colors.darkGrey}
        >
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
          color={darkMode ? ColorsDark.inputColor : undefined}
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
          color={darkMode ? ColorsDark.inputColor : undefined}
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
          color={darkMode ? ColorsDark.inputColor : undefined}
        >
          {username}
        </GBInput>
        <GBSpacer space={"3%"} visible={false} />
        <GBSpacer space={"1.5%"} visible={false} />
        <GBInput
          multiline={false}
          nbLines={1}
          placeholder={Lang.register.ph_pwd1}
          isPassword={true}
          passwordShow={passwordVisible1}
          setPasswordShow={setPasswordVisible1}
          hook={setPdw1}
          color={darkMode ? ColorsDark.inputColor : undefined}
        >
          {pwd1}
        </GBInput>
        <GBSpacer space={"1%"} visible={false} />
        <GBInput
          multiline={false}
          nbLines={1}
          placeholder={Lang.register.ph_pwd2}
          hook={setPdw2}
          passwordShow={passwordVisible2}
          setPasswordShow={setPasswordVisible2}
          isPassword={true}
          color={darkMode ? ColorsDark.inputColor : undefined}
        >
          {pwd2}
        </GBInput>
        <GBContainer extraStyle={{ width: "70%" }} alignItems={"center"}>
          {message !== "" && (
            <>
              <GBSpacer visible={false} space={"1%"} />
              <GBText
                style={"regular"}
                size={"1.2%"}
                align={"justify"}
                color={Colors.lightRed}
              >
                {message}
              </GBText>
            </>
          )}
          {message2 !== "" && (
            <>
              <GBSpacer visible={false} space={"1%"} />
              <GBText
                style={"regular"}
                size={"1.2%"}
                align={"center"}
                color={Colors.lightRed}
              >
                {message2}
              </GBText>
            </>
          )}
        </GBContainer>

        <GBSpacer space={"4%"} visible={false} />
        <GBButton onPress={() => handleSubmit()} disable={!canRegister}>
          {Lang.register.button}
        </GBButton>
        <GBSpacer space={"3%"} visible={false} />
        <GBContainer direction={"row"}>
          <GBText size={"1.5%"} color={Colors.darkGrey} style={"regular"}>
            {Lang.register.alreadyAccount.text}
          </GBText>
          <GBLink size={"1.5%"} onPress={() => nav.navigate("Login")}>
            {Lang.register.alreadyAccount.link}
          </GBLink>
        </GBContainer>
      </GBContainer>
    </GBKeyboardDismiss>
  );
};
