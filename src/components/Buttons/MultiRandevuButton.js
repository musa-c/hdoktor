import { View, Text } from "react-native";
import React from "react";

const MultiRandevuButton = ({ randevuCount }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#FF2442",
        alignSelf: "baseline",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginStart: 5,
      }}
    >
      <View
        style={{
          backgroundColor: "#3DB2FF",
          justifyContent: "center",
          alignItems: "center",
          width: 22,
          height: 22,
          borderRadius: 30,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {randevuCount}
        </Text>
      </View>

      <Text
        mode="contained"
        style={{
          fontSize: 22,
          color: "white",
          fontWeight: "bold",
        }}
      >
        {" "}
        Adet Randevu
      </Text>
    </View>
  );
};

export default MultiRandevuButton;
