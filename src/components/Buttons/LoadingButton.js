import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const LoadingButton = ({
  icon,
  loading,
  onPress,
  text,
  FontStyle,
  mode,
  disabled,
  color,
  style,
}) => {
  // console.log(fontSize);
  return (
    <View>
      <Button
        mode={mode}
        // mode={"text"}
        loading={loading}
        onPress={onPress}
        contentStyle={{
          justifyContent: "space-around",
          alignItems: "center",
          //          backgroundColor: "red",
          alignSelf: "center",
          marginVertical: 2,
          padding: 0,
        }}
        style={[styles.cont, style]}
        icon={icon}
        color={color}
        disabled={disabled}
        labelStyle={[styles.labelStyle, FontStyle]}
      >
        {text}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#B71C1C",
    alignItems: "baseline",
  },
  cont: {
    alignSelf: "baseline",
  },
});
// LoadingButton.defaultProps = {
//   fontsize: 40,
// };

export default LoadingButton;
