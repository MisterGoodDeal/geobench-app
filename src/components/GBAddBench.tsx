import * as React from "react";
import {
  StyleSheet,
  Modal,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors, ColorsDark } from "../constants/Colors";
import { Lang } from "../constants/Lang";
import { Banc } from "../store/model/map";
import { hp, openMap, wp } from "../utils/functions";
import { GBButton } from "./GBButton";
import { GBContainer } from "./GBContainer";
import { GBImage } from "./GBImage";
import { GBSpacer } from "./GBSpacer";
import { GBText } from "./GBText";
import { Rating } from "react-native-ratings";
import { GBInput } from "./GBInput";
import { GBRoundButton } from "./GBRoundButton";
import { AddBench } from "../utils/interface";
import { GBPicker, pickerSelectStyles } from "./GBPicker";
import { launchCamera } from "react-native-image-picker";

const BENCH_RATING = require("../assets/images/bench.png");

interface GBAddBenchProps {
  visible: boolean;
  onClose: () => void;
  addBench: () => void;
  buttonUsable: boolean;
  setNote: React.Dispatch<React.SetStateAction<number>>;
  setLieu: React.Dispatch<React.SetStateAction<number>>;
  setEnvironnement: React.Dispatch<React.SetStateAction<number>>;
  setCommentaire: React.Dispatch<React.SetStateAction<string>>;
  setPhoto: any;
  darkMode: boolean;
}

export const GBAddBench: React.FunctionComponent<GBAddBenchProps> = ({
  visible,
  onClose,
  addBench,
  buttonUsable,
  setNote,
  setLieu,
  setEnvironnement,
  setCommentaire,
  setPhoto,
  darkMode,
}) => (
  <Modal animationType="slide" transparent={true} visible={visible}>
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

        <GBText
          size={"4%"}
          style={"extra-bold"}
          align={"center"}
          color={darkMode ? ColorsDark.white : Colors.black}
        >
          {Lang.map.add.title}
        </GBText>
        <GBSpacer visible={false} space={"2%"} />
        <Rating
          type="star"
          startingValue={0}
          fractions={5}
          imageSize={hp("4%")}
          readonly={false}
          onFinishRating={(rating: number) => setNote(rating)}
          tintColor={darkMode ? ColorsDark.background : undefined}
        />
        <GBText
          size={"1.4%"}
          style={"regular"}
          align={"center"}
          color={darkMode ? ColorsDark.white : Colors.black}
        >
          {Lang.map.add.rating}
        </GBText>
        <GBSpacer visible={false} space={"2%"} />
        <GBPicker
          placeholder={Lang.map.add.ph_location}
          items={Lang.map.add.location}
          setPickedItem={setLieu}
          darkMode={darkMode}
        />
        <GBSpacer visible={false} space={"2%"} />
        <GBPicker
          placeholder={Lang.map.add.ph_environment}
          items={Lang.map.add.environment}
          setPickedItem={setEnvironnement}
          darkMode={darkMode}
        />
        <GBSpacer visible={false} space={"2%"} />
        <GBInput
          multiline={false}
          nbLines={1}
          hook={setCommentaire}
          type={"default"}
          width={wp("69%")}
          maxLength={250}
          placeholder={Lang.map.add.comment}
          color={darkMode ? ColorsDark.inputColor : Colors.inputColor}
        />
        <GBSpacer visible={false} space={"2%"} />
        <GBButton
          onPress={() =>
            launchCamera(
              {
                saveToPhotos: false,
                mediaType: "photo",
                includeBase64: true,
                quality: 0.5,
              },
              setPhoto
            )
          }
          disable={false}
        >
          {Lang.map.add.photo}
        </GBButton>
        <GBSpacer visible={false} space={"4%"} />
        <GBButton onPress={addBench} disable={!buttonUsable}>
          {Lang.map.add.button}
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
