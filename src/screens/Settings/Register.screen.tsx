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
import { GBBack } from "../../components/GBBack";
import { ScrollView } from "react-native";
import { GBLink } from "../../components/GBLink";

export const RegisterScreen: React.FunctionComponent<null> = () => {
  const nav = useNavigation();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd1, setPdw1] = useState("");
  const [pwd2, setPdw2] = useState("");

  React.useEffect(() => {
    nav.setOptions({ tabBarVisible: false });
  }, [nav]);
  return (
    <GBContainer
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      color={Colors.background}
    >
      <GBStatusBar color={Colors.background} textColor={"dark-content"} />

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
      >
        {email}
      </GBInput>
      <GBSpacer space={"1%"} visible={false} />
      <GBInput
        multiline={false}
        nbLines={1}
        placeholder={Lang.register.ph_username}
        hook={setUsername}
      >
        {username}
      </GBInput>
      <GBSpacer space={"3%"} visible={false} />
      <GBInput
        multiline={false}
        nbLines={1}
        placeholder={Lang.register.ph_pwd1}
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
      >
        {pwd2}
      </GBInput>
      <GBSpacer space={"1%"} visible={false} />

      <GBSpacer space={"4%"} visible={false} />
      <GBButton onPress={() => console.log("test")}>
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
