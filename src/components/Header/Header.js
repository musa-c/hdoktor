import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import Logo from "./Logo";

import IconFeather from "react-native-vector-icons/Feather";

import { Badge } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

const Header = ({ onPressChats, onPressNotifications }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.viewStyle}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={onPressChats}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <IconFeather name="mail" size={30} color="black" />
            <Badge
              value="2"
              status="primary"
              containerStyle={{ position: "absolute", left: 20 }}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 4, alignItems: "center", justifyContent: "center" }}>
        <Logo />
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={onPressNotifications}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <IconFeather name="bell" size={30} color="black" />
            <Badge
              value="5"
              status="primary"
              containerStyle={{ position: "absolute", left: 17 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 60,
    borderWidth: 0.3,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: "grey",
    paddingTop: 20,
  },
});

export default Header;
