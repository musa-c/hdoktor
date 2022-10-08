import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header/Header";
import Ad from "../../../components/Ad/Ad";
import firebase from "firebase/compat/app";
import { Avatar } from "react-native-elements";
import Separator from "../../../components/Separator";
import ListEmptyComponent from "../../../components/ListEmptyComponent";
import trLocale from "moment/locale/tr";
import moment from "moment";
import { isEqual } from "lodash";

function HomeU(props) {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [LastCount, setLastCount] = useState();
  const [loading, setLoading] = useState(false);
  const [LoadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setRefreshing(true);
    }

    const myuser = firebase.auth().currentUser;
    var first = firebase
      .firestore()
      .collection("D_user")
      .orderBy("rating", "desc")
      .limit(20);

    first.get().then((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((documentSnapshot) => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      if (!unmounted) {
        setLastCount(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setUsers(users);
        setRefreshing(false);
      }
    });

    // firebase
    //   .firestore()
    //   .collection("D_user")
    //   .onSnapshot((querySnapshot) => {
    //     const users = [];
    //     querySnapshot.forEach((documentSnapshot) => {
    //       users.push({
    //         ...documentSnapshot.data(),
    //         key: documentSnapshot.id,
    //       });
    //     });
    //     if (!unmounted) {
    //       setUsers(users);
    //       setRefreshing(false);
    //     }
    //   });
    return () => {
      unmounted = true;
    };
  }, [refresh]);

  const getOtherData = () => {
    setLoading(true);
    if (LastCount != undefined) {
      firebase
        .firestore()
        .collection("D_user")
        .orderBy("rating", "desc")
        .startAfter(LastCount)
        .limit(20)
        .get()
        .then((querySnapshot) => {
          if (
            isEqual(
              querySnapshot.docs[querySnapshot.docs.length - 1],
              LastCount
            )
          ) {
            // eşit ise
            setLoadingDone(true);
            setLoading(false);
          } else {
            // eşit değil ise
            const usersOther = [];
            querySnapshot.forEach((documentSnapshot) => {
              usersOther.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setUsers(users.concat(usersOther));
            setLastCount(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setLoading(false);
          }
        })
        .catch(() => {
          const erroCorde = e.code;
          setLoading(false);
          console.log(erroCorde);
          console.log(e);
          console.log("hata");
        });
    } else {
      setLoading(false);
    }
  };

  const footerIndicator = () => {
    return loading ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="small" />
      </View>
    ) : null;
  };

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        onPressChats={() =>
          navigation.navigate("ChatsScreen", { screen: "Chats" })
        }
        onPressNotifications={() => navigation.navigate("Notifications")}
        W_user="H_user"
      />
      <Ad />
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        onEndReached={() => {
          if (!LoadingDone) {
            getOtherData();
          }
        }}
        refreshing={refreshing}
        ListFooterComponent={footerIndicator}
        onRefresh={() => {
          setRefresh(!refresh);
          setRefreshing(true);
        }}
        ListEmptyComponent={
          <ListEmptyComponent
            text="Doktor Bulunmamakta"
            refreshing={refreshing}
          />
        }
        data={users}
        renderItem={(element) => (
          <View style={styles.DenemeCont}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MoreDoctorInfo", {
                  doctorId: element.item.key,
                  name: element.item.name,
                  brans: element.item.brans,
                  gender: element.item.cinsiyet,
                  email: element.item.email,
                  time1: element.item.time1.toDate(),
                  time2: element.item.time2.toDate(),
                  CalisilanYer: element.item.CalisilanYer,
                  avatar: element.item.avatar,
                  rating: element.item.rating,
                })
              }
            >
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
                      // rounded
                      source={{ uri: element.item.avatar }}
                      avatarStyle={styles.imageStyle}
                      activeOpacity={0.7}
                      rounded
                    />
                  )}
                </View>
                <View style={styles.CardInfo}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 19,
                      paddingStart: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {element.item.name}
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 17,
                      paddingStart: 5,
                      paddingBottom: 5,
                      textAlign: "auto",
                    }}
                  >
                    <Icon name="stethoscope" size={22} color="#B71C1C" />
                    &nbsp;&nbsp;{element.item.brans}
                  </Text>

                  {element.item.CalisilanYer != "" ? (
                    <Text
                      style={{ color: "black", fontSize: 17, paddingStart: 5 }}
                    >
                      <Icon name="h-square" size={22} color="#B71C1C" />
                      &nbsp;&nbsp;{element.item.CalisilanYer}
                    </Text>
                  ) : null}

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
            </TouchableOpacity>
            <Separator />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    // borderColor: "#fff",
    // borderWidth: 0,
    // borderRadius: 20,
    // width: 75,
    // height: 81,
    // marginVertical: 5,
    // marginStart: 5
    // marginVertical:5,
    // marginHorizontal:2
  },

  card: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#fff",

    marginVertical: 7,
    borderRadius: 10,
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
    // backgroundColor:"red",
    paddingVertical: 5,
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
  button: {
    width: 300,
    backgroundColor: "#B71C1C",
    borderRadius: 25,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
});

export default HomeU;
