import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { Platform, View, Text } from "react-native";
import { ScrollView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GBContainer } from "../components/GBContainer";
import { GBImage } from "../components/GBImage";
import { GBLoader } from "../components/GBLoader";
import { GBSpacer } from "../components/GBSpacer";
import { GBStatusBar } from "../components/GBStatusBar";
import { GBText } from "../components/GBText";
import { Colors } from "../constants/Colors";
import { Lang } from "../constants/Lang";
import { actions } from "../store/action";
import { userSelector } from "../store/slices/userSlice";
import { UserLocal } from "../utils/interface";
import { useKeyboard } from "../utils/keyboard";
import { api } from "../api";
import { hp } from "../utils/functions";
import { GBToast } from "../components/GBToast";
import { GBCard } from "../components/GBCard";
import { Rating } from "react-native-ratings";

export const CommunauteScreen: React.FunctionComponent<null> = () => {
  const { userInfo, community, isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const dispatch = useDispatch();
  const u: UserLocal = userInfo;
  const nav = useNavigation();
  const [keyboardStatus] = useKeyboard();

  const [loader, setLoader] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      //Quand le composant est affiché
      dispatch(api.communaute.get({}));

      return () => {
        // Quand le composant est déaffiché
      };
    }, [])
  );

  React.useEffect(() => {
    if (isFetching) {
      setLoader(true);
    }
    if (isSuccess) {
      console.log(community);

      setLoader(false);
      dispatch(actions.user.clearState());
    }
    if (isError) {
      GBToast(
        Lang.community.error.title,
        Lang.community.error.message,
        "error"
      );
      setLoader(false);
      dispatch(actions.user.clearState());
    }
  }, [isFetching, isSuccess, isError]);

  return (
    <GBContainer
      flex={1}
      color={keyboardStatus ? Colors.background : Colors.main}
    >
      <GBLoader visible={loader} color={"blanc"} />
      <GBStatusBar color={Colors.transparent} textColor={"light-content"} />
      <GBContainer
        flex={1}
        color={keyboardStatus ? Colors.background : Colors.main}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {community !== null && (
          <Image
            source={{
              uri: community.background.url,
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: hp("40%"),
              top: -hp("10%"),
            }}
          />
        )}
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: hp("100%"),
            backgroundColor: Colors.black,
            opacity: 0.3,
          }}
        ></View>
        <Text
          style={{
            color: Colors.white,
            fontFamily: "Poppins-Regular",
            fontSize: hp("1.2%"),
            fontStyle: "italic",
            position: "absolute",
            bottom: 0,
          }}
        >
          {Lang.community.photo_by} {community?.background.user}
        </Text>
        <GBImage source={require("../assets/images/bench.png")} size={"5%"} />
        <GBSpacer visible={false} space={"2%"} />
        <GBContainer
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <GBText color={Colors.white} size={"3%"} style={"regular"}>
            {Lang.community.hello}
          </GBText>
          <GBText color={Colors.white} size={"3%"} style={"extra-bold"}>
            {u?.prenom}
          </GBText>
          <GBText color={Colors.white} size={"3%"} style={"regular"}>
            {Lang.community.exclamation}
          </GBText>
        </GBContainer>
        <GBText color={Colors.white} size={"1.5%"} style={"regular"}>
          {Lang.community.subtext}
        </GBText>
      </GBContainer>
      <GBContainer
        flex={3}
        justifyContent={"center"}
        alignItems={"center"}
        color={Colors.background}
        extraStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
      >
        <GBText style={"black"} size={"3.5%"} align={"center"}>
          {Lang.community.your_stat}
        </GBText>
        <GBContainer
          direction={"row"}
          justifyContent={"space-evenly"}
          extraStyle={{ width: "100%" }}
        >
          <GBCard width={"40%"}>
            <GBContainer alignItems={"center"} justifyContent={"center"}>
              <GBText style={"black"} size={"3%"} align={"center"}>
                {community !== null
                  ? community?.user.benchCount.toString()
                  : "-"}
              </GBText>
              <GBImage
                source={require("../assets/images/bench.png")}
                size={"5%"}
              />
              <GBText style={"regular"} size={"1.5%"} align={"center"}>
                {Lang.community.bench.user}
              </GBText>
            </GBContainer>
          </GBCard>
          <GBCard width={"40%"}>
            <GBContainer alignItems={"center"} justifyContent={"center"}>
              <GBText style={"black"} size={"3%"} align={"center"}>
                {community !== null
                  ? community?.user.photosCount.toString()
                  : "-"}
              </GBText>
              <GBImage
                source={require("../assets/images/camera.png")}
                size={"5%"}
              />
              <GBText style={"regular"} size={"1.5%"} align={"center"}>
                {Lang.community.photo.user}
              </GBText>
            </GBContainer>
          </GBCard>
        </GBContainer>
        <GBSpacer visible={false} space={"2%"} />
        <GBCard width={"85%"}>
          <GBText style={"regular"} size={"1.5%"} align={"center"}>
            {`${Lang.community.rating} ${community?.user.avgBench.text}`}
          </GBText>
          <GBSpacer visible={false} space={".5%"} />
          <Rating
            type="star"
            startingValue={community?.user.avgBench.full}
            fractions={5}
            imageSize={hp("4%")}
            readonly={true}
            ratingBackgroundColor={Colors.background}
          />
        </GBCard>
        <GBSpacer visible={false} space={"5%"} />
        <GBText style={"black"} size={"3.5%"} align={"center"}>
          {Lang.community.community}
        </GBText>
        <GBContainer
          direction={"row"}
          justifyContent={"space-evenly"}
          extraStyle={{ width: "100%" }}
        >
          <GBCard width={"30%"}>
            <GBContainer alignItems={"center"} justifyContent={"center"}>
              <GBText style={"black"} size={"3%"} align={"center"}>
                {community !== null
                  ? community?.global.benchCount.toString()
                  : "-"}
              </GBText>
              <GBImage
                source={require("../assets/images/bench.png")}
                size={"5%"}
              />
              <GBText style={"regular"} size={"1.5%"} align={"center"}>
                {Lang.community.bench.community}
              </GBText>
            </GBContainer>
          </GBCard>
          <GBCard width={"30%"}>
            <GBContainer alignItems={"center"} justifyContent={"center"}>
              <GBText style={"black"} size={"3%"} align={"center"}>
                {community !== null
                  ? community.global.photosCount.toString()
                  : "-"}
              </GBText>
              <GBImage
                source={require("../assets/images/camera.png")}
                size={"5%"}
              />
              <GBText style={"regular"} size={"1.5%"} align={"center"}>
                {Lang.community.photo.community}
              </GBText>
            </GBContainer>
          </GBCard>
          <GBCard width={"30%"}>
            <GBContainer alignItems={"center"} justifyContent={"center"}>
              <GBText style={"black"} size={"3%"} align={"center"}>
                {community !== null
                  ? community.global.usersCount.toString()
                  : "-"}
              </GBText>
              <GBImage
                source={require("../assets/images/users.png")}
                size={"5%"}
              />
              <GBText style={"regular"} size={"1.5%"} align={"center"}>
                {Lang.community.user}
              </GBText>
            </GBContainer>
          </GBCard>
        </GBContainer>
      </GBContainer>
    </GBContainer>
  );
};
