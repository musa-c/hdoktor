import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-elements";
import InfoCard from "./InfoCard";
import ProfilePhotoChangeModal from "../../../../components/Modals/ProfilePhotoChangeModal";
import firebase from "firebase/compat/app";

const ProfileComponent = ({
  name,
  avatar,
  email,
  phoneNumber,
  age,
  gender,
  id,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [NewAvatarUri, setNewAvatarUri] = useState("");
  const [ImageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleModalAvatar = () => {
    if (!loading) {
      setModalVisible(!isModalVisible);
    }
  };

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Uyarı⚠️",
        "Bu uygulamanın fotoğraflarınıza erişmesine izin vermeyi reddettiniz.",
        [{ text: "Tamam", style: "cancel" }]
      );

      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    // Explore the result
    // console.log(result);

    if (!result.cancelled) {
      const filename = result.uri.split("/").pop();
      setNewAvatarUri(result.uri);
      setImageName(filename);
      setModalVisible(true);
      //uploadAvatar(result.uri, filename);
    }
  };

  const AvatarUpdate = async (uri, imageName) => {
    const user = firebase.auth().currentUser;
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref("avatars/H_avatars").child(imageName);
    setLoading(true);
    (await ref.put(blob)).ref.getDownloadURL().then((url) => {
      // H_user, D_user-> Hastalarım, Chats avatar güncellenir.
      // !!!! BİLDİRİMLERİN GÜNCELELLENEBİLMESİ İÇİN UNİQUE BİR ALAN OLMASI LAZIM!
      user
        .updateProfile({
          photoURL: url,
        })
        .then(() => {
          firebase
            .firestore()
            .collection("H_user")
            .doc(user.uid)
            .set({ avatar: url }, { merge: true });
        })
        .then(() => {
          firebase
            .firestore()
            .collection("H_user")
            .doc(user.uid)
            .collection("Doktorlarım")
            .onSnapshot((snaps) => {
              if (!snaps.empty) {
                snaps.forEach((snapsFor) => {
                  firebase
                    .firestore()
                    .collection("D_user")
                    .doc(snapsFor.data().Id)
                    .collection("Hastalarım")
                    .where("Id", "==", user.uid)
                    .onSnapshot((snaps2) => {
                      snaps2.forEach((snaps2For) => {
                        snaps2For.ref.set({ avatar: url }, { merge: true });
                      });
                    });
                });
              }
            });
        })
        .then(() => {
          firebase
            .firestore()
            .collection("Chats")
            .where("users", "array-contains", user.email)
            .onSnapshot((snaps) => {
              if (!snaps.empty) {
                snaps.forEach((snapsFor) => {
                  snapsFor.ref
                    .update({
                      avatar: [url, snapsFor.data().avatar[1]],
                    })
                    .then(() => {
                      setLoading(false);
                      setModalVisible(false);
                    });
                });
              } else {
                setLoading(false);
                setModalVisible(false);
              }
            });
        });
    });
  };

  return (
    <View style={styles.cont}>
      <View style={styles.userImg}>
        {avatar != "" ? (
          <Avatar
            source={{ uri: avatar }}
            size={130}
            rounded
            onPress={showImagePicker}
          >
            <Avatar.Accessory size={27} onPress={showImagePicker} />
          </Avatar>
        ) : (
          <Avatar
            source={require("../../../../rec/Avatars/DefaultHastaAvatar.png")}
            size={130}
            rounded
            onPress={showImagePicker}
          >
            <Avatar.Accessory size={27} onPress={showImagePicker} />
          </Avatar>
        )}

        {/* --- Modal --- */}

        <ProfilePhotoChangeModal
          isModalVisible={isModalVisible}
          onBackdropPress={() => {
            !loading ? setModalVisible(false) : null;
          }}
          onSwipeComplete={() => {
            !loading ? setModalVisible(false) : null;
          }}
          toggleModal={toggleModalAvatar}
          avatar={NewAvatarUri}
          showImagePicker={showImagePicker}
          AvatarUpdate={() => AvatarUpdate(NewAvatarUri, ImageName)}
          loadingButton={loading}
        />

        {/* --- Modal --- */}

        {/* <Text style={{ fontWeight: "500", fontSize: 24, marginTop: 20 }}>
          {name}
        </Text> */}
      </View>

      <View style={styles.userInfoCont}>
        <InfoCard
          icon={"user"}
          topInfo="İsim"
          value={name}
          infoTitleModal="İsmini güncellemek için yeni isim giriniz."
          placeHolderModal="Yeni isim"
          id={id}
        />

        <InfoCard
          icon={"at"}
          topInfo="E-mail"
          value={email}
          infoTitleModal="email'ini güncellemek için yeni email giriniz."
          placeHolderModal="Yeni email"
          id={id}
        />

        <InfoCard
          icon={"phone"}
          topInfo="Telefon Numarası"
          infoTitleModal="telefon numaranı güncellemek için yeni telefon numarası giriniz."
          placeHolderModal="5XXXXXXXXX"
          value={phoneNumber}
          id={id}
        />
        <InfoCard
          icon={"calendar-day"}
          topInfo="Yaş"
          value={age}
          infoTitleModal="Yaşını güncellemek için yeni doğum tarihini giriniz."
          placeHolderModal="yeni yaş"
          id={id}
        />
        <InfoCard
          icon={"venus-mars"}
          topInfo="Cinsiyet"
          value={gender}
          infoTitleModal="Cinsiyetini güncellemek için seçenklere tıklayınız."
          id={id}
        />

        <InfoCard
          icon={"lock"}
          topInfo="Şifre"
          value="********"
          infoTitleModal="Şifreyi güncellemek için yeni şifre giriniz."
          id={id}
          placeHolderModal="Yeni Şifre"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    // marginTop:Constants.statusBarHeight,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  userImg: {
    justifyContent: "space-evenly",
    alignItems: "center",
    //    marginBottom: 0,
    // backgroundColor: "red",
    marginBottom: 15,
  },
  userInfoCont: {
    // flex:2.3,
    // backgroundColor:"red",
    justifyContent: "center",
  },
  userInfo: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    padding: 10,
    marginVertical: 5,
  },
  text: {
    padding: 15,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    paddingVertical: 10,
  },
});

export default ProfileComponent;
