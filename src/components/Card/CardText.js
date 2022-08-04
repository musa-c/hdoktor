import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const CardText = ({ iconFont, iconIonic, text, style, size }) => {
  return (
    <View>
      <Text style={[styles.textStyle, style]}>
        <FontAwesome5 name={iconFont} size={size} color="#B71C1C" />
        <Ionicons name={iconIonic} size={size} color="#B71C1C" />
        &nbsp;&nbsp;{text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: "black",
    fontSize: 19,
    paddingStart: 5,
    marginBottom: 10,
  },
});

export default CardText;
