import * as React from "react";
import { StyleSheet, Modal, View, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import { Lang } from "../constants/Lang";
import { hp, wp } from "../utils/functions";
import { GBButton } from "./GBButton";
import { GBContainer } from "./GBContainer";
import { GBImage } from "./GBImage";
import { GBInput } from "./GBInput";
import { GBSpacer } from "./GBSpacer";
import { GBText } from "./GBText";

interface GBPopupResetProps {
  visible: boolean;
  code: React.Dispatch<React.SetStateAction<string>>;
  pwd1: React.Dispatch<React.SetStateAction<string>>;
  pwd2: React.Dispatch<React.SetStateAction<string>>;
  valid: () => void;
  onClose: () => void;
  canSend: boolean;
  message: string;
}

export const GBPopupReset: React.FunctionComponent<GBPopupResetProps> = ({
  visible,
  code,
  pwd1,
  pwd2,
  valid,
  canSend,
  message,
  onClose,
}) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <GBImage
            size={"2.2%"}
            source={require("../assets/images/close.png")}
            tint={Colors.main}
          />
        </TouchableOpacity>
        <GBImage
          source={require("../assets/images/password.png")}
          size={"5%"}
        />
        <GBSpacer visible={false} space={"1%"} />
        <GBText style={"bold"} size={"3%"}>
          {Lang.forgotPassword.mail_title}
        </GBText>
        <GBSpacer visible={false} space={"1%"} />
        <GBText style={"regular"} size={"1.5%"} align={"justify"}>
          {Lang.forgotPassword.mail_text}
        </GBText>
        <GBSpacer visible={false} space={"1.5%"} />
        <GBInput
          multiline={false}
          nbLines={1}
          hook={code}
          width={wp("20%")}
          type={"numeric"}
          maxLength={6}
          textAlign={"center"}
          placeholder={Lang.forgotPassword.ph_code}
        />
        <GBText
          style={"regular"}
          size={"1.2%"}
          align={"justify"}
          color={Colors.darkGrey}
        >
          {Lang.forgotPassword.code_hint}
        </GBText>
        <GBSpacer visible={false} space={"1.5%"} />
        <GBInput
          multiline={false}
          nbLines={1}
          hook={pwd1}
          width={wp("60%")}
          placeholder={Lang.register.ph_pwd1}
          isPassword={true}
        />
        <GBSpacer visible={false} space={"1.5%"} />
        <GBInput
          multiline={false}
          nbLines={1}
          hook={pwd2}
          width={wp("60%")}
          placeholder={Lang.register.ph_pwd2}
          isPassword={true}
        />
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
        <GBSpacer visible={false} space={"3%"} />
        <GBButton onPress={valid} disable={!canSend} width={wp("50%")}>
          {Lang.forgotPassword.button}
        </GBButton>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalView: {
    width: "70%",
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: hp("3%"),
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    textAlign: "center",
    fontSize: hp("5%"),
    color: Colors.darkGrey,
    marginBottom: hp("5%"),
  },
  spinner: {
    padding: hp("5%"),
  },
  spinnerOnly: {
    position: "absolute",
    top: 0,
    alignItems: "center",
  },
});
