import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import Header from "../../../components/Anonymous/Header";
import { SearchBar } from "react-native-elements";
import { StyleSheet } from "react-native";
import firebase from "firebase/compat/app";
import { SegmentedButtons } from "react-native-paper";
import ListEmptyComponentSeacrh from "../../../components/Anonymous/ListEmptyComponentSeacrh";
import RenderItemSearch from "./RenderItemSearch";
import LoadigIndicator from "../../../components/LoadigIndicator";

const Search = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [UsersData, setUsersData] = useState([]);
  const [pastUserData, setPastUserData] = useState([]);
  const [searchTitle, setSearchTitle] = useState("isim");
  const [IsPastUser, setIsPastUser] = useState(true);
  const [loading, setLoading] = useState(false);
  const user = firebase.auth().currentUser;
  useEffect(() => {
    let unmounted = false;
    firebase
      .firestore()
      .collection("H_user")
      .doc(user.uid)
      .collection("GeçmişAramalar")
      .onSnapshot((snapshot) => {
        const pastUserData = [];
        snapshot.forEach((snapsFor) => {
          firebase
            .firestore()
            .collection("D_user")
            .doc(snapsFor.data().doctorId)
            .get()
            .then((snaps) => {
              pastUserData.push({
                ...snaps.data(),
                key: snaps.id,
              });
            });
        });
        if (!unmounted) {
          setPastUserData(pastUserData);
          setIsPastUser(true);
        }
      });

    return () => {
      unmounted = true;
    };
  }, []);

  console.log(IsPastUser);

  const NameSearch = (searchx) => {
    setLoading(true);
    setIsPastUser(false);
    firebase
      .firestore()
      .collection("D_user")
      .where("nameSearch", "array-contains", searchx)
      .onSnapshot((snaps) => {
        var users = [];
        if (UsersData.length > 0) {
          snaps.forEach((snapsFor) => {
            const found = UsersData.find((user) => user.key == snapsFor.id);
            if (found == undefined) {
              // eşit değilse(eleman daha önce bulunmuyorsa ekle!)
              users.push({
                ...snapsFor.data(),
                key: snapsFor.id,
              });
            }
          });
          setUsersData(UsersData.concat(users));
          setLoading(false);
        } else {
          // hiç eleman yoksa direk ekle zaten
          snaps.forEach((snapsFor) => {
            users.push({
              ...snapsFor.data(),
              key: snapsFor.id,
            });
          });
          setUsersData(UsersData.concat(users));
          setLoading(false);
        }

        if (snaps.empty) {
          // sorgu doküman döndürmüyorsa
          setUsersData([]);
          setLoading(false);
        }
      });
  };

  const BransSearch = (searchx) => {
    setLoading(true);
    setIsPastUser(false);
    firebase
      .firestore()
      .collection("D_user")
      .where("bransSearch", "array-contains", searchx)
      .onSnapshot((snaps) => {
        var users = [];
        if (UsersData.length > 0) {
          snaps.forEach((snapsFor) => {
            const found = UsersData.find((user) => user.key == snapsFor.id);
            if (found == undefined) {
              // eşit değilse(eleman daha önce bulunmuyorsa ekle!)
              users.push({
                ...snapsFor.data(),
                key: snapsFor.id,
              });
            }
          });
          setUsersData(UsersData.concat(users));
          setLoading(false);
        } else {
          // hiç eleman yoksa direk ekle zaten
          snaps.forEach((snapsFor) => {
            users.push({
              ...snapsFor.data(),
              key: snapsFor.id,
            });
          });
          setUsersData(UsersData.concat(users));
          setLoading(false);
        }
        if (snaps.empty) {
          // sorgu doküman döndürmüyorsa
          setUsersData([]);
          setLoading(false);
        }
      });
  };

  const CalisilanYerSearch = (searchx) => {
    setLoading(true);
    setIsPastUser(false);
    firebase
      .firestore()
      .collection("D_user")
      .where("calislanYerSearch", "array-contains", searchx)
      .onSnapshot((snaps) => {
        var users = [];
        if (UsersData.length > 0) {
          snaps.forEach((snapsFor) => {
            const found = UsersData.find((user) => user.key == snapsFor.id);
            if (found == undefined) {
              // eşit değilse(eleman daha önce bulunmuyorsa ekle!)
              users.push({
                ...snapsFor.data(),
                key: snapsFor.id,
              });
            }
          });
          setUsersData(UsersData.concat(users));
          setLoading(false);
        } else {
          // hiç eleman yoksa direk ekle zaten
          snaps.forEach((snapsFor) => {
            users.push({
              ...snapsFor.data(),
              key: snapsFor.id,
            });
          });
          setUsersData(UsersData.concat(users));
          setLoading(false);
        }
        if (snaps.empty) {
          // sorgu doküman döndürmüyorsa
          setUsersData([]);
          setLoading(false);
        }
      });
  };

  const searchFirestore = (search) => {
    setSearch(search);
    const searchx =
      search != "" ? search[0].toUpperCase() + search.substring(1) : "";
    if (search != undefined) {
      if (search != "") {
        switch (searchTitle) {
          case "isim":
            NameSearch(searchx);
            break;
          case "brans":
            BransSearch(searchx);
            break;
          case "calisilanYer":
            CalisilanYerSearch(searchx);
            break;
          default:
            break;
        }
      } else {
        setUsersData([]);
        setIsPastUser(true);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        onPressChats={() => navigation.navigate("ChatsScreen")}
        onPressNotifications={() => navigation.navigate("Notifications")}
      />
      <Text
        style={{
          fontSize: 15,
          marginBottom: 0,
          fontStyle: "italic",
          alignSelf: "center",
          marginTop: 5,
          color: "grey",
        }}
      >
        *Ne olarak arayacağınızı seçin
      </Text>
      <SegmentedButtons
        value={searchTitle}
        onValueChange={setSearchTitle}
        density={"medium"}
        style={{ alignSelf: "center" }}
        buttons={[
          {
            value: "isim",
            label: "İsim",
          },
          {
            value: "brans",
            label: "Branş",
          },
          {
            value: "calisilanYer",
            label: "Çalışılan Yer",
          },
        ]}
      />

      <SearchBar
        placeholder="Ara..."
        onChangeText={(text) => searchFirestore(text)}
        value={search}
        inputContainerStyle={styles.input}
        lightTheme={true}
        platform="ios"
        cancelButtonTitle="Vazgeç"
      />

      <FlatList
        data={pastUserData}
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={<LoadigIndicator loading={loading} />}
        renderItem={_renderItem}
      />
    </View>
  );
};

const _renderItem = ({ item }) => <RenderItemSearch item={item} />;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    height: 40,
  },
});

export default Search;
