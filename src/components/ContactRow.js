import React, { useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Badge } from "react-native-elements";
// import { colors } from "../config/constants";
import Swipeable from "react-native-gesture-handler/Swipeable";

const ContactRow = ({
  name,
  subtitle,
  onPress,
  style,
  avatar,
  read,
  w_user,
  date,
  // handleDelete
}) => {
  const AvatarReturn = () => {
    if (typeof avatar != "undefined") {
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
  };

  // const leftSwipe = (progress, dragX) => {
  //   const scale = dragX.interpolate({
  //     inputRange: [0, 100],
  //     outputRange: [0, 1],
  //     extrapolate: "clamp",
  //   });
  //   return (
  //     <TouchableOpacity activeOpacity={0.6} style={styles.deleteBox}>
  //       <Animated.View style={{ transform: [{ scale: scale }] }}>
  //         <Ionicons name="trash" size={30} color="red" />
  //       </Animated.View>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <TouchableOpacity style={[styles.row, style]} onPress={onPress}>
      <View style={styles.avatar}>{<AvatarReturn />}</View>
      <View style={styles.textsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {read == false ? <Badge status="primary" /> : null}
      <View style={{ alignItems: "center" }}>
        {date != "" ? (
          <Text style={{ fontSize: 13, color: "grey", marginVertical: 10 }}>
            {date}
          </Text>
        ) : null}

        <Ionicons name="chevron-forward-outline" size={20} />
      </View>
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
  deleteBox: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
});

export default ContactRow;
