import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Separator = () => {
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        marginStart: 17,
        marginEnd: 20,
        backgroundColor: "red",
      }}
    ></View>
  );
};

export default Separator;
