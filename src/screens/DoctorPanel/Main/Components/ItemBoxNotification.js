import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Badge } from "react-native-elements";
import Separator from "../../../../components/Separator";
import moment from "moment";

const ItemBoxNotification = ({ item, handleDelete, loading, pressKey }) => {
  const DateNotifications = (date) => {
    //const notificationDate = moment(date).format("l");
    const d = new Date();
    const currentDate =
      d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
    if (moment(date).format("l") == currentDate) {
      return moment(date).format("LT");
    } else if (d.getDate + 1 == moment(date).format("Do")) {
      return "Dün " + moment(date).format("LT");
    } else {
      return moment(date).format("ll");
    }
  };

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        onPress={handleDelete}
        activeOpacity={0.6}
        style={styles.deleteBox}
      >
        <Animated.Text style={{ transform: [{ scale: scale }] }}>
          {loading && pressKey == item.key ? (
            <ActivityIndicator animating size={"small"} color={"red"} />
          ) : (
            <Ionicons name="trash" size={30} color="red" />
          )}
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              marginLeft: 10,
            }}
          >
            {!item.read ? <Badge status="primary" /> : null}
            {item.avatar == "" ? (
              <Avatar
                size={60}
                rounded
                //title="MC"
                source={require("../../../../rec/Avatars/DefaultHastaAvatar.png")}
                containerStyle={{ backgroundColor: "#3d4db7" }}
              />
            ) : (
              <Avatar
                size={60}
                rounded
                //title="MC"
                source={{ uri: item.avatar }}
                containerStyle={{ backgroundColor: "#3d4db7" }}
              />
            )}
          </View>
          <View style={styles.cardCont}>
            <Text
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                color: "grey",
              }}
            >
              {DateNotifications(item.saat.toDate())}{" "}
            </Text>
            <Text style={[styles.text, { fontWeight: "500" }]}>
              {item.name}, randevu talebinde bulundu.
            </Text>
            <Text style={[styles.text, { fontStyle: "italic" }]}>
              Randevu Saat:{" "}
              <Text style={{ fontWeight: "bold" }}>{item.RandevuSaat}</Text>
            </Text>
            <Text style={[styles.text, { fontStyle: "italic" }]}>
              Randevu Tarih:{" "}
              <Text style={{ fontWeight: "bold" }}>{item.RandevuTarih}</Text>
            </Text>
            {/* <IconFeather name="info" size={30} color="#4fc3f7"/> */}
          </View>
        </View>
        <Separator marginStart={90} />
      </>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  cardCont: {
    flex: 1,
    marginVertical: 5,
    padding: 10,
    paddingLeft: 20,
    // backgroundColor:"red",
    borderRadius: 10,
    // backgroundColor:"red"
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

export default ItemBoxNotification;
