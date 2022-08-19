import React from "react";
import { View, StyleSheet } from "react-native";
// import {colors} from "../config/constants"

const Separator = ({ marginStart, backgroundColor }) => {
  return (
    <View
      style={[
        styles.separator,
        { marginStart: marginStart, backgroundColor: backgroundColor },
      ]}
    ></View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E2E2E2",
    // marginStart:88
  },
});

export default Separator;
