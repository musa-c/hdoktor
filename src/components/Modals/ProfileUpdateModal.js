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
  const [password, setPassword] = useState("");
  const [isPasswordSee, setispasswordSee] = useState(true);
  const isCheckedErkek = () => {
    if (value == "Erkek") {
      if (Validation) {
        setValidation(false);
      } else {
        if (!Validate) {
          setValidation(true);
        }
      }
    }
    if (checkedE == true) {
      setCheckedE(false);
      setCinsiyet("");
      if (value == "Erkek") {
        setValidation(false);
      }
    } else {
      setCheckedE(true);
      setCinsiyet("Erkek");
      setCheckedK(false);
      if (value != "Erkek") {
        setValidation(true);
      }
    }
  };
  const isCheckedKadın = () => {
    if (value == "Kadın") {
      if (Validation) {
        setValidation(false);
      } else {
        if (!Validate) {
          setValidation(true);
        }
      }
    }
    if (checkedK == true) {
      setCheckedK(false);
      setCinsiyet("");
      if (value == "Kadın") {
        setValidation(false);
      }
    } else {
      setCheckedK(true);
      setCinsiyet("Kadın");
      setCheckedE(false);
      if (value != "Kadın") {
        setValidation(true);
      }
    }
  };

  const handleConfirm = (dogumTarih) => {
    setdogumTarih(moment(dogumTarih).locale("tr", trLocale).format("l"));
    Validate(topInfo, moment(dogumTarih).locale("tr", trLocale).format("l"));
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setValidation(false);
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  //console.log(topInfo);
  const [Validation, setValidation] = useState(false);

  const Validate = (topInfo, updateValue) => {
    console.log("topInfo:", topInfo);
    console.log("updateValue:", updateValue);

    switch (topInfo) {
      case "İsim":
        if (updateValue != "") {
          if (updateValue.length > 1) {
            if (!Validation) {
              setValidation(true);
            }
            return (
              <TextInput.Icon
                name="check-circle-outline"
                forceTextInputFocus={false}
                color={"green"}
              />
            );
          } else {
            if (Validation) {
              setValidation(false);
            }
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
          if (value != updateValue.toLowerCase()) {
            if (
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                updateValue.toLowerCase()
              )
            ) {
              if (!Validation) {
                setValidation(true);
              }
              return (
                <TextInput.Icon
                  name="check-circle-outline"
                  forceTextInputFocus={false}
                  color={"green"}
                />
              );
            } else {
              if (Validation) {
                setValidation(false);
              }
              return (
                <TextInput.Icon
                  name="close-circle-outline"
                  forceTextInputFocus={false}
                  color={"#f44336"}
                />
              );
            }
          } else {
            if (Validation) {
              setValidation(false);
            }
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
            if (!Validation) {
              setValidation(true);
            }
            return (
              <TextInput.Icon
                name="check-circle-outline"
                forceTextInputFocus={false}
                color={"green"}
              />
            );
          } else {
            if (Validation) {
              setValidation(false);
            }
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
        // 13> büyük olma zorunluluğu getir!
        console.log(Validation);
        console.log("value:", value);
        if (updateValue != value) {
          if (!Validation) {
            setValidation(true);
          }
        } else {
          if (Validation) {
            setValidation(false);
          }
        }

        break;
      case "Cinsiyet":
        break;
      default:
        break;
    }
  };
  const [update, setUpdate] = useState(false);

  const user = firebase.auth().currentUser;

  const nameUpdate = (id, UpdateName) => {
    setLoading(true);
    firebase
      .auth()
      .currentUser.updateProfile({ displayName: UpdateName })
      .then(() => {
        firebase
          .firestore()
          .collection("H_user")
          .doc(id)
          .update({ name: UpdateName })
          .then(() => {
            firebase
              .firestore()
              .collection("H_user")
              .doc(id)
              .collection("Doktorlarım")
              .onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                  snapshot.forEach((query) => {
                    firebase
                      .firestore()
                      .collection("D_user")
                      .doc(query.data().Id)
                      .collection("Hastalarım")
                      .where("email", "==", user.email)
                      .get()
                      .then((snapshot1) => {
                        snapshot1.forEach((snapshot1For) => {
                          snapshot1For.ref.update({ name: UpdateName });
                        });
                      });

                    // D_user -> Bildirimler'e hastanın emailini ekle.
                    // firebase.firestore().collection("D_user").doc(query.data().Id).collection("Bildirimlerim").where("email", "==", user.email).onSnapshot((snapshot2)=>{
                    //   snapshot2.forEach((snapshot2For)=>{
                    //     snapshot2For.ref.update({name: UpdateName})
                    //   })
                    // })
                  });
                }
              });

            firebase
              .firestore()
              .collection("Chats")
              .where("users", "array-contains", user.email)
              .get()
              .then((snasp) => {
                snasp.forEach((snapsFor) => {
                  firebase
                    .firestore()
                    .collection("Chats")
                    .doc(snapsFor.id)
                    .update({ names: [UpdateName, snapsFor.data().names[1]] })
                    .then(() => {
                      setUpdate(true);
                      setTimeout(() => {
                        setUpdate(false);
                        setLoading(false);
                        toggleModal();
                      }, 3000);
                    });
                });
              });
          });
      })
      .catch((e) => setUpdate(false));
  };

  const phoneNumberUpdate = (id, updatePhoneNumber) => {
    setLoading(true);
    firebase
      .firestore()
      .collection("H_user")
      .doc(id)
      .update({ phoneNumber: updatePhoneNumber })
      .then(() => {
        setUpdate(true);
        setTimeout(() => {
          setUpdate(false);
          setValidation(false);
          setLoading(false);
          toggleModal();
        }, 3000);
        // H_user -> Doktorlarım kısmına phoneNumber Ekle !!!
        // firebase
        //   .firestore()
        //   .collection("H_user")
        //   .doc(id)
        //   .collection("Doktorlarım")
        //   .onSnapshot((snaps) => {
        //     if (!snaps.empty) {
        //       snaps.forEach((query) => {
        //         firebase
        //           .firestore()
        //           .collection("D_user")
        //           .doc(query.data().Id)
        //           .collection("Hastalarım")
        //           .where("email", "==", user.email)
        //           .get()
        //           .then((snapshot1) => {
        //             snapshot1.forEach((snapshot1For) => {
        //               snapshot1For.ref
        //                 .update({ phoneNumber: updatePhoneNumber })
        //                 .then(() => {
        //                   setUpdate(true);
        //                   setTimeout(() => {
        //                     setUpdate(false);
        //                     setLoading(false);
        //                     toggleModal();
        //                   }, 3000);
        //                 })
        //                 .catch(() => {
        //                   setUpdate(false);
        //                 });
        //             });
        //           });
        //       });
        //     }
        //   });
      });
  };

  const dateUpdate = (id, UpdateDate) => {
    setLoading(true);
    firebase
      .firestore()
      .collection("H_user")
      .doc(id)
      .update({ date: UpdateDate })
      .then(() => {
        setUpdate(true);
        setTimeout(() => {
          setUpdate(false);
          setValidation(false);
          setLoading(false);
          toggleModal();
        }, 3000);
      });
  };

  const genderUpdate = (id, genderUpdate) => {
    firebase
      .firestore()
      .collection("H_user")
      .doc(id)
      .update({ cinsiyet: genderUpdate })
      .then(() => {
        setUpdate(true);
        setTimeout(() => {
          setUpdate(false);
          setValidation(false);
          setLoading(false);
          toggleModal();
        }, 3000);
      });

    firebase
      .firestore()
      .collection("H_user")
      .doc(id)
      .collection("Doktorlarım")
      .onSnapshot((snaps) => {
        snaps.forEach((snapsFor) => {
          firebase
            .firestore()
            .collection("D_user")
            .doc(snapsFor.data().Id)
            .collection("Hastalarım")
            .where("email", "==", user.email)
            .get()
            .then((snapsW) => {
              snapsW.forEach((snapsWFor) => {
                snapsWFor.ref.update({ cinsiyet: genderUpdate });
              });
            });
        });
      });
  };

  //const [UpdadeTextInput, setUpdadeTextInput] = useState(false);

  const reauthenticate = (password) => {
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(cred);
  };

  const EmailUpdate = (id, emailUpdate) => {
    reauthenticate(password).then(() => {
      user.updateEmail(emailUpdate).then(() => {
        firebase
          .firestore()
          .collection("H_user")
          .doc(id)
          .update({ email: emailUpdate.toLowerCase() })
          .then(() => {
            setUpdate(true);
            setTimeout(() => {
              setUpdate(false);
              setValidation(false);
              setLoading(false);
              toggleModal();
            }, 3000);
          });
      });
    });
  };

  const PasswordUpdate = (updatePassword) => {
    reauthenticate(password).then(() => {
      user.updatePassword(updatePassword).then(() => {
        alert("Şifre güncellendi!");
      });
    });
  };

  const [loading, setLoading] = useState(false);

  const Update = async (topInfo, updateValue, toggleModal) => {
    switch (topInfo) {
      case "İsim":
        nameUpdate(id, updateValue);
        break;
      case "E-mail":
        EmailUpdate(id, updateValue);
        break;
      case "Telefon Numarası":
        phoneNumberUpdate(id, updateValue);
        break;
      case "Yaş":
        dateUpdate(id, updateValue);
        break;
      case "Cinsiyet":
        genderUpdate(id, updateValue);
        break;
      default:
        break;
    }
  };
  console.log("authEmail:", user.email);
  const passwordSee = () => {
    if (!isPasswordSee) {
      return (
        <TextInput.Icon
          name="eye-outline"
          forceTextInputFocus={false}
          onPress={() => setispasswordSee(!isPasswordSee)}
        />
      );
    } else {
      return (
        <TextInput.Icon
          name="eye-off-outline"
          forceTextInputFocus={false}
          onPress={() => setispasswordSee(!isPasswordSee)}
        />
      );
    }
  };

  console.log(isPasswordSee);

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
        setValidation(false);
        setispasswordSee(true);
        setPassword("");
        //setUpdadeTextInput(false);
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
          {topInfo == "İsim" || topInfo == "Telefon Numarası" ? (
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
          ) : topInfo == "E-mail" ? (
            <View>
              <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={(text) => setPassword(text)}
                activeOutlineColor="#B71C1C"
                outlineColor="white"
                secureTextEntry={isPasswordSee}
                right={passwordSee()}
                //disabled={UpdadeTextInput}
                //right={Validate(topInfo, updateValue)}
                // underlineColor="red"
                //placeholderTextColor="#fff"
                theme={{ roundness: 10 }}
                mode="outlined"
                label={"Şifre"}
              ></TextInput>

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
            </View>
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
                marginVertical: 5,
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
                }}
                checked={checkedK}
                checkedColor="#ba000d"
                onPress={() => isCheckedKadın(true)}
              />
            </View>
          )}

          <View style={styles.buttonCont}>
            <LoadingButton
              text={"Güncelle"}
              loading={loading}
              disabled={!Validation ? true : loading}
              mode="contained"
              color="#B71C1C"
              onPress={() => {
                if (Validation) {
                  if (topInfo == "Yaş") {
                    Update(topInfo, dogumTarih);
                  } else if (topInfo == "E-mail") {
                    Update(topInfo, updateValue);
                  } else if (topInfo == "Cinsiyet") {
                    Update(topInfo, cinsiyet);
                  } else {
                    Update(topInfo, updateValue), setUpdateValue("");
                  }
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
