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

const BENCH_RATING = require("../assets/images/bench.png");

interface GBBenchDetailsProps {
  darkMode: boolean;
  visible: boolean;
  banc: Banc | null;
  onClose: () => void;
  hook: React.Dispatch<React.SetStateAction<string>>;
  sendComment: () => void;
  index: number;
  buttonUsable: boolean;
  updateFav: () => void;
  isFav: boolean;
}

export const GBBenchDetails: React.FunctionComponent<GBBenchDetailsProps> = ({
  darkMode,
  visible,
  banc,
  index,
  onClose,
  hook,
  sendComment,
  buttonUsable,
  isFav,
  updateFav,
}) => (
  <Modal animationType="slide" transparent={true} visible={visible}>
    {banc !== null && (
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {
              backgroundColor: darkMode ? ColorsDark.background : Colors.white,
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
          <TouchableOpacity
            onPress={() =>
              openMap(
                banc.latitude,
                banc.longitude,
                `${Lang.map.bench} ${index}`
              )
            }
            style={{
              position: "absolute",
              top: 10,
              left: 10,
            }}
          >
            <GBImage
              size={"2.5%"}
              source={require("../assets/images/navigation/map.png")}
              tint={Colors.main}
            />
          </TouchableOpacity>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <GBText
              size={"3.5%"}
              style={"black"}
              align={"center"}
              color={darkMode ? ColorsDark.white : Colors.black}
            >
              {`${Lang.map.bench} ${index}`}
            </GBText>
            <GBText
              size={"1.5%"}
              style={"regular"}
              align={"center"}
              color={darkMode ? ColorsDark.white : Colors.darkGrey}
            >
              {JSON.parse(banc!.commetaire).utilisateur === ""
                ? Lang.map.no_comment
                : `❝${unescape(JSON.parse(banc!.commetaire).utilisateur)}❞`}
            </GBText>
            <GBSpacer visible={false} space={"2%"} />
            <Rating
              type="star"
              startingValue={banc.note}
              fractions={5}
              imageSize={hp("4%")}
              readonly={true}
              tintColor={darkMode ? ColorsDark.background : undefined}
            />
            <GBSpacer visible={false} space={"2%"} />
            <GBText
              size={"1.8%"}
              style={"regular"}
              color={darkMode ? ColorsDark.white : Colors.darkGrey}
              align={"justify"}
            >
              {`${Lang.map.location.text} ${
                Lang.map.location.array[parseInt(banc.lieu)]
              } ${Lang.map.environnement.text} ${
                Lang.map.environnement.array[parseInt(banc.environnement) - 1]
              }`}
            </GBText>
            {banc.nom_photo !== "" && (
              <GBContainer alignItems={"center"}>
                <GBSpacer visible={false} space={"1%"} />
                <Image
                  source={{
                    uri: banc.nom_photo,
                  }}
                  style={{
                    width: wp("67%"),
                    height: hp("20%"),
                    resizeMode: "cover",
                    borderRadius: 10,
                  }}
                />
              </GBContainer>
            )}
            <GBSpacer visible={false} space={"1%"} />
            <GBText
              size={"1.8%"}
              style={"bold"}
              color={darkMode ? ColorsDark.white : Colors.darkGrey}
              align={"justify"}
            >
              {Lang.map.community_comments}
            </GBText>
            {JSON.parse(banc.commetaire).communaute.length === 0 && (
              <GBText
                size={"1.7%"}
                style={"regular"}
                color={darkMode ? ColorsDark.white : Colors.darkGrey}
                align={"justify"}
              >
                {Lang.map.no_comment}
              </GBText>
            )}
            {JSON.parse(banc.commetaire).communaute.length !== 0 && (
              <GBContainer>
                {JSON.parse(banc.commetaire).communaute.map(
                  (c: { user: string; comment: string }, i: number) => (
                    <GBContainer key={i}>
                      <GBSpacer
                        visible={true}
                        space={"1.5%"}
                        width={"100%"}
                        color={Colors.main}
                      />
                      <GBText
                        size={"1.7%"}
                        style={"regular"}
                        color={darkMode ? ColorsDark.white : Colors.darkGrey}
                        align={"justify"}
                      >
                        {c.comment}
                      </GBText>
                      <GBText
                        size={"1.5%"}
                        style={"bold"}
                        color={darkMode ? ColorsDark.white : Colors.darkGrey}
                        align={"right"}
                      >
                        {c.user}
                      </GBText>
                    </GBContainer>
                  )
                )}
                <GBSpacer
                  visible={true}
                  space={"1.5%"}
                  width={"100%"}
                  color={Colors.main}
                />
              </GBContainer>
            )}
          </ScrollView>
          <GBSpacer visible={false} space={"1%"} />
          <GBInput
            multiline={false}
            nbLines={1}
            hook={hook}
            type={"default"}
            width={wp("69%")}
            maxLength={250}
            placeholder={Lang.map.ph_comment}
            color={darkMode ? ColorsDark.inputColor : undefined}
          />
          <GBSpacer visible={false} space={"1%"} />
          <GBButton onPress={sendComment} disable={!buttonUsable}>
            {Lang.map.comment}
          </GBButton>
          <GBSpacer visible={false} space={"1%"} />
          <GBText
            size={"1.2%"}
            style={"regular"}
            color={darkMode ? ColorsDark.white : Colors.darkGrey}
            align={"center"}
          >
            {`${Lang.map.added_by} ${banc.user}`}
          </GBText>
          <GBSpacer visible={false} space={"2%"} />
          <TouchableOpacity
            onPress={updateFav}
            style={{
              backgroundColor: isFav
                ? Colors.lightRed
                : darkMode
                ? ColorsDark.inputColor
                : Colors.white,
              height: hp("7%"),
              width: hp("7%"),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
              position: "absolute",
              alignSelf: "center",
              bottom: -hp("7%") / 2,
              borderColor: !isFav ? Colors.lightRed : undefined,
              borderWidth: !isFav ? 3 : undefined,
            }}
          >
            <Image
              source={require("../assets/images/heart.png")}
              style={{
                height: hp("3%"),
                width: hp("3%"),
                tintColor: isFav ? Colors.white : Colors.lightRed,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )}
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
    height: "75%",
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
