import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import moment from "moment";
import { Avatar, Badge } from "react-native-elements";
import Separator from "../../../components/Separator";

const Notifications = () => {
  const user = firebase.auth().currentUser;
  const [data, setData] = useState([]);

  useEffect(() => {
    let unmounted = false;

    firebase
      .firestore()
      .collection("H_user")
      .doc(user.uid)
      .collection("Bildirimlerim")
      .onSnapshot((snapshot) => {
        const data = [];
        snapshot.forEach((documentSnapshot) => {
          data.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        if (!unmounted) {
          setData(data);
        }
      });
    return () => {
      unmounted = true;
    };
  }, []);

  console.log(data);

  return (
    <View style={styles.cont}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  flex: 1,
                }}
              >
                <Badge status="primary" />
                <Avatar
                  size={60}
                  rounded
                  source={{ uri: item.avatar }}
                  containerStyle={{ backgroundColor: "#3d4db7" }}
                />
              </View>
              <View style={styles.cardCont}>
                <Text
                  style={{
                    alignSelf: "flex-end",
                    position: "absolute",
                    color: "grey",
                  }}
                >
                  {moment(item.saat.toDate()).format("LT")}{" "}
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
