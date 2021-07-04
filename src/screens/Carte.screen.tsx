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
import { GBBenchDetails } from "../components/GBBenchDetails";
import { Banc } from "../store/model/map";
import { userSelector } from "../store/slices/userSlice";
import { Lang } from "../constants/Lang";
import { GBAddBench } from "../components/GBAddBench";
import { GBToast } from "../components/GBToast";

const marker = require("../assets/images/map/marker.png");

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

  // Gestion de l'ajout d'un banc
  const [addBench, setAddBench] = useState(false);
  const [sendButton, setSendButton] = useState(false);
  const [note, setNote] = useState(0);
  const [lieu, setLieu] = useState(0);
  const [environnement, setEnvironnement] = useState(0);
  const [commentaire, setCommentaire] = useState("");
  const [photo, setPhoto] = useState<any>(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [benchUploaded, setBenchUploaded] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const {
    isFetching,
    isSuccess,
    isError,
    errorMessage,
    bancs,
    imageURL,
    isUploaded,
  } = useSelector(mapSelector);
  const { userInfo } = useSelector(userSelector);
  React.useEffect(() => {
    if (isFetching) {
      // Handle fetching
      setLoading(true);
    }
    if (isSuccess) {
      // Handle success
      setLoading(false);
      dispatch(actions.map.clearState());
      if (comment.length >= 10) {
        GBToast(
          Lang.map.commentSuccess.title,
          Lang.map.commentSuccess.text,
          "success"
        );
        setComment("");
        dispatch(api.benches.get({}));
        console.log("success after comment");
      } else if (photoUploaded) {
        uploadBench();
        setPhotoUploaded(false);
      } else if (isUploaded) {
        console.log("uploaded");
        GBToast(
          Lang.map.add.upload.success.title,
          Lang.map.add.upload.success.message,
          "success"
        );
        resetAddBanc();
        dispatch(api.benches.get({}));
        setBenchUploaded(false);
      }
    }
    if (isError) {
      // Handle error
      setLoading(false);
      if (comment.length >= 10) {
        setComment("");
        GBToast(Lang.map.commentFail.title, Lang.map.commentFail.text, "error");
      } else if (photoUploaded) {
        GBToast(
          Lang.map.add.photoToast.error.title,
          Lang.map.add.photoToast.error.textUpload,
          "error"
        );
        uploadBench();
      } else if (isUploaded) {
        setLoading(false);
        GBToast(
          Lang.map.add.upload.error.title,
          Lang.map.add.upload.error.message,
          "error"
        );
        setBenchUploaded(false);
        resetAddBanc();
      }
      dispatch(actions.map.clearState());
    }
  }, [isFetching, isSuccess, isError, errorMessage]);

  React.useEffect(() => {
    getCurrentLocation();
  }, []);

  React.useEffect(() => {
    if (note === 0 || lieu === -1 || environnement === -1) {
      setSendButton(false);
    } else {
      setSendButton(true);
    }
  }, [note, lieu, environnement, commentaire, photo]);

  React.useEffect(() => {
    if (
      photo?.hasOwnProperty("errorCode") ||
      photo?.hasOwnProperty("errorMessage")
    ) {
      Toast.show({
        type: "error",
        position: "top",
        text1: Lang.map.add.photoToast.error.title,
        text2: Lang.map.add.photoToast.error.text,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {
          Toast.hide();
        },
      });
    } else if (photo?.didCancel === true) {
      Toast.show({
        type: "info",
        position: "top",
        text1: Lang.map.add.photoToast.close.title,
        text2: Lang.map.add.photoToast.close.text,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {
          Toast.hide();
        },
      });
    } else if (photo?.hasOwnProperty("assets")) {
      Toast.show({
        type: "success",
        position: "top",
        text1: Lang.map.add.photoToast.success.title,
        text2: Lang.map.add.photoToast.success.text,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {},
        onPress: () => {
          Toast.hide();
        },
      });
    }
  }, [photo]);

  const resetAddBanc = () => {
    dispatch(actions.map.clearState());
    dispatch(actions.map.clearUpload());
    dispatch(actions.map.clearImage());

    setNote(0);
    setLieu(-1);
    setEnvironnement(-1);
    setCommentaire("");
    setPhoto(null);
    setSendButton(false);
    setPhotoUploaded(false);
    setBenchUploaded(false);
    setAddBench(false);
    setUploaded(false);
  };

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
      (error) =>
        GBToast(
          Lang.map.position.error.title,
          Lang.map.position.error.message,
          "info"
        ),
      {
        enableHighAccuracy: true,
        timeout: 5000,
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
          console.log("success after useFocus");
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

  const handleBenchSubmit = () => {
    if (photo?.hasOwnProperty("assets")) {
      const photoBase64 = photo.assets[0].base64;
      setPhotoUploaded(true);
      setLoading(true);
      dispatch(api.benches.uploadImage({ image: photoBase64 }));
    } else {
      uploadBench();
    }
  };

  const uploadBench = () => {
    setBenchUploaded(true);
    if (!uploaded) {
      setUploaded(true);
      Geolocation.getCurrentPosition(
        async (position) => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.0,
          };
          setUserCoordinates(region);
          dispatch(
            api.benches.post({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              note: note,
              lieu: `${lieu}`,
              environnement: `${environnement}`,
              commetaire: commentaire,
              nom_photo: imageURL !== undefined ? imageURL : "",
            })
          );
        },
        (error) =>
          GBToast(
            Lang.map.position.bench_error.title,
            Lang.map.position.bench_error.message,
            "error"
          ),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 1000,
        }
      );
    }
  };

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
        initialRegion={initialRegion}
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

      <GBAddBench
        visible={addBench}
        onClose={() => resetAddBanc()}
        addBench={() => handleBenchSubmit()}
        buttonUsable={sendButton}
        setNote={setNote}
        setLieu={setLieu}
        setEnvironnement={setEnvironnement}
        setCommentaire={setCommentaire}
        setPhoto={setPhoto}
      />

      <GBMapButton
        mv={mapRef}
        userCoordinates={userCoordinates}
        hookAddBench={setAddBench}
      />
    </GBContainer>
  );
};
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
