import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import firebase from "firebase/compat/app";
import Header from "../../../components/Header/Header";
import ProfileComponent from "./Components/ProfileComponent";

const Profile = ({ navigation }) => {
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState("");
  const [brans, setBrans] = useState("");
  const [CalisilanYer, setCalisilanYer] = useState("");
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [cinsiyet, setCinsiyet] = useState("");
  const [email, setEmail] = useState("");
  const [Id, setId] = useState("");

  useEffect(() => {
    let unmounted = false;

    const user = firebase.auth().currentUser;
    if (!unmounted) {
      firebase
        .firestore()
        .collection("D_user")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          setName(snapshot.data()?.name);
          setBrans(snapshot.data()?.brans);
          setCalisilanYer(snapshot.data()?.CalisilanYer);
          setTime1(snapshot.data()?.time1.toDate());
          setTime2(snapshot.data()?.time2.toDate());
          setAvatar(snapshot.data().avatar);
          setEmail(snapshot.data().email);
          setCinsiyet(snapshot.data().cinsiyet);
          setId(user.uid);
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
          paddingHorizontal: 10,
          paddingEnd: 10,
          backgroundColor: "white",
          paddingVertical: 20,
        }}
      >
        <ProfileComponent
          name={name}
          email={email}
          avatar={avatar}
          gender={cinsiyet}
          CalisilanYer={CalisilanYer}
          brans={brans}
          time1={time1}
          time2={time2}
          id={Id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    // marginTop:Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "white",
    // borderColor:"yellow",
    // borderWidth:2,
  },
  userImg: {
    // backgroundColor:"blue",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 0.7,
  },
  userInfoCont: {
    // flex:2,
    // backgroundColor:"red",
    // marginHorizontal:20,
    justifyContent: "center",
    marginTop: 10,
  },
  userInfo: {
    backgroundColor: "white",
    // margin:10,
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

export default Profile;
