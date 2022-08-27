import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import firebase from "firebase/compat/app";
import ContactRow from "../../components/ContactRow";
import Separator from "../../components/Separator";

//     ***********   FİREBASE USERUPDATE NESNESİ OLMADIĞI İÇİN HATA GELİYOR HASTA PANELİNDEN ***********

const Chats = ({ navigation }) => {
  const [DAvatar, setDavatar] = useState();
  const [W_user, setW_user] = useState();

  const [chats, setChats] = useState([]);
  useEffect(() => {
    let unmounted = false;
    firebase
      .firestore()
      .collection("Chats")
      .where("users", "array-contains", firebase.auth()?.currentUser?.email) // benim mailimin içerdiği dokümanları getirecek!.
      .onSnapshot((snapshot) => {
        if (!unmounted) {
          setChats(snapshot.docs);
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

  console.log(DAvatar);

  const user = firebase.auth().currentUser;
  const [name, setName] = useState();

  return (
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
            subtitle={
              chat.data().messages.length === 0
                ? ""
                : chat.data().messages[0].text
            }
            read={W_user == "H_user" ? chat.data().Hread : chat.data().Dread}
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
  );
};

const styles = StyleSheet.create({});

export default Chats;
