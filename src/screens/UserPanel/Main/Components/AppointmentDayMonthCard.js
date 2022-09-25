import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const AppointmentDayMonthCard = ({ month, day, onPress, isSelected }) => {
  const [MonthDay, setMonthDay] = useState("");
  const [isOnClick, setIsOnClick] = useState(false);

  const getBackgroundColor = () => {
    let color;
    if (day + "." + (month + 1) == MonthDay) {
      color = "red";
    }
    if (isOnClick == false) {
      color = "white";
    }
    return color;
  };

  const GetMonth = (month) => {
    switch (month) {
      case 1:
        return "Ocak";
      case 2:
        return "Şubat";
      case 3:
        return "Mart";
      case 4:
        return "Nisan";
      case 5:
        return "Mayıs";
      case 6:
        return "Haziran";
      case 7:
        return "Temmuz";
      case 8:
        return "Ağustos";
      case 9:
        return "Eylül";
      case 10:
        return "Ekim";
      case 11:
        return "Kasım";
      case 12:
        return "Aralık";
      default:
        break;
    }
  };

  return (
    <TouchableOpacity
      // onPress={() => {
      //   setMonthDay(day + "." + (month + 1)), setIsOnClick(!isOnClick);
      // }}
      onPress={onPress}
    >
      <View
        style={[
          styles.dataBox,
          isSelected
            ? { backgroundColor: "#EB1D36" }
            : { backgroundColor: "white" },
        ]}
      >
        <Text style={isSelected ? { color: "white" } : { color: "black" }}>
          {GetMonth(month)}
        </Text>
        <Text
          style={[
            { fontWeight: "bold" },
            isSelected ? { color: "white" } : { color: "black" },
          ]}
        >
          {day}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dataBox: {
    height: 73,
    width: 63,
    borderColor: "#C7CBCF",
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
});

export default AppointmentDayMonthCard;
