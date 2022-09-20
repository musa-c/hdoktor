import { View, Text } from "react-native";
import React from "react";

const ListEmptyComponentSeacrh = ({ text, loading }) => {
  return (
    <>
      {!loading && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18, color: "grey" }}>{text}</Text>
        </View>
      )}
    </>
  );
};

export default ListEmptyComponentSeacrh;
