import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import firebase from "firebase/compat/app";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "../../../components/Header/Header";

import { useNavigation } from "@react-navigation/native";
import ListEmptyComponent from "../../../components/ListEmptyComponent";
import Icon from "@expo/vector-icons/FontAwesome";
import ModalCard from "../../../components/ModalCard";
import LoadingButton from "../../../components/Buttons/LoadingButton";
import { Button, Badge } from "react-native-paper";
import MultiRandevuButton from "../../../components/Buttons/MultiRandevuButton";
import MyDoctorPatientsCard from "../../../components/Card/MyDoctorPatientsCard";
//import { Avatar, Badge, Icon, withBadge } from '@rneui/themed';

const MyDoctor = ({ route }) => {
  const [DrUsers, setDrUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [RandevuDate, setRandevuDate] = useState([]);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setRefreshing(true);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // alert("Null Değilim")
        firebase
          .firestore()
          .collection("H_user")
          .doc(user?.uid ?? "")
          .collection("Doktorlarım")
          .onSnapshot((querySnapshot) => {
            const DrUsers = [];
            const RandevuDate = [];
            querySnapshot.forEach((documentSnapshot) => {
              DrUsers.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });

              firebase
                .firestore()
                .collection("H_user")
                .doc(user.uid)
                .collection("Doktorlarım")
                .doc(documentSnapshot.id)
                .collection("RandevuTarih")
                .onSnapshot((snapshot) => {
                  snapshot.forEach((docSnapshot) => {
                    RandevuDate.push({ ...docSnapshot.data() });
                  });
                });
            });

            if (!unmounted) {
              setDrUsers(DrUsers);
              setRandevuDate(RandevuDate);
              setRefreshing(false);
            }
          });
      }
      // else {
      //     alert("NULL'IM 2");
      // }
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
      .where("users", "in", [[user.email, email]])
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

  const navigation = useNavigation();

  const [modalCardVisible, setmodalCardVisible] = useState(false);
  const [Did, setDid] = useState("");
  const [DuserName, setDuserName] = useState("");

  return (
    <View style={styles.ViewStyle}>
      <Header
        onPressChats={() =>
          navigation.navigate("ChatsScreen", { screen: "Chats" })
        }
        onPressNotifications={() => navigation.navigate("Notifications")}
      />
      <FlatList
        data={DrUsers}
        refreshing={refreshing}
        contentContainerStyle={{ flexGrow: 1 }}
        onRefresh={() => {
          setRefresh(!refresh);
          setRefreshing(true);
        }}
        ListEmptyComponent={
          <ListEmptyComponent
            text=" Randevulu doktorunuz bulunmamakta."
            refreshing={refreshing}
          />
        }
        renderItem={(element) => (
          // console.log(element)
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ModalCard
              isVisible={modalCardVisible}
              onBackdropPress={() => setmodalCardVisible(false)}
              id={Did}
              RandevuDate={RandevuDate}
              userName={DuserName}
            />

            <MyDoctorPatientsCard
              avatar={
                element.item?.avatar ??
                "https://firebasestorage.googleapis.com/v0/b/hdoktor-1b373.appspot.com/o/avatars%2FD_avatars%2FDefaultDoctorAvatar.png?alt=media&token=64165142-27b8-486b-9a58-5cab9baf340a"
              }
              name={element.item.name}
              text1={element.item.brans}
              iconFont1="stethoscope"
              text2={element.item.calisilanYer}
              iconFont2="h-square"
              randevuCount={element.item.randevuCount}
              RandevuSaat={element.item.RandevuSaat}
              RandevuTarih={element.item.RandevuTarih}
              onPressRandevuModal={() => {
                setDid(element.item.Id);
                setDuserName(element.item.name);
                setmodalCardVisible(true);
              }}
              onPressChatId={() => ChatId(element.item.email)}
              user={"hasta"}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    backgroundColor: "#fff",
    flex: 1,
  },
  imageStyle: {
    borderColor: "#fff",
    borderWidth: 0,
    borderRadius: 10,
    width: 75,
    height: 81,
    marginVertical: 5,
    marginStart: 5,
  },
  Card: {
    backgroundColor: "#fff",
    margin: 10,
    marginVertical: 7,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 5,
  },
  cardList: {
    shadowColor: "#000",
    shadowOffset: 0.1,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  DoctorInfoCont: {
    fontWeight: "bold",
    flexDirection: "column",
  },
  DoctorHospital: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  DoctorName: {
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: "600",
  },
  DoctorTitle: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: "400",
  },
  DoctorMoreInfo: {
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 8,
    alignSelf: "flex-end",
    fontStyle: "normal",
    fontWeight: "200",
    color: "grey",
  },
  CallMessageIcon: {},

  cont: {
    flex: 1,
    // justifyContent:"flex-start", // varsayılan(flex-direction: column) olarak dikey hizalama
    // alignItems:"center", // varsayılan olarak yatay hizalama
  },
  card: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginVertical: 7,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 25,

    elevation: 5,
    marginHorizontal: 10,
  },
  cardImage: {
    flex: 3,
    // backgroundColor:"blue",
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  CardInfo: {
    flex: 7,
    // backgroundColor:"black",
  },
  cardIcon: {
    flex: 1.5,
    // backgroundColor:"yellow",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default MyDoctor;
