import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GBButton } from "@components/GBButton";
import { GBContainer } from "@components/GBContainer";
import { GBImage } from "@components/GBImage";
import { GBInput } from "@components/GBInput";
import { GBLoader } from "@components/GBLoader";
import { GBRoundButton } from "@components/GBRoundButton";
import { GBStatusBar } from "@components/GBStatusBar";
import { GBText } from "@components/GBText";
import { Colors, ColorsDark } from "@constants/Colors";
import { availableLanguages, Lang } from "@constants/Lang";
import { actions } from "@store/action";
import { userSelector } from "@store/slices/userSlice";
import { UserLocal } from "@utils/interface";
import { localStorage } from "../../services/localStorage.service";
import { useKeyboard } from "@utils/keyboard";
import { api } from "@api/index";
import { GBToast } from "@components/GBToast";
import { GBKeyboardDismiss } from "@components/GBKeyboardDismiss";
import { GBPopup } from "@components/GBPopup";
import ToggleSwitch from "toggle-switch-react-native";
import { hp, infos, Spacer, wp } from "@mistergooddeal/rn-components";
import { sizes } from "@constants/Sizes";
import { GBPicker } from "@components/GBPicker";
import * as RNLocalize from "react-native-localize";
import { useEffect } from "react";
import { GBLink } from "@components/GBLink";

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

  const [lang, setLang] = useState("");

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
      (async () => {
        const customLang = await localStorage.get("lang");

        if (customLang) {
          setLang(customLang);
        } else {
          setLang(RNLocalize.getLocales()[0].languageCode);
        }
      })();

      return () => {
        // Quand le composant est déaffiché
      };
    }, [])
  );

  React.useEffect(() => {
    if (lang === "fr" || lang === "en") {
      (async () => {
        localStorage.store("lang", lang);
      })();
    }
  }, [lang]);

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
          {Platform.OS === "android" && <Spacer visible={false} space={"6%"} />}
          <Pressable
            onPress={() =>
              GBToast(
                "Geobench 1.7.1",
                `@mistergooddeal/rn-components ${infos.version}`,
                "info"
              )
            }
          >
            <GBImage
              source={require("../../assets/images/bench.png")}
              size={"5%"}
            />
          </Pressable>

          <Spacer visible={false} space={"2%"} />
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
          alignItems={"center"}
          color={darkMode ? ColorsDark.background : Colors.background}
          extraStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        >
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              width: wp("100%"),
            }}
            showsVerticalScrollIndicator={false}
          >
            <Spacer space={"5%"} visible={false} />
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
            <Spacer visible={false} space={"2%"} />
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
            <Spacer visible={false} space={"2%"} />
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
            <Spacer visible={false} space={"2%"} />
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

            <Spacer visible={false} space={"5%"} />

            <GBButton
              onPress={() =>
                nav.navigate("ForgotPassword", { changePassword: true })
              }
              width={wp("90%")}
            >
              {Lang.settings.button_password}
            </GBButton>
            <Spacer visible={false} space={"2%"} />
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
            <Spacer visible={false} space={"5%"} />

            {/* <View>
              <GBPicker
                items={availableLanguages}
                setPickedItem={setLang}
                value={lang}
                placeholder={Lang.chooseLanguage}
                darkMode={darkMode}
                width={wp("90%")}
              />
            </View> */}
            <GBText
              style="regular"
              color={darkMode ? Colors.white : Colors.darkGrey}
              size={"1.5%"}
            >
              {Lang.lang.cantSee}
            </GBText>
            <GBLink
              size="1.5%"
              onPress={() =>
                Linking.openURL("https://forms.gle/rL3sHwErKsfobWJv8")
              }
            >
              {Lang.lang.help}
            </GBLink>
            <Spacer space={"5%"} visible={false} />
          </ScrollView>
        </GBContainer>
      </GBContainer>
    </GBKeyboardDismiss>
  );
};
