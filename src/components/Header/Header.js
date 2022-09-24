import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import Logo from "./Logo";
import IconFeather from "react-native-vector-icons/Feather";
import firebase from "firebase/compat/app";
import { Badge } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Header = ({ onPressChats, onPressNotifications, W_user }) => {
  const [unreadNotification, setUnreadNotification] = useState();
  const [unreadMessage, setUnreadMessage] = useState();

  const navigation = useNavigation();
  const user = firebase.auth().currentUser;

  useEffect(() => {
    let unmounted = false;

    if (W_user == "D_user") {
      firebase
        .firestore()
        .collection("D_user")
        .doc(user.uid)
        .collection("Bildirimlerim")
        .where("read", "==", false)
        .onSnapshot((snaps) => {
          if (!unmounted) {
            setUnreadNotification(snaps.docs.length);
          }
        });

      firebase
        .firestore()
        .collection("Chats")
        .where("users", "array-contains", user.email)
        .where("Dread", "==", false)
        .onSnapshot((snaps) => {
          if (!unmounted) {
            setUnreadMessage(snaps.docs.length);
          }
        });
    } else if (W_user == "H_user") {
      firebase
        .firestore()
        .collection("H_user")
        .doc(user.uid)
        .collection("Bildirimlerim")
        .where("read", "==", false)
        .onSnapshot((snaps) => {
          if (!unmounted) {
            setUnreadNotification(snaps.docs.length);
          }
        });

      firebase
        .firestore()
        .collection("Chats")
        .where("users", "array-contains", user.email)
        .where("Hread", "==", false)
        .onSnapshot((snaps) => {
          if (!unmounted) {
            setUnreadMessage(snaps.docs.length);
          }
        });
    }
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <View style={styles.viewStyle}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={onPressChats}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <IconFeather name="mail" size={30} color="black" />
            {unreadMessage != 0 ? (
              <Badge
                value={unreadMessage}
                status="primary"
                containerStyle={{ position: "absolute", left: 20 }}
              />
            ) : null}
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 4, alignItems: "center", justifyContent: "center" }}>
        <Logo />
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={onPressNotifications}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <IconFeather name="bell" size={30} color="black" />
            {unreadNotification != 0 ? (
              <Badge
                value={unreadNotification}
                status="primary"
                containerStyle={{ position: "absolute", left: 17 }}
              />
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: "#fff",
    flexDirection: "row",
    //height: 40,
    paddingBottom: 5,
    borderWidth: 0.3,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: "grey",
    paddingTop: Constants.statusBarHeight - 15,
  },
});

export default Header;
