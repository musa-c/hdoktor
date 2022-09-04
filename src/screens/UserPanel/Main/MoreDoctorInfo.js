import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Rating, Avatar } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import InfoCardMoreDoctorPatients from "../../../components/Card/InfoCardMoreDoctorPatients";
import moment from "moment";
import trLocale from "moment/locale/tr";
import LoadingButton from "../../../components/Buttons/LoadingButton";
import firebase from "firebase/compat/app";
import Modal from "react-native-modal";
import SuccesModal from "../../../components/Modals/SuccesModal";

const MoreDoctorInfo = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [update, setUpdate] = useState(false);
  const [succes, setSucces] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [loadingRating, setLoadingRating] = useState(false);

  const route = useRoute();
  const DoctorId = route.params.doctorId;
  const D_Name = route.params.name;
  const D_CalisilanYer = route.params.CalisilanYer;
  const time1 = route.params.time1;
  const time2 = route.params.time2;
  const brans = route.params.brans;
  const avatar = route.params.avatar;
  const email = route.params.email;
  const gender = route.params.gender;
  const ratingF = route.params?.rating ?? 0;
  const [firabaseRating, setFirabaseRating] = useState(ratingF);

  const user = firebase.auth().currentUser;

  const ToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const sendRating = (rating) => {
    setLoadingRating(true);

    firebase
      .firestore()
      .collection("D_user")
      .doc(DoctorId)
      .collection("Rating")
      .where("id", "==", user.uid)
      .get()
      .then((query) => {
        if (query.empty) {
          // belge yoksa
          firebase
            .firestore()
            .collection("D_user")
            .doc(DoctorId)
            .collection("Rating")
            .add({
              id: user.uid,
              rating: rating,
            })
            .then(() => {
              firebase
                .firestore()
                .collection("D_user")
                .doc(DoctorId)
                .collection("Rating")
                .get()
                .then((snaps) => {
                  snaps.forEach((snapsFor) => {
                    let ratingAvg = snapsFor.data().rating / snaps.docs.length;
                    setFirabaseRating(ratingAvg);
                    firebase
                      .firestore()
                      .collection("D_user")
                      .doc(DoctorId)
                      .set({ rating: ratingAvg }, { merge: true });
                  });
                })
                .catch(() => {
                  alert("Hata! Lütfen daha sonra tekrar deneyiniz.");
                });
            })
            .then(() => {
              setLoadingRating(false);
              setSucces(true);
              setTimeout(() => {
                setSucces(false);
              }, 3000);
              ToggleModal();
            })
            .catch((e) => {
              setLoadingRating(false);
              alert("Başarısız!");
            });
        } else {
          // belge varsa
          query.forEach((queryFor) => {
            queryFor.ref
              .update({ rating: rating })
              .then(() => {
                firebase
                  .firestore()
                  .collection("D_user")
                  .doc(DoctorId)
                  .collection("Rating")
                  .get()
                  .then((snaps) => {
                    let ratingTotal = 0;
                    snaps.forEach((snapsFor) => {
                      ratingTotal += snapsFor.data().rating;
                    });
                    let ratingAvg = ratingTotal / snaps.docs.length;
                    setFirabaseRating(ratingAvg);
                    firebase.firestore().collection("D_user").doc(DoctorId).set(
                      {
                        rating: ratingAvg,
                      },
                      { merge: true }
                    );
                  })
                  .then(() => {
                    setLoadingRating(false);
                    setSucces(true);
                    setTimeout(() => {
                      setSucces(false);
                    }, 3000);
                    ToggleModal();
                  })
                  .catch((e) => {
                    setLoadingRating(false);
                    alert("Hata! Lütfen daha sonra tekrar deneyiniz.");
                  });
              })
              .catch((e) => {
                setLoadingRating(false);
                alert("Başaramadım abi");
              });
          });
        }
      });
  };

  const SendMessage = () => {
    firebase
      .firestore()
      .collection("Chats")
      .where("users", "in", [[user.email, email]])
      .get()
      .then((query) => {
        if (!query.empty) {
          // belge varsa
          query.forEach((queryFor) => {
            navigation.navigate("ChatsScreen", {
              screen: "Chat",
              params: { id: queryFor.id, name: D_Name },
            });
          });
        } else {
          setLoadingMessage(true);
          firebase
            .firestore()
            .collection("H_user")
            .doc(user.uid)
            .get()
            .then((snaps) => {
              // belge yoksa
              firebase
                .firestore()
                .collection("Chats")
                .add({
                  users: [user.email, email],
                  names: [user.displayName, D_Name],
                  messages: [],
                  avatar: [
                    snaps.data()?.avatar ?? "",
                    avatar == ""
                      ? "https://firebasestorage.googleapis.com/v0/b/hdoktor-1b373.appspot.com/o/avatars%2FD_avatars%2FDefaultDoctorAvatar.png?alt=media&token=64165142-27b8-486b-9a58-5cab9baf340a"
                      : avatar,
                  ],
                })
                .then((doc) => {
                  navigation.navigate("ChatsScreen", {
                    screen: "Chat",
                    params: { id: doc.id, name: D_Name },
                  });
                })
                .then(() => setLoadingMessage(false))
                .catch(() => {
                  setLoadingMessage(false), alert("Başarısız");
                });
            });
        }
      });
  };

  const RatingModal = () => {
    const [rating, setRating] = useState();

    return (
      <Modal
        isVisible={modalVisible}
        style={{
          margin: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
        //onBackdropPress={!loading ? onBackdropPress : null}
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0.8}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            width: Dimensions.get("screen").width / 1.1,
            paddingVertical: 15,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{ fontSize: 32, fontWeight: "bold", marginBottom: 10 }}
            >
              Derecelendir
            </Text>
            <Rating
              type="custom"
              ratingColor="#FF2442"
              ratingBackgroundColor="#c8c7c8"
              imageSize={42}
              ratingCount={5}
              tintColor="white"
              startingValue={firabaseRating}
              onFinishRating={(rating) => setRating(rating)}
            />
            {rating ? (
              <Text style={{ fontSize: 18, marginTop: 10, fontWeight: "800" }}>
                Verdiğin Derece: {rating}
              </Text>
            ) : null}
            <LoadingButton
              text="Gönder"
              FontStyle={{ fontSize: 22, color: "white" }}
              style={{ marginTop: 20 }}
              loading={loadingRating}
              disabled={rating ? loadingRating : true}
              onPress={() => sendRating(rating)}
              mode="contained"
              color={"#B71C1C"}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", flexGrow: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 10,
          paddingEnd: 10,
          backgroundColor: "white",
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity onPress={ToggleModal}>
          <Rating
            type="custom"
            ratingColor="#FF2442"
            ratingBackgroundColor="#c8c7c8"
            imageSize={22}
            startingValue={firabaseRating}
            readonly
            tintColor="white"
          />
        </TouchableOpacity>

        <RatingModal />
        <SuccesModal isVisible={succes} text="Derecelendirme Gönderildi!" />

        <View style={styles.userImg}>
          {avatar == "" ? (
            <Avatar
              source={require("../../../rec/Avatars/DefaultDoctorAvatar.png")}
              size={130}
              rounded
            ></Avatar>
          ) : (
            <Avatar source={{ uri: avatar }} size={130} rounded></Avatar>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            marginBottom: 10,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <LoadingButton
            text={"Mesaj At"}
            FontStyle={{ fontSize: 16, color: "white" }}
            mode="contained"
            loading={loadingMessage}
            disabled={loadingMessage}
            style={{ borderRadius: 15 }}
            color="#FF2442"
            onPress={SendMessage}
          />
          <LoadingButton
            text={"Randevu Oluştur"}
            FontStyle={{ fontSize: 16, color: "white" }}
            mode="contained"
            style={{ borderRadius: 15 }}
            color="#FF2442"
            onPress={() => navigation.navigate("Appointment", { id: DoctorId })}
          />
        </View>

        <InfoCardMoreDoctorPatients
          topInfo="İsim"
          value={D_Name}
          icon={"user"}
        />
        <InfoCardMoreDoctorPatients
          topInfo="Branş"
          value={brans}
          icon="stethoscope"
        />
        <InfoCardMoreDoctorPatients
          topInfo={"Cinsiyet"}
          value={gender}
          icon={"venus-mars"}
        />
        <InfoCardMoreDoctorPatients
          topInfo={"Çalışılan Yer"}
          value={
            D_CalisilanYer == ""
              ? "Çalışılan yer belirtilmemiş."
              : D_CalisilanYer
          }
          icon="h-square"
        />
        <InfoCardMoreDoctorPatients
          topInfo={"E-mail"}
          value={email}
          icon={"at"}
        />
        <InfoCardMoreDoctorPatients
          topInfo={"Çalışma Saat Aralığı"}
          value={
            moment(time1).locale("tr", trLocale).format("LT") +
            " - " +
            moment(time2).locale("tr", trLocale).format("LT")
          }
          icon="clock"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  monthYear: {
    flexDirection: "row",
    marginTop: 10,
  },
  mentYearText: {
    marginHorizontal: 5,
    fontSize: 25,
    fontWeight: "700",
  },
  montDayCont: {
    flexDirection: "row",
    marginTop: 10,
  },
  monthDayBox: {
    justifyContent: "space-evenly",
    width: 70,
    height: 90,
    backgroundColor: "#64b5f6",
    borderRadius: 10,
    marginStart: 5,
    alignItems: "center",
    marginEnd: 5,
    flexGrow: 5,
  },
  monthDayMonthText: {
    fontSize: 18,
    fontWeight: "700",
  },
  monthDayDayText: {
    fontSize: 15,
    fontWeight: "700",
  },
  RandevuClockCont: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  RandevuClockBox: {
    width: Dimensions.get("screen").width / 3.8,
    backgroundColor: "green",
    borderRadius: 5,
    marginStart: 5,
    marginEnd: 5,
    flexDirection: "row",
    justifyContent: "center",
    height: 35,
    alignItems: "center",
    flexGrow: 1,
  },
  RandevuClockText: {
    fontSize: 18,
    fontWeight: "600",
  },
  userImg: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    marginTop: 15,
  },
  userInfoCont: {
    justifyContent: "center",
  },
  userInfo: {
    backgroundColor: "white",
    // margin:10,
    paddingHorizontal: 16,
    padding: 10,
    marginVertical: 5,
  },
});

export default MoreDoctorInfo;
