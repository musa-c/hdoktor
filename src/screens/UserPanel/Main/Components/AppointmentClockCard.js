import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import moment from "moment";
import trLocale from "moment/locale/tr";

const AppointmentClockCard = ({ clock }) => {
  return (
    <TouchableOpacity>
      <View style={styles.timeContainer}>
        <Text style={{ color: "#707070" }}>{clock}</Text>
        <View style={styles.freeArea}>
          <Text style={{ color: "#707070" }}>FREE</Text>
          <View style={styles.radio}></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    borderColor: "#DBE3EB",
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  freeArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  radio: {
    height: 15,
    width: 15,
    borderRadius: 30,
    borderColor: "#7D8392",
    borderWidth: 1,
    marginLeft: 10,
  },
});

export default AppointmentClockCard;
