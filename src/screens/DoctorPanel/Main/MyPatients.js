import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase/compat/app";
import Header from "../../../components/Header/Header";

import ListEmptyComponent from "../../../components/ListEmptyComponent";
// import { mdiGenderMaleFemale } from '@mdi/js';

import { useNavigation } from "@react-navigation/native";
import ModalCard from "../../../components/ModalCard";
import MyDoctorPatientsCard from "../../../components/Card/MyDoctorPatientsCard";
import NoteModal from "../../../components/Modals/NoteModal";

const MyPatients = (props) => {
  // console.log("props:", props.isModalVisible);
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [RandevuDate, setRandevuDate] = useState([]);
  const [modalCardVisible, setmodalCardVisible] = useState();
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setRefreshing(true);
    }
    firebase.auth().onAuthStateChanged((doctor) => {
      if (doctor) {
        firebase
          .firestore()
          .collection("D_user")
          .doc(doctor.uid)
          .collection("Hastalarım")
          .onSnapshot((querySnapshot) => {
            const users = [];
            const RandevuDate = [];
            if (!querySnapshot.empty) {
              querySnapshot.forEach((documentSnapshot) => {
                users.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });

                firebase
                  .firestore()
                  .collection("D_user")
                  .doc(doctor.uid)
                  .collection("Hastalarım")
                  .doc(documentSnapshot.id)
                  .collection("RandevuTarih")
                  .onSnapshot((snapshot) => {
                    snapshot.forEach((docSnapshot) => {
                      RandevuDate.push({ ...docSnapshot.data() });
                    });
                  });
                // Tüm hastların ranveutarihlerini çektiğimiz içi n id ile hasta id'yi match'lememiz gerekiyor.
              });
            }
            if (!unmounted) {
              setUsers(users);
              setRandevuDate(RandevuDate);
              setRefreshing(false);
            }
          });
      }
    });
    return () => {
      unmounted = true;
    };
  }, [refresh]);

  const user = firebase.auth().currentUser;

  const ChatId = (email, name) => {
    // [[hastaEmail, doctorEmail]]
    firebase
      .firestore()
      .collection("Chats")
      .where("users", "in", [[email, user.email]])
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          navigation.navigate("ChatsScreen", {
            screen: "Chat",
            params: { id: doc.id, name: name },
          });
        });
      });
  };

  const PatientRemove = (id, email) => {
    firebase
      .firestore()
      .collection("D_user")
      .doc(user.uid)
      .collection("Hastalarım")
      .doc(id)
      .collection("RandevuTarih")
      .get()
      .then((get) => {
        get.forEach((getFor) => {
          getFor.ref.delete().then(() => {
            firebase
              .firestore()
              .collection("D_user")
              .doc(user.uid)
              .collection("Hastalarım")
              .doc(id)
              .delete()
              .then(() => {
                console.log("Hasta single randevu silme başarılı");
                firebase
                  .firestore()
                  .collection("H_user")
                  .where("email", "==", email)
                  .get()
                  .then((snapshot) => {
                    snapshot.forEach((snaps) => {
                      firebase
                        .firestore()
                        .collection("H_user")
                        .doc(snaps.id)
                        .collection("Doktorlarım")
                        .where("email", "==", user.email)
                        .get()
                        .then((snapshotD) => {
                          snapshotD.forEach((snapshotDFor) => {
                            firebase
                              .firestore()
                              .collection("H_user")
                              .doc(snaps.id)
                              .collection("Doktorlarım")
                              .doc(snapshotDFor.id)
                              .collection("RandevuTarih")
                              .get()
                              .then((getH) => {
                                getH.forEach((getForH) => {
                                  getForH.ref
                                    .delete()
                                    .then(() => {
                                      firebase
                                        .firestore()
                                        .collection("H_user")
                                        .doc(snaps.id)
                                        .collection("Doktorlarım")
                                        .doc(snapshotDFor.id)
                                        .delete()
                                        .then(() => {
                                          console.log(
                                            "doctor single randevu silme başarılı"
                                          );
                                        });
                                    })
                                    .catch(() => {
                                      console.log(
                                        "doctor single randevu silme başarısız"
                                      );
                                    });
                                });
                              });
                          });
                        });
                    });
                  });
              })
              .catch(() => {
                console.log("hasta single randevu silme başarısız");
              });
          });
        });
      });

    //  firebase.firestore(user.uid).collection("Hastalarım").doc(id).collection("RandevuTarih")
  };

  const [note, setNote] = useState("");

  const [hastaId, setHastaId] = useState();
  const [changenote, setchangeNote] = useState("");
  const [change, setChange] = useState(false);

  const getNotes = (id) => {
    setHastaId(id);
    firebase
      .firestore()
      .collection("D_user")
      .doc(user.uid)
      .collection("Hastalarım")
      .doc(id)
      .onSnapshot((snapshot) => {
        setNote(snapshot?.data()?.note ?? "");
        setModalVisible(!isModalVisible);
      });
  };

  const [loading, setLoading] = useState(false);
  const setNotes = (id) => {
    if (change == true) {
      setLoading(true);
      // !(/^\s*$/.test(changenote))
      // sadece boşluk olup olmadığı kontrol edildi regexte.
      firebase
        .firestore()
        .collection("D_user")
        .doc(user.uid)
        .collection("Hastalarım")
        .doc(id)
        .update({
          note: changenote,
        })
        .then(() => {
          setModalVisible(!isModalVisible);
          setChange(false);
          setLoading(false);
        })
        .catch(() => {
          Alert.alert("Hata❗", "Lütfen tekrar deneyiniz.", [
            { text: "Tamam", style: "cancel" },
          ]);
          setLoading(false);
        });
    } else {
      setModalVisible(!isModalVisible);
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [Hid, setHid] = useState("");
  const [HDocId, setHDocId] = useState("");
  const [huserName, sethuserName] = useState("");
  const [HEmail, setHEmail] = useState("");

  // console.log(huserName);

  return (
    <View style={styles.ViewStyle}>
      {/* --- Modal --- */}
      <NoteModal
        isModalVisible={isModalVisible}
        onBackdropPress={() => setNotes(hastaId)}
        iconPress={() => {
          toggleModal(), setchangeNote(note);
        }}
        defaultValue={note}
        onChangeText={(text) => {
          setchangeNote(text);
          setChange(true);
        }}
        loading={loading}
        ButtonOnPress={() => setNotes(hastaId)}
      />

      {/* --- Modal --- */}

      <Header
        onPressChats={() =>
          navigation.navigate("ChatsScreen", { screen: "Chats" })
        }
        onPressNotifications={() => navigation.navigate("Notifications")}
        W_user="D_user"
      />
      {/* <ScrollView> */}
      <FlatList
        data={users}
        contentContainerStyle={{ flexGrow: 1 }}
        onRefresh={() => {
          setRefresh(!refresh);
          setRefreshing(true);
        }}
        refreshing={refreshing}
        ListEmptyComponent={
          <ListEmptyComponent
            text="Hastanız bulunmamakta."
            refreshing={refreshing}
          />
        }
        renderItem={(element) => (
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ModalCard
              isVisible={modalCardVisible}
              onBackdropPress={() => setmodalCardVisible(false)}
              id={Hid}
              RandevuDate={RandevuDate}
              username={huserName}
              HDocId={HDocId}
              HEmail={HEmail}
              onModalHide={() => setmodalCardVisible(false)}
            />

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MorePatientInfo", {
                  Id: element.item.Id,
                  name: element.item.name,
                  email: element.item.email,
                  KHastalik: element.item.KHastalik,
                  gender: element.item.cinsiyet,
                  avatar: element.item.avatar,
                })
              }
            >
              <MyDoctorPatientsCard
                avatar={element.item.avatar}
                name={element.item.name}
                text1={element.item.cinsiyet}
                iconFont1="venus-mars"
                text2={element.item.email}
                iconFont2="at"
                randevuCount={element.item.randevuCount}
                KHastalik={element.item.KHastalik}
                RandevuSaat={element.item.RandevuSaat}
                RandevuTarih={element.item.RandevuTarih}
                onPressRandevuModal={() => {
                  setHid(element.item.Id);
                  sethuserName(element.item.name);
                  setHDocId(element.item.key);
                  setHEmail(element.item.email);
                  setmodalCardVisible(!modalCardVisible);
                }}
                onPressChatId={() =>
                  ChatId(element.item.email, element.item.name)
                }
                onPressGetNotes={() => getNotes(element.item.key)}
                PatientRemoveIconPress={() =>
                  PatientRemove(element.item.key, element.item.email)
                }
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

export default MyPatients;
