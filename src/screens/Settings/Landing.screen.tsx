import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
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
import { Colors } from "../../constants/Colors";
import { Lang } from "../../constants/Lang";
import { actions } from "../../store/action";
import { userSelector } from "../../store/slices/userSlice";
import { wp } from "../../utils/functions";
import { UserLocal } from "../../utils/interface";
import { localStorage } from "../../services/localStorage.service";

export const SettingsLandingScreen: React.FunctionComponent<null> = () => {
  const { userInfo } = useSelector(userSelector);
  const dispatch = useDispatch();
  const u: UserLocal = userInfo;
  const nav = useNavigation();

  const [loader, setLoader] = useState(false);

  const [fullname, setFullname] = useState(`${u?.prenom} ${u?.nom}`);
  const [fullnameDisable, setFullnameDisable] = useState(false);
  const [email, setEmail] = useState(`${u?.mail}`);
  const [emailDisable, setEmailDisable] = useState(false);
  const [username, setUsername] = useState("");

  React.useEffect(() => {
    fullname.length === 0
      ? setFullnameDisable(true)
      : setFullnameDisable(false);
    email.length === 0 ? setEmailDisable(true) : setEmailDisable(false);
  }, [fullname, email]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(actions.user.setUser(null));
    nav.navigate("Login");
  };
  return (
    <GBContainer flex={1} color={Colors.main}>
      <GBLoader visible={loader} color={"blanc"} />
      <GBStatusBar color={Colors.transparent} textColor={"dark-content"} />
      <GBContainer
        flex={1}
        color={Colors.main}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {Platform.OS === "android" && <GBSpacer visible={false} space={"6%"} />}
        <GBImage
          source={require("../../assets/images/bench.png")}
          size={"5%"}
        />
        <GBSpacer visible={false} space={"2%"} />
        <GBContainer
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <GBText color={Colors.white} size={"3%"} style={"regular"}>
            {Lang.settings.hello}
          </GBText>
          <GBText color={Colors.white} size={"3%"} style={"extra-bold"}>
            {u?.prenom}
          </GBText>
          <GBText color={Colors.white} size={"3%"} style={"regular"}>
            {Lang.settings.exclamation}
          </GBText>
        </GBContainer>
        <GBText color={Colors.white} size={"1.5%"} style={"light"}>
          {Lang.settings.subtext}
        </GBText>
      </GBContainer>
      <GBContainer
        flex={3}
        justifyContent={"center"}
        alignItems={"center"}
        color={Colors.background}
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
          >
            {fullname}
          </GBInput>
          <GBRoundButton
            width={"2%"}
            color={Colors.main}
            tint={Colors.white}
            icon={require("../../assets/images/edit.png")}
            onPress={() => console.log("")}
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
          >
            {email}
          </GBInput>
          <GBRoundButton
            width={"2%"}
            color={Colors.main}
            tint={Colors.white}
            icon={require("../../assets/images/edit.png")}
            onPress={() => console.log("")}
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
          placeholder={Lang.settings.ph_fullname}
          disable={true}
        >
          {u?.pseudo}
        </GBInput>
        <GBSpacer visible={false} space={"5%"} />
        <GBButton onPress={() => console.log("")}>
          {Lang.settings.button_password}
        </GBButton>
        <GBSpacer visible={false} space={"10%"} />
        <GBButton
          onPress={handleLogout}
          color={Colors.lightRed}
          width={wp("50%")}
        >
          {Lang.settings.button_logout}
        </GBButton>
      </GBContainer>
    </GBContainer>
  );
};
