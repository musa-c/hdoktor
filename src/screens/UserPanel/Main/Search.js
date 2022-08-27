import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Header from "../../../components/Header/Header";
import { SearchBar } from "react-native-elements";

const Search = () => {
  const [search, setSearch] = useState();

  return (
    <View style={style.SearchStyle}>
      <Header
        onPressChats={() =>
          navigation.navigate("ChatsScreen", { screen: "Chats" })
        }
        onPressNotifications={() => navigation.navigate("Notifications")}
        W_user="H_user"
      />
      {/* <View style={style.cont}>
                
            <View style={{flex:20, height:40}}>
        <TextInput style={style.InputStyle}  placeholder="Ara" />
        
            </View>
    
        <View style={{position:"absolute", width:50, height:40, justifyContent:"center", alignItems:"center" }}>
        <Icon name="search" size={16} color="grey" />

        </View>
       
                
              
                
            </View> */}

      <SearchBar
        placeholder="Ara..."
        onChangeText={(text) => setSearch(text)}
        value={search}
        inputContainerStyle={style.input}
        lightTheme={true}
        platform="ios"
        cancelButtonTitle="Vazgeç"
      />
    </View>
  );
};

const style = StyleSheet.create({
  SearchStyle: {
    backgroundColor: "#fff",
    flex: 1,
    flexGrow: 1,
  },
  cont: {
    flexDirection: "row",
  },
  InputStyle: {
    backgroundColor: "#FAFAFA",

    marginTop: 2,
    fontSize: 16,
    borderRadius: 15,
    marginHorizontal: 10,
    paddingHorizontal: 26,
    paddingVertical: 10,

    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 5,
    //     height: 4,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 15,

    // elevation: 15,
    borderColor: "#BDBDBD",
    borderWidth: 0.5,
    flex: 1,
    color: "black",
  },
  input: {
    borderRadius: 25,
    height: 40,
  },
});
export default Search;
