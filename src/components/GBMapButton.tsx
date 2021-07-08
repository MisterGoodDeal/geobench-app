import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";
import { hp } from "../utils/functions";
import { GBRoundButton } from "./GBRoundButton";

interface GBMapButtonProps {
  mv: any;
  userCoordinates: any;
  hookAddBench: any;
  filter: () => void;
}

export const GBMapButton: React.FunctionComponent<GBMapButtonProps> = ({
  mv,
  userCoordinates,
  hookAddBench,
  filter,
}) => (
  <>
    <View style={{ position: "absolute", top: hp("7%"), right: hp("2%") }}>
      <GBRoundButton
        disable={false}
        onPress={() =>
          mv.current.animateCamera(
            {
              center: userCoordinates,
              pitch: 10,
              heading: 20,
              altitude: 10,
              zoom: 15,
            },
            1000
          )
        }
        width={"3%"}
        color={Colors.mainDark}
        icon={require("../assets/images/map/cursor.png")}
        tint={Colors.white}
      />
    </View>
    <View style={{ position: "absolute", top: hp("15%"), right: hp("2%") }}>
      <GBRoundButton
        disable={false}
        onPress={() => hookAddBench(true)}
        width={"3%"}
        color={Colors.mainDark}
        icon={require("../assets/images/map/add.png")}
        tint={Colors.white}
      />
    </View>
    <View style={{ position: "absolute", top: hp("23%"), right: hp("2%") }}>
      <GBRoundButton
        disable={false}
        onPress={filter}
        width={"3%"}
        color={Colors.mainDark}
        icon={require("../assets/images/filter.png")}
        tint={Colors.white}
      />
    </View>
  </>
);

const styles = StyleSheet.create({});
