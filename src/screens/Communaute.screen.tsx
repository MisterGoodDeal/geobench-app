import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GBContainer } from "../components/GBContainer";
import { GBImage } from "../components/GBImage";
import { GBLoader } from "../components/GBLoader";
import { GBSpacer } from "../components/GBSpacer";
import { GBStatusBar } from "../components/GBStatusBar";
import { GBText } from "../components/GBText";
import { Colors, ColorsDark } from "../constants/Colors";
import { Lang } from "../constants/Lang";
import { actions } from "../store/action";
import { userSelector } from "../store/slices/userSlice";
import { UserLocal } from "../utils/interface";
import { useKeyboard } from "../utils/keyboard";
import { api } from "../api";
import { GBToast } from "../components/GBToast";
import { GBCard } from "../components/GBCard";
import { Rating } from "react-native-ratings";
import { FullscreenCaroussel, hp } from "@mistergooddeal/rn-components";
import { GBClose } from "../components/GBClose";

export const CommunauteScreen: React.FunctionComponent<null> = () => {
  const {
    userInfo,
    community,
    isFetching,
    isSuccess,
    isError,
    errorMessage,
    darkMode,
  } = useSelector(userSelector);
  const dispatch = useDispatch();
  const u: UserLocal = userInfo;
  const nav = useNavigation();
  const [keyboardStatus] = useKeyboard();

  const [loader, setLoader] = useState(false);
  const [userPhotosVisible, setUserPhotosVisible] = useState(false);
  const [communityPhotoVisible, setCommunityPhotoVisible] = useState(false);
  const [communityPhoto, setCommunityPhoto] = useState<any>([]);
  const [userPhoto, setUserPhoto] = useState<any>([]);

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
      let tempUserPhoto: any = [];
      let tempCommunityPhoto: any = [];
      community?.global.pictures.map((p) => {
        tempCommunityPhoto.push(p);
      });
      community?.user.pictures.map((p) => {
        tempUserPhoto.push(p);
      });
      setCommunityPhoto(tempCommunityPhoto);
      setUserPhoto(tempUserPhoto);

      console.log(userPhoto);

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
    <>
      {communityPhotoVisible && (
        <>
          <GBClose onPress={() => setCommunityPhotoVisible(false)} />
          <FullscreenCaroussel
            images={communityPhoto}
            aspectRatio={"portrait"}
            shadow
          />
        </>
      )}
      {userPhotosVisible && (
        <>
          <GBClose onPress={() => setUserPhotosVisible(false)} />
          <FullscreenCaroussel
            images={userPhoto}
            aspectRatio={"portrait"}
            shadow
          />
        </>
      )}
      {!communityPhotoVisible && !userPhotosVisible && (
        <GBContainer
          flex={1}
          color={
            keyboardStatus
              ? Colors.background
              : darkMode
              ? ColorsDark.background
              : Colors.background
          }
        >
          <GBLoader visible={loader} color={"blanc"} />
          <GBStatusBar color={Colors.transparent} textColor={"light-content"} />
          <GBContainer
            flex={1}
            color={keyboardStatus ? Colors.background : Colors.main}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              source={require("../assets/images/stock.jpg")}
              style={{
                position: "absolute",
                width: "100%",
                height: hp("40%"),
                top: -hp("10%"),
              }}
            />
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
            <GBImage
              source={require("../assets/images/bench.png")}
              size={"5%"}
            />
            <GBSpacer visible={false} space={"2%"} />
            <GBContainer
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              extraStyle={{ zIndex: 2 }}
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
            color={darkMode ? ColorsDark.background : Colors.background}
            extraStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
          >
            <GBText
              style={"black"}
              size={"3.5%"}
              align={"center"}
              color={darkMode ? ColorsDark.white : undefined}
            >
              {Lang.community.your_stat}
            </GBText>
            <GBContainer
              direction={"row"}
              justifyContent={"space-evenly"}
              extraStyle={{ width: "100%" }}
            >
              <GBCard
                width={"40%"}
                color={darkMode ? ColorsDark.inputColor : undefined}
              >
                <GBContainer alignItems={"center"} justifyContent={"center"}>
                  <GBText
                    style={"black"}
                    size={"3%"}
                    align={"center"}
                    color={darkMode ? ColorsDark.white : undefined}
                  >
                    {community !== null
                      ? community?.user.benchCount.toString()
                      : "-"}
                  </GBText>
                  <GBImage
                    source={require("../assets/images/bench.png")}
                    size={"5%"}
                  />
                  <GBText
                    style={"regular"}
                    size={"1.5%"}
                    align={"center"}
                    color={darkMode ? ColorsDark.white : undefined}
                  >
                    {Lang.community.bench.user}
                  </GBText>
                </GBContainer>
              </GBCard>
              <TouchableOpacity onPress={() => setUserPhotosVisible(true)}>
                <GBCard
                  width={"40%"}
                  color={darkMode ? ColorsDark.inputColor : undefined}
                >
                  <GBContainer alignItems={"center"} justifyContent={"center"}>
                    <GBText
                      style={"black"}
                      size={"3%"}
                      align={"center"}
                      color={darkMode ? ColorsDark.white : undefined}
                    >
                      {community !== null
                        ? community?.user.photosCount.toString()
                        : "-"}
                    </GBText>
                    <GBImage
                      source={require("../assets/images/camera.png")}
                      size={"5%"}
                    />
                    <GBText
                      style={"regular"}
                      size={"1.5%"}
                      align={"center"}
                      color={darkMode ? ColorsDark.white : undefined}
                    >
                      {Lang.community.photo.user}
                    </GBText>
                  </GBContainer>
                </GBCard>
              </TouchableOpacity>
            </GBContainer>
            <GBSpacer visible={false} space={"2%"} />
            <GBCard
              width={"85%"}
              color={darkMode ? ColorsDark.inputColor : undefined}
            >
              <GBText
                style={"regular"}
                size={"1.5%"}
                align={"center"}
                color={darkMode ? ColorsDark.white : undefined}
              >
                {`${Lang.community.rating} ${community?.user.avgBench.text}`}
              </GBText>
              <GBSpacer visible={false} space={".5%"} />
              <Rating
                type="star"
                startingValue={community?.user.avgBench.full}
                fractions={5}
                imageSize={hp("4%")}
                readonly={true}
                tintColor={darkMode ? ColorsDark.inputColor : Colors.white}
              />
            </GBCard>
            <GBSpacer visible={false} space={"5%"} />
            <GBText
              style={"black"}
              size={"3.5%"}
              align={"center"}
              color={darkMode ? ColorsDark.white : undefined}
            >
              {Lang.community.community}
            </GBText>
            <GBContainer
              direction={"row"}
              justifyContent={"space-evenly"}
              extraStyle={{ width: "100%" }}
            >
              <GBCard
                width={"30%"}
                color={darkMode ? ColorsDark.inputColor : undefined}
              >
                <GBContainer alignItems={"center"} justifyContent={"center"}>
                  <GBText
                    style={"black"}
                    size={"3%"}
                    align={"center"}
                    color={darkMode ? ColorsDark.white : undefined}
                  >
                    {community !== null
                      ? community?.global.benchCount.toString()
                      : "-"}
                  </GBText>
                  <GBImage
                    source={require("../assets/images/bench.png")}
                    size={"5%"}
                  />
                  <GBText
                    style={"regular"}
                    size={"1.5%"}
                    align={"center"}
                    color={darkMode ? ColorsDark.white : undefined}
                  >
                    {Lang.community.bench.community}
                  </GBText>
                </GBContainer>
              </GBCard>
              <TouchableOpacity onPress={() => setCommunityPhotoVisible(true)}>
                <GBCard
                  width={"30%"}
                  color={darkMode ? ColorsDark.inputColor : undefined}
                >
                  <GBContainer alignItems={"center"} justifyContent={"center"}>
                    <GBText
                      style={"black"}
                      size={"3%"}
                      align={"center"}
                      color={darkMode ? ColorsDark.white : undefined}
                    >
                      {community !== null
                        ? community.global.photosCount.toString()
                        : "-"}
                    </GBText>
                    <GBImage
                      source={require("../assets/images/camera.png")}
                      size={"5%"}
                    />
                    <GBText
                      style={"regular"}
                      size={"1.5%"}
                      align={"center"}
                      color={darkMode ? ColorsDark.white : undefined}
                    >
                      {Lang.community.photo.community}
                    </GBText>
                  </GBContainer>
                </GBCard>
              </TouchableOpacity>
              <GBCard
                width={"30%"}
                color={darkMode ? ColorsDark.inputColor : undefined}
              >
                <GBContainer alignItems={"center"} justifyContent={"center"}>
                  <GBText
                    style={"black"}
                    size={"3%"}
                    align={"center"}
                    color={darkMode ? ColorsDark.white : undefined}
                  >
                    {community !== null
                      ? community.global.usersCount.toString()
                      : "-"}
                  </GBText>
                  <GBImage
                    source={require("../assets/images/users.png")}
                    size={"5%"}
                  />
                  <GBText
                    style={"regular"}
                    size={"1.5%"}
                    align={"center"}
                    color={darkMode ? ColorsDark.white : undefined}
                  >
                    {Lang.community.user}
                  </GBText>
                </GBContainer>
              </GBCard>
            </GBContainer>
          </GBContainer>
        </GBContainer>
      )}
    </>
  );
};
