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
import ItemBoxNotification from "./Components/ItemBoxNotification";

const Notifications = () => {
  const user = firebase.auth().currentUser;
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState([]);
  const [LastCount, setLastCount] = useState();
  const [loading, setLoading] = useState(false);
  const [LoadingDone, setLoadingDone] = useState(false);
  const [LoadingDelete, setLoadingDelete] = useState(false);
  const [DeleteKey, setDeleteKey] = useState();

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

    first.onSnapshot((querySnapshot) => {
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
        .onSnapshot((querySnapshot) => {
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
        <ActivityIndicator animating size="small" color={"red"} />
      </View>
    ) : null;
  };

  const deleteItem = (key) => {
    setLoadingDelete(true);
    setDeleteKey(key);
    firebase
      .firestore()
      .collection("D_user")
      .doc(user.uid)
      .collection("Bildirimlerim")
      .doc(key)
      .delete()
      .then(() => {
        setLoadingDelete(false);
      })
      .catch(() => {
        setLoadingDelete(false);
        alert("Silme başarısız. Lütfen tekrar deneyiniz.");
      });
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
          <ItemBoxNotification
            item={item}
            loading={LoadingDelete}
            pressKey={DeleteKey}
            handleDelete={() => deleteItem(item.key)}
          />
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
});

export default Notifications;
