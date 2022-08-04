import { View, Text, Dimensions, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import Modal from "react-native-modal";
//

const NoteModal = ({
  isModalVisible,
  onBackdropPress,
  iconPress,
  onChangeText,
  defaultValue,
  loading,
  ButtonOnPress,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
      onBackdropPress={onBackdropPress}
      backdropOpacity={0.8}
      avoidKeyboard
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 15,
          width: Dimensions.get("screen").width / 1.1,
        }}
      >
        <Ionicons
          name="close-outline"
          color="grey"
          size={30}
          onPress={iconPress}
          style={{ alignSelf: "flex-end", marginRight: 10, marginTop: 5 }}
        />
        <Text
          style={{
            fontSize: 30,
            position: "absolute",
            fontWeight: "700",
            marginLeft: 10,
            marginTop: 5,
          }}
        >
          Notlarım
        </Text>

        <View
          style={{ marginHorizontal: 10, marginBottom: 10, minHeight: 200 }}
        >
          <TextInput
            placeholder="Hasta ile ilgili not oluştur."
            style={{ fontSize: 18, paddingVertical: 10, flex: 1 }}
            multiline
            textAlignVertical="top"
            //maxLength={500}
            //    value={note}
            defaultValue={defaultValue}
            //  value={changenote}
            numberOfLines={10}
            keyboardType="default"
            onChangeText={onChangeText}
          />
        </View>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Button
            mode="contained"
            loading={loading}
            onPress={ButtonOnPress}
            disabled={loading}
            style={{ borderRadius: 20, padding: 5, backgroundColor: "#B71C1C" }}
          >
            KAYDET
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default NoteModal;
