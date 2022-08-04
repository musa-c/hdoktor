import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Rating, Avatar } from "react-native-elements";
import Modal from "react-native-modal";
import firebase from "firebase/compat/app";
import moment from "moment";
import trLocale from "moment/locale/tr";
import Header from "../../../components/Header/Header";
// import * as InAppPurchases from 'expo-in-app-purchases';

const Profile = ({ navigation }) => {
  const [raiting, setRaiting] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [avatar, setAvatar] = useState();

  const photo = firebase.auth().currentUser.photoURL;
  console.log(photo);

  useEffect(() => {
    let unmounted = false;

    const user = firebase.auth().currentUser;
    if (!unmounted) {
      firebase
        .firestore()
        .collection("D_user")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          setName(snapshot.data()?.name ?? "");
          setBrans(snapshot.data()?.brans ?? "");
          setCalisilanYer(snapshot.data()?.CalisilanYer ?? "");
          setTime1(snapshot.data()?.time1.toDate() ?? "");
          setTime2(snapshot.data()?.time2.toDate() ?? "");
          setAvatar(
            snapshot.data()?.avatar ??
              "https://firebasestorage.googleapis.com/v0/b/hdoktor-1b373.appspot.com/o/avatars%2FDefaultDoctorAvatar.png?alt=media&token=022e0299-4a3f-4127-93bc-dd70dc42f6ea"
          );
        });
    }

    return () => {
      unmounted = true;
    };
  }, []);

  const [name, setName] = useState("");
  const [brans, setBrans] = useState("");
  const [CalisilanYer, setCalisilanYer] = useState("");
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");

  // console.log(moment(time1).locale("tr", trLocale).format('LT'))

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.cont}>
      <Header
        onPressChats={() =>
          navigation.navigate("ChatsScreen", { screen: "Chats" })
        }
        onPressNotifications={() => navigation.navigate("Notifications")}
      />
      <View style={styles.userImg}>
        <Rating
          type="custom"
          ratingColor="#b71b1f"
          ratingBackgroundColor="#c8c7c8"
          ratingCount={5}
          imageSize={20}
          onFinishRating={(text) => setRaiting(text)}
          startingValue={2}
          tintColor="white"
        />

        <Avatar
          source={{ uri: avatar }}
          size={100}
          rounded
          onPress={toggleModal}
        >
          <Avatar.Accessory size={27} onPress={toggleModal} />
        </Avatar>
        {/* --- Modal --- */}
        <Modal
          isVisible={isModalVisible}
          style={{ margin: 0, justifyContent: "flex-end" }}
          swipeDirection="down"
          onBackdropPress={() => setModalVisible(false)}
          onSwipeComplete={() => setModalVisible(false)}
          //   swipeDirection="left"
        >
          <View
            style={{
              height: Dimensions.get("screen").height / 3.5,
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View
              style={{
                width: 70,
                height: 6,
                backgroundColor: "grey",
                alignSelf: "center",
                borderRadius: 10,
                marginTop: 12,
                position: "absolute",
              }}
            ></View>
            <Ionicons
              name="close-outline"
              color="grey"
              size={30}
              onPress={toggleModal}
              style={{ alignSelf: "flex-end", marginRight: 10, marginTop: 5 }}
            />

            <View
              style={{
                justifyContent: "space-evenly",
                flex: 1,
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                Fotoğraf Değiştir
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#d2302f",
                  width: 300,
                  height: 50,
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                }}
              >
                <Text
                  style={{ fontSize: 20, color: "white", fontWeight: "600" }}
                >
                  Galerimden seç
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#d2302f",
                  width: 300,
                  height: 50,
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                }}
              >
                <Text
                  style={{ fontSize: 20, color: "white", fontWeight: "600" }}
                >
                  Fotoğraf çek
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* --- Modal --- */}
        <Text style={{ fontWeight: "500", fontSize: 24 }}>{name}</Text>
      </View>
      <View style={styles.userInfoCont}>
        <View style={styles.userInfo}>
          <Text style={{ marginBottom: 7, marginLeft: 32, color: "grey" }}>
            Çalıştığı kurum
          </Text>

          <View style={{ flexDirection: "row" }}>
            <Ionicons name="business-outline" size={22} />
            <Text
              style={{
                fontWeight: "400",
                fontSize: 20,
                paddingHorizontal: 10,
                flex: 1,
              }}
            >
              {CalisilanYer}
            </Text>
            <Ionicons name="ellipsis-horizontal-outline" size={22} />
          </View>
        </View>
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            marginStart: 45,
            backgroundColor: "red",
          }}
        ></View>

        <View style={styles.userInfo}>
          <Text style={{ marginBottom: 7, marginLeft: 32, color: "grey" }}>
            Branş
          </Text>

          <View style={{ flexDirection: "row" }}>
            <Ionicons name="pulse-outline" size={22} />
            <Text
              style={{
                fontWeight: "400",
                fontSize: 20,
                paddingHorizontal: 10,
                flex: 1,
              }}
            >
              {brans}
            </Text>
            <Ionicons name="ellipsis-horizontal-outline" size={22} />
          </View>
        </View>
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            marginStart: 45,
            backgroundColor: "red",
          }}
        ></View>

        <View style={styles.userInfo}>
          <Text style={{ marginBottom: 7, marginLeft: 32, color: "grey" }}>
            Hasta iletişim saatleri
          </Text>

          <View style={{ flexDirection: "row" }}>
            <Ionicons name="time-outline" size={22} />
            <Text
              style={{
                fontWeight: "400",
                fontSize: 20,
                paddingHorizontal: 10,
                flex: 1,
              }}
            >
              {moment(time1).locale("tr", trLocale).format("LT")} -{" "}
              {moment(time2).locale("tr", trLocale).format("LT")}
            </Text>
            <Ionicons name="ellipsis-horizontal-outline" size={22} />
          </View>
        </View>
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            marginStart: 45,
            backgroundColor: "red",
          }}
        ></View>

        <View style={styles.userInfo}>
          <Text style={{ marginBottom: 7, marginLeft: 32, color: "grey" }}>
            Fotoğraflar
          </Text>

          <View style={{ flexDirection: "row" }}>
            <Ionicons name="images-outline" size={22} />
            <Text
              style={{
                fontWeight: "400",
                fontSize: 20,
                paddingHorizontal: 10,
                flex: 1,
                color: "grey",
              }}
            >
              Gösterilecek fotoğraf yok
            </Text>
            <Ionicons name="ellipsis-horizontal-outline" size={22} />
          </View>
        </View>
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            marginStart: 45,
            backgroundColor: "red",
          }}
        ></View>
      </View>
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
