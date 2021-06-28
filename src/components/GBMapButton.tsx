import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";
import { hp } from "../utils/functions";
import { GBRoundButton } from "./GBRoundButton";

interface GBMapButtonProps {
  mv: any;
  userCoordinates: any;
}

export const GBMapButton: React.FunctionComponent<GBMapButtonProps> = ({
  mv,
  userCoordinates,
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
        color={Colors.main}
        icon={require("../assets/images/map/cursor.png")}
        tint={Colors.white}
      />
    </View>
    <View style={{ position: "absolute", top: hp("15%"), right: hp("2%") }}>
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
        color={Colors.main}
        icon={require("../assets/images/map/add.png")}
        tint={Colors.white}
      />
    </View>
  </>
);

const styles = StyleSheet.create({});
