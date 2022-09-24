import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import moment from "moment";
import { Avatar, Badge } from "react-native-elements";
import Separator from "../../../components/Separator";
import ListEmptyComponent from "../../../components/ListEmptyComponent";

const Notifications = () => {
  const user = firebase.auth().currentUser;
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const DateNotifications = (date) => {
    //const notificationDate = moment(date).format("l");
    const d = new Date();
    const currentDate =
      d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
    // console.log("currentDatex:", currentDate);
    // console.log("date:", moment(date).format("l"));
    if (moment(date).format("l") == currentDate) {
      return moment(date).format("LT");
    } else if (d.getDate() - 1 == moment(date).format("Do")) {
      return "Dün " + moment(date).format("LT");
    } else {
      return moment(date).format("ll");
    }
  };

  useEffect(() => {
    const d = new Date();
    const currentDate =
      d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

    console.log("date:", currentDate);

    let unmounted = false;
    if (!unmounted) {
      setRefreshing(true);
    }
    firebase
      .firestore()
      .collection("H_user")
      .doc(user.uid)
      .collection("Bildirimlerim")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((documentSnapshot) => {
          data.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        if (!unmounted) {
          setData(data);
          setRefreshing(false);
        }
      })
      .then(() => {
        firebase
          .firestore()
          .collection("H_user")
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
    return () => {
      unmounted = true;
    };
  }, [refresh]);

  return (
    <View style={styles.cont}>
      <FlatList
        data={data}
        refreshing={refreshing}
        contentContainerStyle={{ flexGrow: 1 }}
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
                    source={require("../../../rec/Avatars/DefaultDoctorAvatar.png")}
                    containerStyle={{ backgroundColor: "#3d4db7" }}
                  />
                ) : (
                  <Avatar
                    size={60}
                    rounded
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
                  {item.Doktor}, Randevu talebinizi kabul etti.
                </Text>
                <Text style={[styles.text, { fontStyle: "italic" }]}>
                  Randevu Saatiniz:{" "}
                  <Text style={{ fontWeight: "bold" }}>{item.RandevuSaat}</Text>
                </Text>
                <Text style={[styles.text, { fontStyle: "italic" }]}>
                  Randevu Tarihiniz:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {item.RandevuTarih}
                  </Text>
                </Text>
                {/* <IconFeather name="info" size={30} color="#4fc3f7"/> */}
              </View>
            </View>
            <Separator marginStart={40} />
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
    // flex:15,
    flex: 1,
    marginVertical: 5,
    padding: 10,
    paddingLeft: 20,
    // backgroundColor:"red",
    borderRadius: 10,
    // marginHorizontal:,
  },
  text: {
    fontSize: 17,
    // backgroundColor:"red",
    paddingTop: 5,
  },
});

export default Notifications;
