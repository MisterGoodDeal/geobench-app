import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { Platform, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GBButton } from "../../components/GBButton";
import { GBContainer } from "../../components/GBContainer";
import { GBImage } from "../../components/GBImage";
import { GBInput } from "../../components/GBInput";
import { GBLoader } from "../../components/GBLoader";
import { GBRoundButton } from "../../components/GBRoundButton";
import { GBSpacer } from "../../components/GBSpacer";
import { GBStatusBar } from "../../components/GBStatusBar";
import { GBText } from "../../components/GBText";
import { Colors, ColorsDark } from "../../constants/Colors";
import { Lang } from "../../constants/Lang";
import { actions } from "../../store/action";
import { userSelector } from "../../store/slices/userSlice";
import { wp } from "../../utils/functions";
import { UserLocal } from "../../utils/interface";
import { localStorage } from "../../services/localStorage.service";
import { useKeyboard } from "../../utils/keyboard";
import { api } from "../../api";
import { GBToast } from "../../components/GBToast";
import { GBKeyboardDismiss } from "../../components/GBKeyboardDismiss";
import { GBPopup } from "../../components/GBPopup";
import ToggleSwitch from "toggle-switch-react-native";

const validator = require("email-validator");

export const SettingsLandingScreen: React.FunctionComponent<null> = () => {
  const { userInfo, isFetching, isSuccess, isError, errorMessage, darkMode } =
    useSelector(userSelector);
  const dispatch = useDispatch();
  const u: UserLocal = userInfo;
  const nav = useNavigation();
  const [keyboardStatus] = useKeyboard();

  const [loader, setLoader] = useState(false);
  const [popup, setPopup] = useState(false);

  const [fullname, setFullname] = useState(`${u?.prenom} ${u?.nom}`);
  const [fullnameDisable, setFullnameDisable] = useState(false);
  const [email, setEmail] = useState(`${u?.mail}`);
  const [emailDisable, setEmailDisable] = useState(false);
  const [username, setUsername] = useState("");
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [fullnameSubmit, setFullnameSubmit] = useState(false);

  const [isDarkMode, setisDarkMode] = useState(false);

  React.useEffect(() => {
    fullname.length === 0
      ? setFullnameDisable(true)
      : fullname === `${u?.prenom} ${u?.nom}`
      ? setFullnameDisable(true)
      : setFullnameDisable(false);
    email.length === 0
      ? setEmailDisable(true)
      : email === `${u?.mail}`
      ? setEmailDisable(true)
      : !validator.validate(email)
      ? setEmailDisable(true)
      : setEmailDisable(false);
  }, [fullname, email]);

  useFocusEffect(
    React.useCallback(() => {
      //Quand le composant est affiché
      const usr: UserLocal = userInfo;
      setFullname(`${usr?.prenom} ${usr?.nom}`);
      setEmail(`${usr?.mail}`);

      return () => {
        // Quand le composant est déaffiché
      };
    }, [])
  );

  const handleLogout = () => {
    localStorage.clear();
    dispatch(actions.user.setUser(null));
    nav.navigate("Login");
  };

  const handleDelete = () => {
    dispatch(api.user.delete({}));
    setPopup(false);
    localStorage.clear();
    dispatch(actions.user.setUser(null));
    nav.navigate("Login");
  };

  React.useEffect(() => {
    if (isFetching) {
      setLoader(true);
    }
    if (isSuccess) {
      if (fullnameSubmit) {
        setFullnameSubmit(false);
        (async () => {
          const sliced = fullname.split(" ");
          const firstname = sliced[0];
          const lastname = sliced[1] !== undefined ? sliced[1] : "";
          const newUser: UserLocal = {
            id: u.id,
            is_ads: u.is_ads,
            is_banned: u.is_banned,
            is_deleted: u.is_deleted,
            prenom: firstname,
            nom: lastname,
            mail: u.mail,
            pseudo: u.pseudo,
            favoris: u.favoris,
            reset_key: u.reset_key,
          };
          setFullname(`${firstname} ${lastname}`);
          await localStorage.store("user", JSON.stringify(newUser));
          dispatch(actions.user.setUser(newUser));
        })();
        GBToast(
          Lang.settings.toastMessages.success.title,
          Lang.settings.toastMessages.success.message,
          "success"
        );
      }

      if (emailSubmit) {
        setEmailSubmit(false);
        (async () => {
          const newUser: UserLocal = {
            id: u.id,
            is_ads: u.is_ads,
            is_banned: u.is_banned,
            is_deleted: u.is_deleted,
            prenom: u.prenom,
            nom: u.nom,
            mail: email,
            pseudo: u.pseudo,
            favoris: u.favoris,
            reset_key: u.reset_key,
          };
          setEmail(`${email}`);
          await localStorage.store("user", JSON.stringify(newUser));
          dispatch(actions.user.setUser(newUser));
        })();
        GBToast(
          Lang.settings.toastMessages.success.title,
          Lang.settings.toastMessages.success.message,
          "success"
        );
      }
      setLoader(false);
      dispatch(actions.user.clearState());
    }
    if (isError) {
      if (fullnameSubmit) {
        setFullnameSubmit(false);
        GBToast(
          Lang.settings.toastMessages.error.title,
          Lang.settings.toastMessages.error.message,
          "error"
        );
      }

      if (emailSubmit) {
        setFullnameSubmit(false);
        GBToast(
          Lang.settings.toastMessages.error.title,
          Lang.settings.toastMessages.error.message,
          "error"
        );
      }
      setLoader(false);
      dispatch(actions.user.clearState());
    }
  }, [isFetching, isSuccess, isError]);

  const handleFullnameSubmit = () => {
    setFullnameSubmit(true);
    const sliced = fullname.split(" ");
    const firstname = sliced[0];
    const lastname = sliced[1] !== undefined ? sliced[1] : "";
    dispatch(
      api.user.updateFullname({ firstname: firstname, lastname: lastname })
    );
  };
  const handleEmailSubmit = () => {
    setEmailSubmit(true);
    dispatch(api.user.updateEmail({ email: email }));
  };

  const handleDarkMode = (status: boolean) => {
    setisDarkMode(status);
    dispatch(actions.user.setDarkMode(status));
    localStorage.store("darkMode", `${status}`);
  };

  return (
    <GBKeyboardDismiss>
      <GBContainer
        flex={1}
        color={
          keyboardStatus && darkMode
            ? ColorsDark.background
            : keyboardStatus && !darkMode
            ? Colors.background
            : darkMode
            ? ColorsDark.main
            : Colors.main
        }
      >
        <GBPopup
          visible={popup}
          image={"bin"}
          title={Lang.settings.popup_delete.title}
          content={Lang.settings.popup_delete.content}
          validText={Lang.settings.popup_delete.yes}
          valid={() => handleDelete()}
          notValidText={Lang.settings.popup_delete.no}
          notValid={() => setPopup(false)}
        />
        <GBLoader visible={loader} color={keyboardStatus ? "noir" : "blanc"} />
        <GBStatusBar
          color={Colors.transparent}
          textColor={darkMode ? "light-content" : "dark-content"}
        />
        <GBContainer
          flex={1}
          color={
            keyboardStatus && darkMode
              ? ColorsDark.background
              : keyboardStatus && !darkMode
              ? Colors.background
              : darkMode
              ? ColorsDark.main
              : Colors.main
          }
          justifyContent={"center"}
          alignItems={"center"}
        >
          {Platform.OS === "android" && (
            <GBSpacer visible={false} space={"6%"} />
          )}
          <Pressable
            onPress={() => GBToast("Geobench", "Version 1.5.0", "info")}
          >
            <GBImage
              source={require("../../assets/images/bench.png")}
              size={"5%"}
            />
          </Pressable>

          <GBSpacer visible={false} space={"2%"} />
          <GBContainer
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <GBText
              color={keyboardStatus ? Colors.darkGrey : Colors.white}
              size={"3%"}
              style={"regular"}
            >
              {Lang.settings.hello}
            </GBText>
            <GBText
              color={keyboardStatus ? Colors.darkGrey : Colors.white}
              size={"3%"}
              style={"extra-bold"}
            >
              {u?.prenom}
            </GBText>
            <GBText
              color={keyboardStatus ? Colors.darkGrey : Colors.white}
              size={"3%"}
              style={"regular"}
            >
              {Lang.settings.exclamation}
            </GBText>
          </GBContainer>
          <GBText
            color={keyboardStatus ? Colors.darkGrey : Colors.white}
            size={"1.5%"}
            style={"light"}
          >
            {Lang.settings.subtext}
          </GBText>
        </GBContainer>
        <GBContainer
          flex={3}
          justifyContent={"center"}
          alignItems={"center"}
          color={darkMode ? ColorsDark.background : Colors.background}
          extraStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        >
          <GBContainer
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            extraStyle={{ width: "90%" }}
          >
            <GBInput
              multiline={false}
              nbLines={1}
              hook={setFullname}
              type={"default"}
              width={wp("70%")}
              placeholder={Lang.settings.ph_fullname}
              color={darkMode ? ColorsDark.inputColor : undefined}
            >
              {fullname}
            </GBInput>
            <GBRoundButton
              width={"2%"}
              color={Colors.main}
              tint={Colors.white}
              icon={require("../../assets/images/edit.png")}
              onPress={() => handleFullnameSubmit()}
              disable={fullnameDisable}
            />
          </GBContainer>
          <GBSpacer visible={false} space={"2%"} />
          <GBContainer
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            extraStyle={{ width: "90%" }}
          >
            <GBInput
              multiline={false}
              nbLines={1}
              hook={setEmail}
              type={"default"}
              width={wp("70%")}
              placeholder={Lang.settings.ph_email}
              color={darkMode ? ColorsDark.inputColor : undefined}
            >
              {email}
            </GBInput>
            <GBRoundButton
              width={"2%"}
              color={Colors.main}
              tint={Colors.white}
              icon={require("../../assets/images/edit.png")}
              onPress={() => handleEmailSubmit()}
              disable={emailDisable}
            />
          </GBContainer>
          <GBSpacer visible={false} space={"2%"} />
          <GBInput
            multiline={false}
            nbLines={1}
            hook={setUsername}
            type={"default"}
            width={wp("90%")}
            placeholder={"Easter egg discovered 🐣"}
            disable={true}
            color={darkMode ? ColorsDark.inputColor : undefined}
          >
            {u?.pseudo}
          </GBInput>
          <GBSpacer visible={false} space={"2%"} />
          <GBContainer
            direction={"row"}
            extraStyle={{ width: "90%" }}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <GBText color={Colors.darkGrey} size={"1.5%"} style={"regular"}>
              {darkMode
                ? Lang.settings.darkMode.on
                : Lang.settings.darkMode.off}
            </GBText>
            <ToggleSwitch
              isOn={darkMode}
              onColor={Colors.darkGrey}
              offColor={Colors.main}
              size="large"
              onToggle={(isOn: boolean) => handleDarkMode(isOn)}
            />
          </GBContainer>
          <GBSpacer visible={false} space={"10%"} />

          <GBButton
            onPress={() =>
              nav.navigate("ForgotPassword", { changePassword: true })
            }
            width={wp("90%")}
          >
            {Lang.settings.button_password}
          </GBButton>
          <GBSpacer visible={false} space={"2%"} />
          <GBContainer
            direction={"row"}
            extraStyle={{ width: "90%" }}
            justifyContent={"space-between"}
          >
            <GBButton
              onPress={handleLogout}
              color={Colors.lightRed}
              width={wp("40%")}
            >
              {Lang.settings.button_logout}
            </GBButton>
            <GBButton
              onPress={() => setPopup(true)}
              color={Colors.lightRed}
              width={wp("40%")}
            >
              {Lang.settings.button_delete}
            </GBButton>
          </GBContainer>
        </GBContainer>
      </GBContainer>
    </GBKeyboardDismiss>
  );
};
