import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import firebase from "firebase/compat/app";
import ProfileComponent from "./Components/ProfileComponent";
import moment from "moment";
import trLocale from "moment/locale/tr";
import Header from "../../../components/Header/Header";

const Profile = ({ navigation }) => {
  // const [raiting, setRaiting] = useState();
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState("");
  const [cinsiyet, setCinsiyet] = useState("");
  const [KHastalik, setKHastalik] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [Id, setId] = useState("");

  useEffect(() => {
    let unmounted = false;

    const user = firebase.auth().currentUser;
    const d = new Date();

    if (!unmounted) {
      firebase
        .firestore()
        .collection("H_user")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          setName(snapshot.data().name);
          setEmail(snapshot.data().email);
          setCinsiyet(snapshot.data()?.cinsiyet);
          setKHastalik(snapshot.data().KHastalık);
          setPhoneNumber(snapshot.data().phoneNumber);
          setDate(snapshot.data().date);
          setId(snapshot.data().Id);
          setAvatar(
            snapshot.data()?.avatar ??
              "https://firebasestorage.googleapis.com/v0/b/hdoktor-1b373.appspot.com/o/avatars%2FDefaultHastaAvatar.png?alt=media&token=0e4d1b7c-d8d1-477f-87ea-55768082f81b"
          );
          // TEL NO
          // YAŞ
          //
        });
    }

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <View style={styles.cont}>
      <Header
        onPressChats={() =>
          navigation.navigate("ChatsScreen", { screen: "Chats" })
        }
        onPressNotifications={() => navigation.navigate("Notifications")}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          flex: 1,
          paddingHorizontal: 10,
          paddingEnd: 10,
          backgroundColor: "white",
        }}
      >
        <ProfileComponent
          name={name}
          email={email}
          avatar={avatar}
          age={date}
          gender={cinsiyet}
          phoneNumber={phoneNumber}
          id={Id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    // marginTop:Constants.statusBarHeight,
    backgroundColor: "white",
    flex: 1,
  },
});

export default Profile;
