import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const LoadigIndicator = ({ loading }) => {
  return loading ? <ActivityIndicator animating size="small" /> : null;
};

export default LoadigIndicator;
