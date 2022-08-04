import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import firebase from "firebase/compat/app";
import Header from "../../../components/Header/Header";

import ListEmptyComponent from "../../../components/ListEmptyComponent";
// import { mdiGenderMaleFemale } from '@mdi/js';

import { useNavigation } from "@react-navigation/native";
import ModalCard from "../../../components/ModalCard";
import MyDoctorPatientsCard from "../../../components/Card/MyDoctorPatientsCard";
import NoteModal from "../../../components/Modals/NoteModal";

const MyPatients = (props) => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [RandevuDate, setRandevuDate] = useState([]);

  useEffect(() => {
    let unmounted = false;
    setRefreshing(true);
    firebase.auth().onAuthStateChanged((doctor) => {
      if (doctor) {
        firebase
          .firestore()
          .collection("D_user")
          .doc(doctor?.uid ?? "")
          .collection("Hastalarım")
          .onSnapshot((querySnapshot) => {
            const users = [];
            const RandevuDate = [];
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

  const ChatId = (email) => {
    firebase
      .firestore()
      .collection("Chats")
      .where("users", "in", [[email, user.email]])
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          navigation.navigate("ChatsScreen", {
            screen: "Chat",
            params: { id: doc.id },
          });
        });
      });
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

  const [modalCardVisible, setmodalCardVisible] = useState(false);
  const [Hid, setHid] = useState("");
  const [huserName, sethuserName] = useState("");

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
              userName={huserName}
            />

            <MyDoctorPatientsCard
              avatar={
                element.item?.avatar ??
                "https://firebasestorage.googleapis.com/v0/b/hdoktor-1b373.appspot.com/o/avatars%2FH_avatars%2FDefaultHastaAvatar.png?alt=media&token=66f93caf-ef41-461b-9e20-b35ac92a8084"
              }
              name={element.item.name}
              text1={element.item.cinsiyet}
              iconFont1="venus-mars"
              text2={element.item.email}
              iconFont2="at"
              randevuCount={element.item.randevuCount}
              RandevuSaat={element.item.RandevuSaat}
              RandevuTarih={element.item.RandevuTarih}
              onPressRandevuModal={() => {
                setHid(element.item.Id);
                sethuserName(element.item.name);
                setmodalCardVisible(true);
              }}
              onPressChatId={() => ChatId(element.item.email)}
              onPressGetNotes={() => getNotes(element.item.key)}
            />
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
