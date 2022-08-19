import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header/Header";
import Ad from "../../../components/Ad/Ad";
import firebase from "firebase/compat/app";
import { Avatar } from "react-native-elements";
import Separator from "../../../components/Separator";
import ListEmptyComponent from "../../../components/ListEmptyComponent";

function HomeD(props) {
  const [users, setUsers] = useState([]);
  // const [Id, setId] = useState("");
  // const user = firebase.auth().currentUser;
  // console.log(user.displayName, user.photoURL)
  const [myId, setMyId] = useState();
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setRefreshing(true);
    }
    const myuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("D_user")
      .where("Id", "!=", myuser.uid)
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        if (!unmounted) {
          setUsers(users);
          setMyId(myuser.uid);
          setRefreshing(false);
        }
      });
    return () => {
      unmounted = true;
    };
  }, [refresh]);

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        onPressChats={() =>
          navigation.navigate("ChatsScreen", { screen: "Chats" })
        }
        onPressNotifications={() => navigation.navigate("Notifications")}
      />
      <Ad />

      <FlatList
        data={users}
        ListEmptyComponent={
          <ListEmptyComponent
            text={"Doktor Bulunmamakta."}
            refreshing={refreshing}
          />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        refreshing={refreshing}
        onRefresh={() => {
          setRefresh(!refresh);
          setRefreshing(true);
        }}
        renderItem={(element) => (
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MoreDoctorInfo", {
                  doctorId: element.item.key,
                  name: element.item.name,
                  CalisilanYer: element.item.CalisilanYer,
                  time1: element.item.time1.toDate(),
                  time2: element.item.time2.toDate(),
                  email: element.item.email,
                  avatar: element.item.avatar,
                  gender: element.item.cinsiyet,
                  brans: element.item.brans,
                })
              }
            >
              <View style={styles.cont}>
                <View style={styles.card}>
                  <View style={styles.cardImage}>
                    {element.item.avatar == "" ? (
                      <Avatar
                        size={95}
                        source={require("../../../rec/Avatars/DefaultDoctorAvatar.png")}
                        avatarStyle={styles.imageStyle}
                        activeOpacity={0.7}
                        rounded
                      />
                    ) : (
                      <Avatar
                        size={95}
                        rounded
                        source={{ uri: element.item.avatar }}
                        avatarStyle={styles.imageStyle}
                        activeOpacity={0.7}
                      />
                    )}
                  </View>
                  <View style={styles.CardInfo}>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 17,
                        paddingStart: 5,
                        fontWeight: "bold",
                      }}
                    >
                      {element.item.name}
                    </Text>
                    <Text
                      style={{ color: "black", fontSize: 19, paddingStart: 5 }}
                    >
                      <Icon name="stethoscope" size={22} color="#B71C1C" />
                      &nbsp;&nbsp;{element.item.brans}
                    </Text>
                    {element.item.CalisilanYer != "" ? (
                      <Text
                        style={{
                          color: "black",
                          fontSize: 19,
                          paddingStart: 5,
                        }}
                      >
                        <Icon name="h-square" size={22} color="#B71C1C" />
                        &nbsp;&nbsp;{element.item.CalisilanYer}
                      </Text>
                    ) : null}

                    <View style={{ marginHorizontal: 5, marginTop: 5 }}></View>
                    <View
                      style={{
                        marginHorizontal: 5,
                        marginTop: 5,
                        alignItems: "flex-end",
                      }}
                    >
                      <Text
                        style={{
                          color: "grey",
                          fontSize: 15,
                          fontStyle: "italic",
                        }}
                      >
                        Daha fazla bilgi al
                      </Text>
                    </View>
                  </View>
                </View>
                <Separator />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    // width: 75,
    // height: 81,
    // marginVertical: 5,
    // marginStart: 5
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
    shadowRadius: 24,

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

  cont: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    marginTop: 10,

    backgroundColor: "white",
    padding: 5,
    //  marginVertical:7,
    borderRadius: 10,

    borderColor: "#E2E2E2",
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
    flex: 2,
    backgroundColor: "yellow",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default HomeD;
