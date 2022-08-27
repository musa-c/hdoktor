import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import "dayjs/locale/tr";
import { GiftedChat, Send, InputToolbar } from "react-native-gifted-chat";
import firebase from "firebase/compat/app";
import { Ionicons } from "@expo/vector-icons";

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [uid, setUID] = useState("");
  const [W_user, setW_user] = useState("");

  useEffect(() => {
    let unmounted = false;
    const user = firebase.auth().currentUser;
    if (!unmounted) {
      setUID(user?.uid);
    }
    firebase
      .firestore()
      .collection("D_user")
      .where("Id", "==", user.uid)
      .get()
      .then((query) => {
        if (!query.empty) {
          firebase
            .firestore()
            .collection("D_user")
            .doc(user.uid)
            .onSnapshot((snaps) => {
              if (!unmounted) {
                // mevcut olarak d user açıksa karşı tarafına read false vermemem gerekir.
                setW_user("H_user");
                setAvatar(
                  snaps.data()?.avatar ??
                    "https://firebasestorage.googleapis.com/v0/b/hdoktor-1b373.appspot.com/o/avatars%2FD_avatars%2FDefaultDoctorAvatar.png?alt=media&token=64165142-27b8-486b-9a58-5cab9baf340a"
                );
              }
            });

          firebase
            .firestore()
            .doc("Chats/" + route.params.id)
            .get()
            .then((snaps) => {
              if (snaps.data().Dread == false) {
                snaps.ref.update({ Dread: true });
              }
            });
        } else {
          firebase
            .firestore()
            .collection("H_user")
            .doc(user.uid)
            .onSnapshot((snaps) => {
              if (!unmounted) {
                // mevcut olarak H user açıksa karşı tarafına read false vermemem gerekir.
                setW_user("D_user");
                setAvatar(
                  snaps.data()?.avatar ??
                    "https://firebasestorage.googleapis.com/v0/b/hdoktor-1b373.appspot.com/o/avatars%2FH_avatars%2FDefaultHastaAvatar.png?alt=media&token=66f93caf-ef41-461b-9e20-b35ac92a8084"
                );
              }
            });
          firebase
            .firestore()
            .doc("Chats/" + route.params.id)
            .get()
            .then((snaps) => {
              if (snaps.data().Hread == false) {
                snaps.ref.update({ Hread: true });
              }
            });
        }
      });
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;
    // backticks nedir? araştir.
    firebase
      .firestore()
      .doc("Chats/" + route.params.id)
      .onSnapshot((doc) => {
        if (!unmounted) {
          setMessages(
            doc.data()?.messages ?? [],
            doc.data().messages.user?.avatar ?? ""
          );
        }
      });
    return () => {
      unmounted = true;
    };
  }, [route.params.id]);

  const onSend = useCallback(
    (m = []) => {
      firebase
        .firestore()
        .doc("Chats/" + route.params.id)
        .set({ messages: GiftedChat.append(messages, m) }, { merge: true });

      if (W_user == "H_user") {
        firebase
          .firestore()
          .doc("Chats/" + route.params.id)
          .set({ Hread: false }, { merge: true });
      } else if (W_user == "D_user") {
        firebase
          .firestore()
          .doc("Chats/" + route.params.id)
          .set({ Dread: false }, { merge: true });
      }

      // append içindeki 1. parametre mevcut mesajlar, 2. parametre gönder butonuna basıldıktan sonraki mesajlar
      // bu iki mesajları birleştiriyoruz.
    },
    [route.params.id, messages]
  );

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <GiftedChat
        messages={messages.map((x) => ({
          ...x,
          createdAt: x.createdAt?.toDate(),
        }))}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: uid,
          avatar: avatar,
        }}
        locale="tr"
        placeholder=""
        alwaysShowSend={true}
        renderSend={(props) => (
          <Send
            {...props}
            containerStyle={{
              justifyContent: "center",
              alignItems: "center",
              marginEnd: 10,
            }}
          >
            <Ionicons name="send" size={25} color="black" />
          </Send>
        )}
        textInputStyle={styles.InputStyle}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: "gainsboro",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  InputStyle: {
    backgroundColor: "white",
    borderRadius: 20,
    marginEnd: 10,
    padding: 10,
    textAlign: "justify",
    paddingTop: 10,
  },
});

export default Chat;
