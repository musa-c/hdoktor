import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { memo } from "react";
import { Avatar } from "react-native-elements";
import Separator from "../../../components/Separator";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const RenderItemSearch = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MoreDoctorInfo", {
            doctorId: item.key,
            name: item.name,
            brans: item.brans,
            gender: item.cinsiyet,
            email: item.email,
            time1: item.time1.toDate(),
            time2: item.time2.toDate(),
            CalisilanYer: item.CalisilanYer,
            avatar: item.avatar,
            rating: item.rating,
          })
        }
      >
        <View style={styles.card}>
          <View style={styles.cardImage}>
            {item.avatar == "" ? (
              <Avatar
                size={80}
                source={require("../../../rec/Avatars/DefaultDoctorAvatar.png")}
                avatarStyle={styles.imageStyle}
                activeOpacity={0.7}
                rounded
              />
            ) : (
              <Avatar
                size={80}
                // rounded
                source={{ uri: item.avatar }}
                avatarStyle={styles.imageStyle}
                activeOpacity={0.7}
                rounded
              />
            )}
          </View>
          <View style={styles.CardInfo}>
            <Text
              style={{
                color: "black",
                fontSize: 17,
                paddingStart: 5,
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingStart: 5,
                paddingBottom: 5,
                textAlign: "auto",
              }}
            >
              <Icon name="stethoscope" size={18} color="#B71C1C" />
              &nbsp;&nbsp;{item.brans}
            </Text>

            {item.CalisilanYer != "" ? (
              <Text style={{ color: "black", fontSize: 15, paddingStart: 5 }}>
                <Icon name="h-square" size={18} color="#B71C1C" />
                &nbsp;&nbsp;{item.CalisilanYer}
              </Text>
            ) : null}

            <View
              style={{
                marginHorizontal: 5,
                marginTop: 5,
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  color: "grey",
                  fontSize: 15,
                  fontStyle: "italic",
                }}
              >
                Daha fazla bilgi al
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Separator />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#fff",

    marginVertical: 7,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  cardImage: {
    flex: 3,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  CardInfo: {
    flex: 7,
  },
  cardIcon: {
    flex: 2,
    backgroundColor: "yellow",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: 300,
    backgroundColor: "#B71C1C",
    borderRadius: 25,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
});

export default memo(RenderItemSearch);
