import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import firebase from "firebase/compat/app";
import ContactRow from "../../components/ContactRow";
import Separator from "../../components/Separator";
import moment from "moment";
import trLocale from "moment/locale/tr";

//     ***********   FİREBASE USERUPDATE NESNESİ OLMADIĞI İÇİN HATA GELİYOR HASTA PANELİNDEN ***********

const Chats = ({ navigation }) => {
  const [DAvatar, setDavatar] = useState();
  const [W_user, setW_user] = useState();

  const [chats, setChats] = useState([]);
  useEffect(() => {
    let unmounted = false;

    const Chats = [];

    firebase
      .firestore()
      .collection("Chats")
      .where("users", "array-contains", firebase.auth().currentUser.email)

      // benim mailimin içerdiği dokümanları getirecek!.
      .onSnapshot((snapshot) => {
        if (!unmounted) {
          snapshot.forEach((snapshotQuery) => {
            setChats(
              snapshot.docs.sort(
                (objA, objB) =>
                  Number(objB.data()?.messages[0]?.createdAt ?? "") -
                  Number(objA.data()?.messages[0]?.createdAt ?? "")
              )
            );
          });

          // setChats(snapshot.docs);
        }
      });

    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("D_user")
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setW_user("H_user");
          firebase
            .firestore()
            .collection("H_user")
            .doc(user.uid)
            .onSnapshot((snapshot) => {
              setDavatar(snapshot.data()?.avatar ?? "");
            });
        } else {
          setW_user("D_user");
          firebase
            .firestore()
            .collection("D_user")
            .doc(user.uid)
            .onSnapshot((snapshot) => {
              setDavatar(snapshot.data()?.avatar ?? "");
            });
        }
      });

    return () => {
      unmounted = true;
    };
  }, []);

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontSize: 20, color: "grey" }}>Mesaj bulunmamakta.</Text>
      </View>
    );
  };

  const user = firebase.auth().currentUser;
  const [name, setName] = useState();

  // chats.map((chat) => {
  //   console.log(
  //     "MESAJ: ",
  //     chat.data().messages[chat.data().messages.length - 1].createdAt
  //   );
  // });

  return (
    <>
      {chats.length > 0 ? (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          {chats.map((chat) => (
            <React.Fragment key={chat.id}>
              <ContactRow
                name={chat
                  .data()
                  .names.find(
                    (x) => x !== firebase.auth().currentUser?.displayName
                  )}
                avatar={chat.data().avatar.find((x) => x != DAvatar)}
                date={
                  chat.data().messages.length > 0
                    ? moment(chat.data()?.messages[0]?.createdAt.toDate())
                        .locale("tr", trLocale)
                        .format("LT")
                    : ""
                }
                subtitle={
                  chat.data().messages.length === 0
                    ? ""
                    : chat.data().messages[0].text
                }
                read={
                  W_user == "H_user" ? chat.data().Hread : chat.data().Dread
                }
                w_user={W_user == "H_user" ? "D_user" : "H_user"}
                onPress={() =>
                  navigation.navigate("Chat", {
                    id: chat.id,
                    name: chat
                      .data()
                      .names.find(
                        (x) => x !== firebase.auth().currentUser?.displayName
                      ),
                  })
                }
              />
              <Separator marginStart={88} backgroundColor="#E2E2E2" />
            </React.Fragment>
          ))}
        </ScrollView>
      ) : (
        <ListEmptyComponent />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default Chats;
