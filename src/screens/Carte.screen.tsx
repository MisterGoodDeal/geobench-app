import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { GBContainer } from "../components/GBContainer";
import { Colors } from "../constants/Colors";
import { localStorage } from "../services/localStorage.service";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import { GBText } from "../components/GBText";
import { hp, wp } from "../utils/functions";
import { GBModal } from "../components/GBModal";
import { GBPicker } from "../components/GBPicker";
import { GBSpacer } from "../components/GBSpacer";

const marker = require("../assets/images/map/marker.png");
const mymarker = require("../assets/images/map/my_marker.png");
const favmarker = require("../assets/images/map/fav_marker.png");

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
    index: number;
  }
  const [benchDetails, setBenchDetails] = useState<BenchDetail>({
    visible: false,
    bench: null,
    index: -1,
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

  // Gestion des favoris
  const fakeFav = JSON.parse("[397, 0]");
  const [favoris, setFavoris] = useState([]);

  // Gesrtion des filtres
  const [filterVisible, setFilterVisible] = useState(false);
  const [lieuFiltre, setLieuFiltre] = useState(-1);
  const [photoFiltre, setPhotoFiltre] = useState(-1);

  const route = useRoute();

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

  React.useEffect(() => {
    if (userInfo !== undefined) {
      if (userInfo?.favoris !== undefined) {
        setFavoris(JSON.parse(userInfo.favoris));
      }
    }
  }, [userInfo]);

  useFocusEffect(
    React.useCallback(() => {
      //Quand le composant est affiché
      (async () => {
        const user = await localStorage.get("user");
        if (user !== "") {
          dispatch(actions.user.setUser(JSON.parse(user)));

          dispatch(api.benches.get({}));
          getCurrentLocation();
          console.log("Route param => ", route);
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
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 1000,
        }
      );
    }
  };

  const handleFavoris = (id: number) => {
    if (favoris.some((i: number) => i === id)) {
      let tempFav = favoris;
      tempFav.splice(favoris.indexOf(id), 1);
      setFavoris(tempFav);
      let tempUser = {
        id: userInfo.id,
        is_ads: userInfo.is_ads,
        is_banned: userInfo.is_banned,
        is_deleted: userInfo.is_deleted,
        prenom: userInfo.prenom,
        nom: userInfo.nom,
        mail: userInfo.mail,
        pseudo: userInfo.pseudo,
        favoris: JSON.stringify(tempFav),
        reset_key: "0",
      };
      dispatch(actions.user.setUser(tempUser));
      (async () => {
        await localStorage.store("user", JSON.stringify(tempUser));
      })();
    } else {
      let tempFav = favoris;
      tempFav.push(id);
      console.log(tempFav);
      setFavoris(tempFav);
      let tempUser = {
        id: userInfo.id,
        is_ads: userInfo.is_ads,
        is_banned: userInfo.is_banned,
        is_deleted: userInfo.is_deleted,
        prenom: userInfo.prenom,
        nom: userInfo.nom,
        mail: userInfo.mail,
        pseudo: userInfo.pseudo,
        favoris: JSON.stringify(tempFav),
        reset_key: "0",
      };
      dispatch(actions.user.setUser(tempUser));
      (async () => {
        await localStorage.store("user", JSON.stringify(tempUser));
      })();
    }
    dispatch(api.user.updateFavorites({ favoris: JSON.stringify(favoris) }));
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
      <GBModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        animation={"fade"}
      >
        <GBText style={"black"} size={"3%"}>
          {Lang.map.filters.title}
        </GBText>
        <GBSpacer visible={false} space={"2%"} />
        <GBPicker
          items={Lang.map.add.location}
          setPickedItem={setLieuFiltre}
          value={lieuFiltre.toString()}
          placeholder={Lang.map.filters.ph_lieu}
        />
        <GBSpacer visible={false} space={"1%"} />
        <GBPicker
          items={Lang.map.filters.filtre_photo}
          setPickedItem={setPhotoFiltre}
          value={photoFiltre.toString()}
          placeholder={Lang.map.filters.ph_photo}
        />
      </GBModal>
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
        {bancs.map((b, index) => {
          // return (
          //   <Marker
          //     key={b.id}
          //     coordinate={{ latitude: b.latitude, longitude: b.longitude }}
          //     image={
          //       favoris.some((i: number) => i === b.id)
          //         ? favmarker
          //         : userInfo?.pseudo === b.user
          //         ? mymarker
          //         : marker
          //     }
          //     onPress={(e) => {
          //       setBenchDetails({
          //         visible: true,
          //         bench: b,
          //         index: index,
          //       });
          //     }}
          //   >
          //     <Callout tooltip={true}>
          //       <Text></Text>
          //     </Callout>
          //   </Marker>
          // );
          // J'ai aucun filtre
          if (photoFiltre === -1 && lieuFiltre === -1) {
            return displayMaker(b, favoris, userInfo, setBenchDetails, index);
          } else {
            // On ne gère pas le filtre des photos
            if (
              photoFiltre === -1 &&
              lieuFiltre !== -1 &&
              lieuFiltre.toString() === b.lieu
            ) {
              return displayMaker(b, favoris, userInfo, setBenchDetails, index);
            } else {
              // On gère le filtre des photos
              // Je veux les photos
              if (photoFiltre === 1 && b.nom_photo !== "") {
                return displayMaker(
                  b,
                  favoris,
                  userInfo,
                  setBenchDetails,
                  index
                );
              } else if (photoFiltre === 2 && b.nom_photo === "") {
                return displayMaker(
                  b,
                  favoris,
                  userInfo,
                  setBenchDetails,
                  index
                );
              }
            }
          }
        })}
      </MapView>
      <GBBenchDetails
        banc={benchDetails.bench}
        visible={benchDetails.visible}
        buttonUsable={usable}
        hook={setComment}
        index={benchDetails.index + 1}
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
            index: -1,
          });
          setComment("");
        }}
        isFav={favoris.some((i: number) => i === benchDetails.bench?.id)}
        updateFav={() => handleFavoris(benchDetails.bench!.id)}
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
        filter={() => setFilterVisible(true)}
      />
    </GBContainer>
  );
};
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const displayMaker = (
  b: Banc,
  favoris: any,
  userInfo: any,
  setBenchDetails: any,
  index: number
) => {
  return (
    <Marker
      key={b.id}
      coordinate={{ latitude: b.latitude, longitude: b.longitude }}
      image={
        favoris.some((i: number) => i === b.id)
          ? favmarker
          : userInfo?.pseudo === b.user
          ? mymarker
          : marker
      }
      onPress={(e) => {
        setBenchDetails({
          visible: true,
          bench: b,
          index: index,
        });
      }}
    >
      <Callout tooltip={true}>
        <Text></Text>
      </Callout>
    </Marker>
  );
};
