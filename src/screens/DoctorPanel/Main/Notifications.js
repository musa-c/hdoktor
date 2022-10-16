import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import moment from "moment";
import { Avatar, Badge } from "react-native-elements";
import Separator from "../../../components/Separator";
import ListEmptyComponent from "../../../components/ListEmptyComponent";
import { isEqual } from "lodash";

const Notifications = () => {
  const user = firebase.auth().currentUser;
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState([]);
  const [LastCount, setLastCount] = useState();
  const [loading, setLoading] = useState(false);
  const [LoadingDone, setLoadingDone] = useState(false);

  const DateNotifications = (date) => {
    //const notificationDate = moment(date).format("l");
    const d = new Date();
    const currentDate =
      d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
    if (moment(date).format("l") == currentDate) {
      return moment(date).format("LT");
    } else if (d.getDate + 1 == moment(date).format("Do")) {
      return "Dün " + moment(date).format("LT");
    } else {
      return moment(date).format("ll");
    }
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setRefreshing(true);
    }

    var first = firebase
      .firestore()
      .collection("D_user")
      .doc(user.uid)
      .collection("Bildirimlerim")
      .orderBy("saat", "desc")
      .limit(20);

    first
      .get()
      .then((querySnapshot) => {
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
      })
      .then(() => {
        firebase
          .firestore()
          .collection("D_user")
          .doc(user.uid)
          .collection("Bildirimlerim")
          .where("read", "==", false)
          .get()
          .then((snaps) => {
            snaps.forEach((snapsFor) => {
              snapsFor.ref.update({ read: true });
            });
          });
      });

    // firebase
    //   .firestore()
    //   .collection("D_user")
    //   .doc(user.uid)
    //   .collection("Bildirimlerim")
    //   .get()
    //   .then((snapshot) => {
    //     const data = [];
    //     snapshot.forEach((documentSnapshot) => {
    //       data.push({
    //         ...documentSnapshot.data(),
    //         id: documentSnapshot.id,
    //       });
    //     });
    //     if (!unmounted) {
    //       setData(data);
    //       setRefreshing(false);
    //     }
    //   })
    // .then(() => {
    //   firebase
    //     .firestore()
    //     .collection("D_user")
    //     .doc(user.uid)
    //     .collection("Bildirimlerim")
    //     .where("read", "==", false)
    //     .get()
    //     .then((snaps) => {
    //       snaps.forEach((snapsFor) => {
    //         snapsFor.ref.update({ read: true });
    //       });
    //     });
    // });

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
        .doc(user.uid)
        .collection("Bildirimlerim")
        .orderBy("saat", "desc")
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
        .catch((e) => {
          const errorCode = e.code;
          setLoading(false);
          console.log(errorCode);
          console.log(e);
          console.log("hata");
        });
    } else {
      setLoading(false);
    }
  };

  const footerIndicator = () => {
    return loading ? (
      <View
        style={{
          paddingVertical: 20,
        }}
      >
        <ActivityIndicator animating size="small" />
      </View>
    ) : null;
  };

  return (
    <View style={styles.cont}>
      <FlatList
        data={users}
        refreshing={refreshing}
        ListFooterComponent={footerIndicator}
        contentContainerStyle={{ flexGrow: 1 }}
        onEndReached={() => {
          if (!LoadingDone) {
            getOtherData();
          }
        }}
        onRefresh={() => {
          setRefresh(!refresh);
          setRefreshing(true);
        }}
        ListEmptyComponent={
          <ListEmptyComponent
            text="Bildirim bulunmamakta."
            refreshing={refreshing}
          />
        }
        renderItem={({ item }) => (
          <>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  marginLeft: 10,
                }}
              >
                {!item.read ? <Badge status="primary" /> : null}
                {item.avatar == "" ? (
                  <Avatar
                    size={60}
                    rounded
                    //title="MC"
                    source={require("../../../rec/Avatars/DefaultHastaAvatar.png")}
                    containerStyle={{ backgroundColor: "#3d4db7" }}
                  />
                ) : (
                  <Avatar
                    size={60}
                    rounded
                    //title="MC"
                    source={{ uri: item.avatar }}
                    containerStyle={{ backgroundColor: "#3d4db7" }}
                  />
                )}
              </View>
              <View style={styles.cardCont}>
                <Text
                  style={{
                    alignSelf: "flex-end",
                    position: "absolute",
                    color: "grey",
                  }}
                >
                  {DateNotifications(item.saat.toDate())}{" "}
                </Text>
                <Text style={[styles.text, { fontWeight: "500" }]}>
                  {item.name}, randevu talebinde bulundu.
                </Text>
                <Text style={[styles.text, { fontStyle: "italic" }]}>
                  Randevu Saat:{" "}
                  <Text style={{ fontWeight: "bold" }}>{item.RandevuSaat}</Text>
                </Text>
                <Text style={[styles.text, { fontStyle: "italic" }]}>
                  Randevu Tarih:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {item.RandevuTarih}
                  </Text>
                </Text>
                {/* <IconFeather name="info" size={30} color="#4fc3f7"/> */}
              </View>
            </View>
            <Separator marginStart={90} />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "white",
  },
  cardCont: {
    flex: 1,
    marginVertical: 5,
    padding: 10,
    paddingLeft: 20,
    // backgroundColor:"red",
    borderRadius: 10,
    // backgroundColor:"red"
    // marginHorizontal:,
  },
  text: {
    fontSize: 17,
    // backgroundColor:"red",
    paddingTop: 5,
  },
});

export default Notifications;
