import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text } from "react-native";
import { GBContainer } from "../components/GBContainer";
import { Colors } from "../constants/Colors";
import { localStorage } from "../services/localStorage.service";
import { useNavigation } from "@react-navigation/native";
import { actions } from "../store/action";
import { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapView from "react-native-map-clustering";
import Toast from "react-native-toast-message";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import { GBStatusBar } from "../components/GBStatusBar";
import { GBMapButton } from "../components/GBMapButton";
import { api } from "../api";
import { GBLoader } from "../components/GBLoader";
import { mapSelector } from "../store/slices/mapSlice";
import { GBImage } from "../components/GBImage";
import { hp } from "../utils/functions";
import { GBBenchDetails } from "../components/GBBenchDetails";
import { Banc } from "../store/model/map";
import { userSelector } from "../store/slices/userSlice";
import { Lang } from "../constants/Lang";

const marker = require("../assets/images/map/pin.png");

export const CarteScreen: React.FunctionComponent<null> = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const mapRef = React.useRef();
  const [initialRegion, setInitialRegion] = useState<any>({
    latitude: 48.856614,
    longitude: 2.3522219,
    latitudeDelta: 0.2,
    longitudeDelta: 0.0,
  });
  const parisRegion = {
    latitude: 48.856614,
    longitude: 2.3522219,
    latitudeDelta: 0.2,
    longitudeDelta: 0.0,
  };
  interface BenchDetail {
    visible: boolean;
    bench: Banc | null;
  }
  const [benchDetails, setBenchDetails] = useState<BenchDetail>({
    visible: false,
    bench: null,
  });
  const [userCoordinates, setUserCoordinates] = useState<any>();
  const [mv, setMv] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [usable, setUsable] = useState(false);
  const [comment, setComment] = useState("");
  const { isFetching, isSuccess, isError, errorMessage, bancs } =
    useSelector(mapSelector);
  const { userInfo } = useSelector(userSelector);
  React.useEffect(() => {
    if (isFetching) {
      // Handle fetching
      setLoading(true);
    }
    if (isSuccess) {
      // Handle success
      setLoading(false);
      if (comment.length >= 10) {
        Toast.show({
          type: "success",
          position: "top",
          text1: Lang.map.commentSuccess.title,
          text2: Lang.map.commentSuccess.text,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {},
          onPress: () => {},
        });
        setComment("");
        dispatch(api.benches.get({}));
      }
    }
    if (isError) {
      // Handle error
      setLoading(false);
      setComment("");
      console.log(errorMessage);
      Toast.show({
        type: "error",
        position: "top",
        text1: Lang.map.commentFail.title,
        text2: Lang.map.commentFail.text,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {},
      });
    }
  }, [isFetching, isSuccess, isError, errorMessage]);

  React.useEffect(() => {
    getCurrentLocation();
  }, []);

  React.useEffect(() => {
    comment.length >= 10 && comment.length <= 250
      ? setUsable(true)
      : setUsable(false);
  }, [comment]);

  async function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      async (position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.0,
        };
        setUserCoordinates(region);
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      //Quand le composant est affiché
      (async () => {
        const user = await localStorage.get("user");
        if (user !== "") {
          dispatch(actions.user.setUser(JSON.parse(user)));
          dispatch(api.benches.get({}));
          getCurrentLocation();
        } else {
          nav.navigate("Login");
        }
      })();

      return () => {
        // Quand le composant est déaffiché
      };
    }, [])
  );

  return (
    <GBContainer
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      color={Colors.background}
    >
      <GBLoader visible={loading} color={"noir"} />
      <GBStatusBar color={Colors.transparent} textColor={"dark-content"} />
      <MapView
        showsMyLocationButton={false}
        showsScale={false}
        ref={mapRef}
        showsCompass={false}
        initialRegion={parisRegion}
        moveOnMarkerPress={true}
        showsPointsOfInterest={false}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        clusterColor={Colors.main}
        clusterFontFamily={"Poppins-Black"}
      >
        {bancs.map((b, index) => (
          <Marker
            key={b.id}
            coordinate={{ latitude: b.latitude, longitude: b.longitude }}
            title={`Banc`}
            description={`Banc n°${b.id}`}
            image={marker}
            onPress={(e) => {
              setBenchDetails({
                visible: true,
                bench: b,
              });
            }}
          >
            <Callout tooltip={true}>
              <Text></Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <GBBenchDetails
        banc={benchDetails.bench}
        visible={benchDetails.visible}
        buttonUsable={usable}
        hook={setComment}
        sendComment={() =>
          dispatch(
            api.benches.comment({
              username: userInfo.pseudo,
              commentaire: comment,
              banc: benchDetails.bench!.id,
            })
          )
        }
        onClose={() => {
          setBenchDetails({
            visible: false,
            bench: null,
          });
          setComment("");
        }}
      />
      <GBMapButton mv={mapRef} userCoordinates={userCoordinates} />
    </GBContainer>
  );
};
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
