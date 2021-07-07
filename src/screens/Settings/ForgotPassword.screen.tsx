import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GBContainer } from "../../components/GBContainer";
import { Colors } from "../../constants/Colors";
import { Lang } from "../../constants/Lang";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GBText } from "../../components/GBText";
import { GBImage } from "../../components/GBImage";
import { GBSpacer } from "../../components/GBSpacer";
import { GBInput } from "../../components/GBInput";
import { useState } from "react";
import { GBButton } from "../../components/GBButton";
import { GBStatusBar } from "../../components/GBStatusBar";
import { GBBack } from "../../components/GBBack";
import { userSelector } from "../../store/slices/userSlice";
import { GBLoader } from "../../components/GBLoader";
import { api } from "../../api";
const validator = require("email-validator");
import * as RNLocalize from "react-native-localize";
import { actions } from "../../store/action";
import { getLoginErrorMsg, getPasswordResetErrorMsg } from "../../api/utils";
import { GBToast } from "../../components/GBToast";
import { GBPopupReset } from "../../components/GBPopupReset";
import { GBKeyboardDismiss } from "../../components/GBKeyboardDismiss";
const { passwordStrength } = require("check-password-strength");

export const ForgotPasswordScreen: React.FunctionComponent<null> = () => {
  const nav = useNavigation();
  const route = useRoute();
  const [email, setEmail] = useState("");
  const [changePass, setChangePass] = useState(false);

  // Gestion pour l'API
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSended, setResetSended] = useState(false);
  const [checkAndChangeSended, setcheckAndChangeSended] = useState(false);

  // Reset password
  const [popupVisible, setPopupVisible] = useState(false);
  const [canSend, setCanSend] = useState(false);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [code, setCode] = useState("");
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");

  const [passwordVisible1, setPasswordVisible1] = useState(true);
  const [passwordVisible2, setPasswordVisible2] = useState(true);

  React.useEffect(() => {
    nav.setOptions({ tabBarVisible: false });
    if (route.params?.changePassword === true) {
      setChangePass(true);
    }
  }, [nav]);

  React.useEffect(() => {
    if (isFetching) {
      setIsLoading(true);
    }

    if (isSuccess) {
      setIsLoading(false);
      if (resetSended) {
        setPopupVisible(true);
        setResetSended(false);
      }
      if (checkAndChangeSended) {
        GBToast(
          Lang.forgotPassword.checkAndChange.success.title,
          Lang.forgotPassword.checkAndChange.success.message,
          "success"
        );
        setcheckAndChangeSended(false);
        setPopupVisible(false);
        nav.navigate("Login");
      }
      dispatch(actions.user.clearState());
    }

    if (isError) {
      setIsLoading(false);
      if (resetSended) {
        const message4Toast = getLoginErrorMsg(errorMessage!.title);
        GBToast(message4Toast.title, message4Toast.message, "error");
        setPopupVisible(false);
        setResetSended(false);
      }
      if (checkAndChangeSended) {
        GBToast(
          getPasswordResetErrorMsg(errorMessage!.title).title,
          getPasswordResetErrorMsg(errorMessage!.title).message,
          "error"
        );
        setcheckAndChangeSended(false);
      }
      dispatch(actions.user.clearState());
    }
  }, [isFetching, isSuccess, isError]);

  const handleSubmit = () => {
    setResetSended(true);
    dispatch(
      api.user.reset({
        lang: RNLocalize.getLocales()[0].languageCode,
        email: email,
      })
    );
  };

  const handleCheckAndChange = () => {
    setcheckAndChangeSended(true);
    dispatch(
      api.user.checkAndChange({ code: code, email: email, password: pwd1 })
    );
  };

  const resetAll = () => {
    setIsLoading(false);
    setResetSended(false);
    setcheckAndChangeSended(false);
    setPopupVisible(false);
    setCanSend(false);
    setMessage("");
    setCode("");
    setPwd1("");
    setPwd2("");
  };

  React.useEffect(() => {
    const check = passwordStrength(pwd1);
    if (
      code.length === 6 &&
      pwd1 === pwd2 &&
      pwd1 !== "" &&
      pwd2 !== "" &&
      check.length >= 8 &&
      check.contains.length === 4
    ) {
      setMessage("");
      setMessage2("");
      setCanSend(true);
    }

    if ((check.length < 8 || check.contains.length !== 4) && pwd1 !== "") {
      setCanSend(false);
      setMessage2(Lang.forgotPassword.popupMessages.password_weak);
    } else {
      setMessage2("");
    }

    if (pwd1 !== pwd2) {
      setCanSend(false);
      setMessage(Lang.forgotPassword.popupMessages.password_missmatch);
    } else {
      setMessage("");
    }
  }, [code, pwd1, pwd2]);
  return (
    <GBKeyboardDismiss>
      <GBContainer
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        color={Colors.background}
      >
        <GBStatusBar color={Colors.background} textColor={"dark-content"} />
        <GBLoader visible={isLoading} color={"noir"} />
        <GBPopupReset
          visible={popupVisible}
          valid={() => handleCheckAndChange()}
          onClose={() => resetAll()}
          code={setCode}
          pwd1={setPwd1}
          pwd2={setPwd2}
          canSend={canSend}
          message={message}
          message2={message2}
          pwd1Visible={passwordVisible1}
          pwd1SetVisible={setPasswordVisible1}
          pwd2Visible={passwordVisible2}
          pwd2SetVisible={setPasswordVisible2}
        />
        <GBBack onPress={() => nav.goBack()} />
        <GBImage
          source={require("../../assets/images/password.png")}
          size={"12%"}
        />
        <GBSpacer space={"8%"} visible={false} />
        <GBText size={"2.2%"} style={"bold"} color={Colors.darkGrey}>
          {changePass
            ? Lang.forgotPassword.titleAlt
            : Lang.forgotPassword.title}
        </GBText>
        <GBText size={"1.5%"} style={"medium"} color={Colors.border}>
          {Lang.forgotPassword.pickup}
        </GBText>
        <GBSpacer space={"8%"} visible={false} />
        <GBInput
          multiline={false}
          nbLines={1}
          placeholder={Lang.forgotPassword.ph_email}
          hook={setEmail}
          type={"email-address"}
        >
          {email}
        </GBInput>

        <GBSpacer space={"5%"} visible={false} />
        <GBButton
          onPress={() => handleSubmit()}
          disable={!validator.validate(email)}
        >
          {Lang.forgotPassword.button}
        </GBButton>
      </GBContainer>
    </GBKeyboardDismiss>
  );
};
