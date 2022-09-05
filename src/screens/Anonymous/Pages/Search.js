import { View, Text } from "react-native";
import React, { useState } from "react";
import Header from "../../../components/Anonymous/Header";
import { SearchBar } from "react-native-elements";
import { StyleSheet } from "react-native";

const Search = ({ navigation, route }) => {
  const [search, setSearch] = useState();
  const w_anonymous = route.params.w_anonymous;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        onPressChats={() =>
          navigation.navigate("ChatsScreen", {
            w_anonymous: w_anonymous,
          })
        }
        onPressNotifications={() =>
          navigation.navigate("Notifications", { w_anonymous: w_anonymous })
        }
      />
      <SearchBar
        placeholder="Ara..."
        onChangeText={(text) => setSearch(text)}
        value={search}
        inputContainerStyle={styles.input}
        lightTheme={true}
        platform="ios"
        cancelButtonTitle="Vazgeç"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    height: 40,
  },
});

export default Search;
