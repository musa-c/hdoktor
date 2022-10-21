import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import ListEmptyComponent from "../../../components/ListEmptyComponent";
import { isEqual } from "lodash";
import ItemBoxNotification from "./Components/ItemBoxNotification";

const Notifications = () => {
  const user = firebase.auth().currentUser;
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
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
      .collection("H_user")
      .doc(user.uid)
      .collection("Bildirimlerim")
      .orderBy("saat", "desc")
      .limit(20);

    first.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((documentSnapshot) => {
        data.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      if (!unmounted) {
        setLastCount(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setData(data);
        setRefreshing(false);
      }
    });
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

    return () => {
      unmounted = true;
    };
  }, [refresh]);

  const getOtherData = () => {
    setLoading(true);
    if (LastCount != undefined) {
      firebase
        .firestore()
        .collection("H_user")
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
            const DataOther = [];
            querySnapshot.forEach((documentSnapshot) => {
              DataOther.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setData(data.concat(DataOther));
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
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size={"small"} />
      </View>
    ) : null;
  };

  const deleteItem = (key) => {
    setLoadingDelete(true);
    setDeleteKey(key);
    firebase
      .firestore()
      .collection("H_user")
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
        data={data}
        refreshing={refreshing}
        ListFooterComponent={footerIndicator}
        onEndReached={() => {
          if (!LoadingDone) {
            getOtherData();
          }
        }}
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
          <ItemBoxNotification
            item={item}
            handleDelete={() => deleteItem(item.key)}
            pressKey={DeleteKey}
            loading={LoadingDelete}
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
  deleteBox: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
});

export default Notifications;
