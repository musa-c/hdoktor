import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import trLocale from "moment/locale/tr";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import LoadingButton from "../Buttons/LoadingButton";
import UpdateUserName from "../../db/UpdateUserName";
import firebase from "firebase/compat/app";
import SuccesModal from "./SuccesModal";

const ProfileUpdateModal = ({
  value,
  isInfoModalVisible,
  onBackdropPress,
  infoTitle,
  topInfo,
  placeHolderModal,
  toggleModal,
  id,
}) => {
  const [updateValue, setUpdateValue] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dogumTarih, setdogumTarih] = useState(value);
  const [checkedE, setCheckedE] = useState(value == "Erkek" ? true : false);
  const [checkedK, setCheckedK] = useState(value == "Kadın" ? true : false);
  const [cinsiyet, setCinsiyet] = useState("");

  const isCheckedErkek = () => {
    if (checkedE == true) {
      setCheckedE(false);
      setCinsiyet("");
    } else {
      setCheckedE(true);
      setCinsiyet("Erkek");
      setCheckedK(false);
    }
  };
  const isCheckedKadın = () => {
    if (checkedK == true) {
      setCheckedK(false);
      setCinsiyet("");
    } else {
      setCheckedK(true);
      setCinsiyet("Kadın");
      setCheckedE(false);
    }
  };

  const handleConfirm = (dogumTarih) => {
    setdogumTarih(moment(dogumTarih).locale("tr", trLocale).format("l"));
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  //console.log(topInfo);
  let Validation = false;
  const Validate = (topInfo, updateValue) => {
    switch (topInfo) {
      case "İsim":
        if (updateValue != "") {
          if (updateValue.length > 1) {
            Validation = true;
            return (
              <TextInput.Icon
                name="check-circle-outline"
                forceTextInputFocus={false}
                color={"green"}
              />
            );
          } else {
            return (
              <TextInput.Icon
                name="close-circle-outline"
                forceTextInputFocus={false}
                color={"#f44336"}
              />
            );
          }
        }
        break;
      case "E-mail":
        if (updateValue != "") {
          if (
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              updateValue.toLowerCase()
            )
          ) {
            Validation = true;
            return (
              <TextInput.Icon
                name="check-circle-outline"
                forceTextInputFocus={false}
                color={"green"}
              />
            );
          } else {
            return (
              <TextInput.Icon
                name="close-circle-outline"
                forceTextInputFocus={false}
                color={"#f44336"}
              />
            );
          }
        }
        break;
      case "Telefon Numarası":
        if (updateValue != "") {
          if (
            /(^[0\s]?[\s]?)([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/g.test(
              updateValue
            )
          ) {
            Validation = true;
            return (
              <TextInput.Icon
                name="check-circle-outline"
                forceTextInputFocus={false}
                color={"green"}
              />
            );
          } else {
            return (
              <TextInput.Icon
                name="close-circle-outline"
                forceTextInputFocus={false}
                color={"#f44336"}
              />
            );
          }
        }
        break;
      case "Yaş":
        break;
      case "Cinsiyet":
        break;
      default:
        break;
    }
  };

  const [update, setUpdate] = useState(false);

  const nameUpdate = (id, UpdateName) => {
    firebase
      .firestore()
      .collection("H_user")
      .doc(id)
      .update({ name: UpdateName })
      .then(() => {
        setUpdate(true);
        setTimeout(() => {
          setUpdate(false);
          toggleModal();
        }, 3000);
      })
      .catch((e) => setUpdate(false));
  };

  const [loading, setLoading] = useState(false);

  const Update = async (topInfo, updateValue, toggleModal) => {
    switch (topInfo) {
      case "İsim":
        nameUpdate(id, updateValue);
        break;
      case "E-mail":
        break;
      case "Telefon  Numarası":
        break;
      case "Yaş":
        break;
      case "Cinsiyet":
        break;
      default:
        break;
    }
  };

  const LeftComponent = (topInfo) => {
    if (topInfo == "Telefon Numarası") {
      return <TextInput.Affix text="+90" textStyle={{ fontSize: 20 }} />;
    }
  };

  return (
    <Modal
      isVisible={isInfoModalVisible}
      style={{
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      onBackdropPress={onBackdropPress}
      backdropOpacity={0.8}
      onModalHide={() => {
        setdogumTarih("");
        setCheckedE(false);
        setCheckedK(false);
      }}
      onModalShow={() => {
        if (value == "Erkek") {
          setCheckedE(true);
        } else if (value == "Kadın") {
          setCheckedK(true);
        }
      }}
      //avoidKeyboard
    >
      <KeyboardAvoidingView
        behavior="padding"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          paddingVertical: 10,
        }}
      >
        <SuccesModal isVisible={update} />
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            width: Dimensions.get("screen").width / 1.1,
            paddingVertical: 15,
          }}
        >
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale="tr-TR"
            confirmTextIOS="Tamam"
            cancelTextIOS="İptal"
          />

          <View style={styles.titleCont}>
            <Text style={styles.titleText}>Düzenleme</Text>
          </View>
          <View style={styles.textCont}>
            <Text style={styles.infoTitle}>
              <Text style={styles.valueStyle}>{value} </Text>
              {infoTitle}
            </Text>
          </View>
          {topInfo == "İsim" ||
          topInfo == "E-mail" ||
          topInfo == "Telefon Numarası" ? (
            <TextInput
              style={styles.textInput}
              value={updateValue}
              onChangeText={(text) => setUpdateValue(text)}
              activeOutlineColor="#B71C1C"
              outlineColor="white"
              right={Validate(topInfo, updateValue)}
              left={LeftComponent(topInfo)}
              // underlineColor="red"
              //placeholderTextColor="#fff"
              theme={{ roundness: 10 }}
              mode="outlined"
              label={placeHolderModal}
            ></TextInput>
          ) : topInfo == "Yaş" ? (
            <TouchableOpacity onPress={showDatePicker}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#ECECEC",
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  paddingHorizontal: 20,
                  margin: 15,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 20 }}>
                  {dogumTarih == "" ? value : dogumTarih}
                </Text>
                <Ionicons
                  name="chevron-down-outline"
                  size={18}
                  style={{ marginLeft: 10 }}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <CheckBox
                center
                title="Erkek"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                containerStyle={{
                  alignSelf: "baseline",
                  backgroundColor: "rgba(52, 52, 52, 0.0)",
                  borderWidth: 0,
                  borderRadius: 0,
                  borderBottomWidth: 0.8,
                  borderColor: "#f44336",
                }}
                checked={checkedE}
                checkedColor="#ba000d"
                onPress={() => isCheckedErkek(true)}
              />
              <CheckBox
                center
                title="Kadın"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                containerStyle={{
                  alignSelf: "baseline",
                  backgroundColor: "rgba(52, 52, 52, 0.0)",
                  borderWidth: 0,
                  borderRadius: 0,
                  borderBottomWidth: 0.8,
                  borderColor: "#f44336",
                }}
                checked={checkedK}
                checkedColor="#ba000d"
                onPress={() => isCheckedKadın(true)}
              />
            </View>
          )}

          <View style={styles.buttonCont}>
            <LoadingButton
              text="Güncelle"
              loading={loading}
              disabled={loading}
              mode="contained"
              color="#B71C1C"
              onPress={() => {
                if (Validation) {
                  Update(topInfo, updateValue), setUpdateValue("");
                }
              }}
              style={{ borderRadius: 20 }}
              FontStyle={{ fontSize: 20, color: "white" }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 29,
    fontWeight: "bold",
  },
  titleCont: {
    alignItems: "center",
    paddingVertical: 0,
    paddingBottom: 10,
  },
  infoTitle: {
    fontSize: 20,
    color: "#1C3879",
    textAlign: "justify",
  },
  valueStyle: {
    fontSize: 20,
    color: "#1C3879",
    fontWeight: "bold",
  },
  textCont: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  textInput: {
    margin: 20,
    fontSize: 20,
    backgroundColor: "#ECECEC",
    //height: 70,
    color: "#fff",
  },
  buttonCont: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileUpdateModal;
