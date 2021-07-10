import * as React from "react";
import { StyleSheet, Modal, View, TouchableOpacity } from "react-native";
import { Colors, ColorsDark } from "../constants/Colors";
import { hp } from "../utils/functions";
import { GBImage } from "./GBImage";

const BENCH_RATING = require("../assets/images/bench.png");

interface GBModalProps {
  visible: boolean;
  animation: "slide" | "fade" | "none";
  children: any;
  onClose: () => void;
  darkMode: boolean;
}

export const GBModal: React.FunctionComponent<GBModalProps> = ({
  visible,
  animation,
  children,
  onClose,
  darkMode,
}) => (
  <Modal animationType={animation} transparent={true} visible={visible}>
    <View style={styles.centeredView}>
      <View
        style={[
          styles.modalView,
          {
            backgroundColor: darkMode
              ? ColorsDark.background
              : Colors.background,
          },
        ]}
      >
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

        {children}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: hp("3%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
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
