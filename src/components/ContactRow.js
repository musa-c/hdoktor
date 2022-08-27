import React, { useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Badge } from "react-native-elements";
// import { colors } from "../config/constants";

const ContactRow = ({
  name,
  subtitle,
  onPress,
  style,
  avatar,
  read,
  w_user,
}) => {
  console.log("avatar:", avatar);
  const AvatarReturn = () => {
    if (typeof avatar !== "undefined") {
      if (avatar != "") {
        return <Avatar size={70} source={{ uri: avatar }} rounded />;
      } else {
        if (w_user == "D_user") {
          return (
            <Avatar
              size={70}
              source={require("../rec/Avatars/DefaultDoctorAvatar.png")}
              rounded
            />
          );
        } else if (w_user == "H_user") {
          return (
            <Avatar
              size={70}
              source={require("../rec/Avatars/DefaultHastaAvatar.png")}
              rounded
            />
          );
        }
      }
    }
  };

  return (
    <TouchableOpacity style={[styles.row, style]} onPress={onPress}>
      <View style={styles.avatar}>{<AvatarReturn />}</View>
      <View style={styles.textsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {read == false ? <Badge status="primary" /> : null}
      <Ionicons name="chevron-forward-outline" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  avatar: {
    // width:56,
    // height:56,
    // backgroundColor:colors.primary,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"red"
  },
  avatarLabel: {
    fontSize: 20,
    color: "white",
  },
  textsContainer: {
    flex: 1,
    marginStart: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 2,
    color: "#565656",
  },
});

export default ContactRow;
