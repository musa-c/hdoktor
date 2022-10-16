import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Rating } from "react-native-elements";
import InfoCard from "./InfoCard";
import ProfilePhotoChangeModal from "../../../../components/Modals/ProfilePhotoChangeModal";
import firebase from "firebase/compat/app";
import moment from "moment";
import trLocale from "moment/locale/tr";

const ProfileComponent = ({
  name,
  avatar,
  email,
  gender,
  time1,
  time2,
  CalisilanYer,
  brans,
  id,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [NewAvatarUri, setNewAvatarUri] = useState("");
  const [ImageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);
  const [raiting, setRaiting] = useState();

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

    var ref = firebase.storage().ref("avatars/D_avatars").child(imageName);
    setLoading(true);
    (await ref.put(blob)).ref.getDownloadURL().then((url) => {
      // H_user, D_user-> Hastalarım, Chats avatar güncellenir.
      // !!!! BİLDİRİMLERİN GÜNCELELLENEBİLMESİ İÇİN UNİQUE BİR ALAN OLMASI LAZIM!
      if (user.photoURL != null) {
        // daha önce photoURL tanımlanmışsa
        firebase
          .storage()
          .ref("avatars/D_avatars")
          .child(user.photoURL)
          .delete()
          .then(() => {
            //console.log("başarılı eski photo silindi.");
            user
              .updateProfile({
                photoURL: imageName,
              })
              .then(() => {
                firebase
                  .firestore()
                  .collection("D_user")
                  .doc(user.uid)
                  .set({ avatar: url }, { merge: true });
              })
              .then(() => {
                firebase
                  .firestore()
                  .collection("D_user")
                  .doc(user.uid)
                  .collection("Hastalarım")
                  .onSnapshot((snaps) => {
                    if (!snaps.empty) {
                      snaps.forEach((snapsFor) => {
                        firebase
                          .firestore()
                          .collection("H_user")
                          .doc(snapsFor.data().Id)
                          .collection("Doktorlarım")
                          .where("Id", "==", user.uid)
                          .onSnapshot((snaps2) => {
                            snaps2.forEach((snaps2For) => {
                              snaps2For.ref.set(
                                { avatar: url },
                                { merge: true }
                              );
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
                            avatar: [snapsFor.data().avatar[0], url],
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
          })
          .catch((error) => {
            const ErrorCode = error.code;
            switch (ErrorCode.substr(8)) {
              case "unknown":
                setError("Bilinmeyen bir hata oluştu.");
                setLoading(false);
                break;
              case "quota-exceeded":
                setError(
                  "Kota aşıldı. İşleminiz gerçekleştirilemiyor. Lütfen bu hatayı yetkiliye bildiriniz."
                );
                setLoading(false);
                break;
              case "unauthenticated":
                setError("Kullanıcı kimliği doğrulanamadı.");
                setLoading(false);
                break;
              case "unauthorized":
                setError("Bu eylemi gerçekleştirebilme yetkiniz yok.");
                setLoading(false);
                break;
              case "retry-limit-exceeded":
                setError(
                  "İşlem zaman aşımına uğradı. Lütfen tekrar deneyiniz."
                );
                setLoading(false);
                break;
              case "canceled":
                setError("İşlem iptal edildi.");
                setLoading(false);
                break;
              case "server-file-wrong-size":
                setError("Tekrak deneyiniz. Boyut farkı var.");
                setLoading(false);
                break;
              default:
                setError("Hata. Lütfen tekrar deneyiniz.");
                setLoading(false);
                break;
            }
          });
      } else {
        // daha önce photoURL tanımlanmamışsa
        user
          .updateProfile({
            photoURL: imageName,
          })
          .then(() => {
            firebase
              .firestore()
              .collection("D_user")
              .doc(user.uid)
              .set({ avatar: url }, { merge: true });
          })
          .then(() => {
            firebase
              .firestore()
              .collection("D_user")
              .doc(user.uid)
              .collection("Hastalarım")
              .onSnapshot((snaps) => {
                if (!snaps.empty) {
                  snaps.forEach((snapsFor) => {
                    firebase
                      .firestore()
                      .collection("H_user")
                      .doc(snapsFor.data().Id)
                      .collection("Doktorlarım")
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
                        avatar: [snapsFor.data().avatar[0], url],
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
      }
    });
  };

  const valueArr = [time1, time2];

  return (
    <View style={styles.cont}>
      <View style={styles.userImg}>
        <Rating
          type="custom"
          ratingColor="#b71b1f"
          ratingBackgroundColor="#c8c7c8"
          ratingCount={5}
          imageSize={20}
          readonly
          startingValue={2}
          tintColor="white"
          style={{ marginBottom: 20 }}
        />

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
            source={require("../../../../rec/Avatars/DefaultDoctorAvatar.png")}
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
          // onSwipeComplete={() => {
          //   !loading ? setModalVisible(false) : null;
          // }}
          toggleModal={toggleModalAvatar}
          avatar={NewAvatarUri}
          showImagePicker={showImagePicker}
          AvatarUpdate={() => AvatarUpdate(NewAvatarUri, ImageName)}
          loadingButton={loading}
        />

        {/* --- Modal --- */}
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
          icon={"stethoscope"}
          topInfo="Branş"
          infoTitleModal="Branşını güncellemek için yeni branş giriniz."
          value={brans}
          id={id}
        />

        {CalisilanYer != "" ? (
          <InfoCard
            icon={"h-square"}
            topInfo="Çalışılan Yer"
            infoTitleModal="Çalıştığınız yeri güncelleyebilirsiniz."
            value={CalisilanYer}
            placeHolderModal="Yeni çalışma yeri"
            id={id}
          />
        ) : (
          <InfoCard
            icon={"h-square"}
            topInfo="Çalışılan Yer"
            infoTitleModal="Çalıştığınız yeri güncelleyebilirsiniz."
            value={"Çalışılan Yer belirtilmedi."}
            placeHolderModal="Çalışılan yer"
            id={id}
          />
        )}

        <InfoCard
          icon={"clock"}
          topInfo="Çalışma Saatleri"
          infoTitleModal="Çalışma saatlerini güncellek için yeni saat aralığı seçiniz."
          value={valueArr}
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
