import * as React from "react";
import { StyleSheet, Modal, View } from "react-native";
import { Colors, ColorsDark } from "../constants/Colors";
import { hp, wp } from "../utils/functions";
import { GBButton } from "./GBButton";
import { GBContainer } from "./GBContainer";
import { GBImage } from "./GBImage";
import { GBSpacer } from "./GBSpacer";
import { GBText } from "./GBText";

interface GBPopupProps {
  visible: boolean;
  title: string;
  content: string;
  image?: "success" | "error" | "bin" | "warning";
  validText: string;
  valid: () => void;
  notValidText?: string;
  notValid?: () => void;
  color?: string;
}

export const GBPopup: React.FunctionComponent<GBPopupProps> = ({
  visible,
  image,
  title,
  content,
  validText,
  valid,
  notValidText,
  notValid,
  color,
}) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View style={styles.centeredView}>
      <View
        style={[
          styles.modalView,
          { backgroundColor: color === undefined ? Colors.white : color },
        ]}
      >
        <GBImage
          source={
            image === "success"
              ? require("../assets/images/popup/success.png")
              : image === "error"
              ? require("../assets/images/popup/error.png")
              : image === "bin"
              ? require("../assets/images/recycling-bin.png")
              : image === "warning"
              ? require("../assets/images/popup/warning.png")
              : undefined
          }
          size={"5%"}
        />
        <GBSpacer visible={false} space={"1%"} />
        <GBText
          style={"bold"}
          size={"3%"}
          color={color === undefined ? undefined : ColorsDark.white}
        >
          {title}
        </GBText>
        <GBSpacer visible={false} space={"2%"} />
        <GBText
          style={"regular"}
          size={"2%"}
          align={"justify"}
          color={color === undefined ? undefined : ColorsDark.white}
        >
          {content}
        </GBText>
        <GBSpacer visible={false} space={"2%"} />
        {notValid === undefined && (
          <GBButton onPress={valid} width={wp("40%")}>
            {validText}
          </GBButton>
        )}
        {notValid !== undefined && (
          <GBContainer direction={"row"}>
            <GBButton
              onPress={valid}
              width={wp("20%")}
              margins={{ right: hp("2.5%") }}
            >
              {validText}
            </GBButton>
            <GBButton
              onPress={notValid!}
              width={wp("20%")}
              margins={{ left: hp("2.5%") }}
            >
              {notValidText!}
            </GBButton>
          </GBContainer>
        )}
        {/* <Spinner
          style={styles.spinner}
          isVisible={true}
          size={70}
          type={"FadingCircleAlt"}
          color={Colors.greengoBlue}
        /> */}
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
