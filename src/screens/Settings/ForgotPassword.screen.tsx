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
import { GBBack } from "../../components/GBBack";

export const ForgotPasswordScreen: React.FunctionComponent<null> = () => {
  const nav = useNavigation();
  const [email, setEmail] = useState("");

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
      <GBBack onPress={() => nav.goBack()} />
      <GBImage
        source={require("../../assets/images/password.png")}
        size={"12%"}
      />
      <GBSpacer space={"8%"} visible={false} />
      <GBText size={"2.2%"} style={"bold"} color={Colors.darkGrey}>
        {Lang.forgotPassword.title}
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
      >
        {email}
      </GBInput>

      <GBSpacer space={"5%"} visible={false} />
      <GBButton onPress={() => console.log("test")}>
        {Lang.forgotPassword.button}
      </GBButton>
    </GBContainer>
  );
};
