import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Separator from "./Separator";

const InfoCard = ({ topInfo, value, icon, onPressIcon }) => {
  return (
    <>
      <View style={styles.userInfo}>
        <Text style={styles.topInfoStyle}>{topInfo}</Text>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5 name={icon} size={22} />
          <Text style={styles.ValueStyle}>{value}</Text>
          <Ionicons
            name="ellipsis-horizontal-circle"
            size={22}
            onPress={onPressIcon}
          />
        </View>
      </View>
      <Separator />
    </>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    padding: 10,
    marginVertical: 5,
  },
  ValueStyle: {
    fontWeight: "400",
    fontSize: 20,
    paddingHorizontal: 10,
    flex: 1,
  },
  topInfoStyle: {
    marginBottom: 7,
    marginLeft: 32,
    color: "grey",
  },
});

export default InfoCard;
