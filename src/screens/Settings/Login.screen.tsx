import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GBContainer } from "@components/GBContainer";
import { Colors, ColorsDark } from "@constants/Colors";
import { Lang } from "@constants/Lang";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GBText } from "@components/GBText";
import { GBImage } from "@components/GBImage";
import { GBInput } from "@components/GBInput";
import { useState } from "react";
import { GBButton } from "@components/GBButton";
import { GBStatusBar } from "@components/GBStatusBar";
import { GBLink } from "@components/GBLink";
import { GBPopup } from "@components/GBPopup";
import { api } from "@api/index";
import { userSelector } from "@store/slices/userSlice";
import { actions } from "@store/action";
import { getLoginErrorMsg } from "@api/utils";
import { Popup } from "@utils/interface";
import { GBLoader } from "@components/GBLoader";
import { GBKeyboardDismiss } from "@components/GBKeyboardDismiss";
import { Spacer } from "@mistergooddeal/rn-components";
import { Platform } from "react-native";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import jwt_decode from "jwt-decode";
import { GBToast } from "@components/GBToast";

export const LoginScreen: React.FunctionComponent<null> = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage, darkMode } =
    useSelector(userSelector);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [disable, setDisable] = useState(true);
  const [loader, setLoader] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [popup, setPopup] = useState<Popup>();

  // Use focus effect
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Quand le composant est déaffiché
      };
    }, [])
  );

  /**
   * LOGIN WITH APPLE
   */

  const handleAppleLogin = () => {
    setPopup({
      visible: true,
      title: Lang.login.buttonApple,
      content: Lang.login.apple.warning,
      validText: Lang.login.apple.yes,
      notValidText: Lang.login.apple.no,
      image: "warning",
      valid: () => {
        (async () => {
          hidePopup();
          await onAppleButtonPress();
        })();
      },
      notValid: () => hidePopup(),
    });
  };
  async function onAppleButtonPress() {
    console.warn("Beginning Apple Authentication");

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log("appleAuthRequestResponse", appleAuthRequestResponse);

      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
        fullName,
      } = appleAuthRequestResponse;

      const user = newUser;

      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        console.log(nonce, identityToken);
      } else {
        GBToast(
          Lang.login.apple.failed.title,
          Lang.login.apple.failed.message,
          "error"
        );
      }

      console.warn(`Apple Authentication Completed, ${user}, ${email}`);
      const prenom = "";
      const nom = "";
      dispatch(
        api.user.loginApple({
          prenom: prenom,
          nom: nom,
          email: email ?? undefined,
          identityToken: identityToken!,
          authorizationCode: appleAuthRequestResponse.authorizationCode!,
          nonce: nonce!,
          user: appleAuthRequestResponse.user ?? undefined,
        })
      );
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        GBToast(
          Lang.login.apple.canceled.title,
          Lang.login.apple.canceled.message,
          "error"
        );
      } else {
        console.error(error);
        GBToast(
          Lang.login.apple.failed.title,
          Lang.login.apple.failed.message,
          "error"
        );
      }
    }
  }

  React.useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        "If this function executes, User Credentials have been Revoked"
      );
    });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  /**
   * END LOGIN WITH APPLE
   */

  React.useEffect(() => {
    if (isFetching) {
      console.log("fetching");
      setLoader(true);
    }
    if (isSuccess) {
      setLoader(false);
      if (isLogin) {
        setPopup({
          visible: true,
          title: Lang.login.success.title,
          content: Lang.login.success.message,
          image: "success",
          validText: Lang.login.success.button,
          valid: () => nav.navigate("Map"),
        });
      }
      setIsLogin(false);
      dispatch(actions.user.clearState());
    }
    if (isError) {
      setLoader(false);
      const error = getLoginErrorMsg(errorMessage!.title);
      if (isLogin) {
        setPopup({
          visible: true,
          title: error!.title,
          content: error!.message,
          image: "error",
          validText: error!.button,
          valid: hidePopup,
        });
      }
      setIsLogin(false);
      dispatch(actions.user.clearState());
    }
  }, [isFetching, isSuccess, isSuccess, errorMessage]);

  React.useEffect(() => {
    password.length === 0 || login.length === 0
      ? setDisable(true)
      : setDisable(false);
  }, [login, password]);

  const handleSubmit = (login: string, password: string) => {
    setIsLogin(true);
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
    <GBKeyboardDismiss>
      <GBContainer
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        color={darkMode ? ColorsDark.background : Colors.background}
      >
        <GBLoader visible={loader} color={"noir"} />
        <GBStatusBar
          color={darkMode ? ColorsDark.background : Colors.background}
          textColor={darkMode ? "light-content" : "dark-content"}
        />
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
            color={darkMode ? ColorsDark.inputColor : undefined}
          />
        )}
        <GBImage
          source={require("../../assets/images/bench.png")}
          size={"12%"}
        />
        <Spacer space={"8%"} visible={false} />
        <GBText
          size={"2.2%"}
          style={"bold"}
          color={darkMode ? ColorsDark.white : Colors.darkGrey}
        >
          {Lang.login.title}
        </GBText>
        <GBText size={"1.5%"} style={"medium"} color={Colors.border}>
          {Lang.login.connect}
        </GBText>
        <Spacer space={"8%"} visible={false} />
        <GBInput
          multiline={false}
          nbLines={1}
          placeholder={Lang.login.ph_login}
          hook={setLogin}
          color={darkMode ? ColorsDark.inputColor : undefined}
        >
          {login}
        </GBInput>
        <Spacer space={"2%"} visible={false} />
        <GBInput
          multiline={false}
          nbLines={1}
          isPassword={true}
          placeholder={Lang.login.ph_password}
          hook={setPassword}
          passwordShow={passwordVisible}
          setPasswordShow={setPasswordVisible}
          color={darkMode ? ColorsDark.inputColor : undefined}
        >
          {password}
        </GBInput>
        <Spacer space={"5%"} visible={false} />
        <GBButton
          onPress={() => handleSubmit(login, password)}
          disable={disable}
        >
          {Lang.login.button}
        </GBButton>
        <Spacer space={"1.5%"} visible={false} />
        <GBLink onPress={() => nav.navigate("ForgotPassword")} size={"1.5%"}>
          {Lang.login.forgot_password}
        </GBLink>
        <Spacer space={"5%"} visible={false} />
        <GBContainer direction={"row"}>
          <GBText size={"1.5%"} color={Colors.darkGrey} style={"regular"}>
            {Lang.login.no_account.text}
          </GBText>
          <GBLink size={"1.5%"} onPress={() => nav.navigate("Register")}>
            {Lang.login.no_account.link}
          </GBLink>
        </GBContainer>
        {/* <Spacer space={"1.5%"} visible={false} />
        <GBButton
          onPress={() => null}
          color={Colors.google}
          icon={require("@images/google.png")}
        >
          {Lang.login.buttonGoogle}
        </GBButton> */}

        {Platform.OS === "ios" && (
          <>
            <Spacer space={"1.5%"} visible={false} />
            <GBButton
              onPress={handleAppleLogin}
              color={Colors.apple}
              icon={require("@images/apple.png")}
            >
              {Lang.login.buttonApple}
            </GBButton>
          </>
        )}
      </GBContainer>
    </GBKeyboardDismiss>
  );
};
