import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { HelperText, TextInput } from "react-native-paper";
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
import DropDownPicker from "react-native-dropdown-picker";

const ProfileUpdateModal = ({
  value,
  isInfoModalVisible,
  onBackdropPress,
  infoTitle,
  topInfo,
  placeHolderModal,
  toggleModal,
  id,
  w_user,
  w_user_other,
  w_user_collection,
  w_user_other_collection,
}) => {
  const [updateValue, setUpdateValue] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dogumTarih, setdogumTarih] = useState(value);
  const [checkedE, setCheckedE] = useState(value == "Erkek" ? true : false);
  const [checkedK, setCheckedK] = useState(value == "Kadın" ? true : false);
  const [cinsiyet, setCinsiyet] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSee, setispasswordSee] = useState(true);
  const [ispasswordSeeAgain, setispasswordSeeAgain] = useState(true);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [open, setOpen] = useState(false);
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [valueB, setValueB] = useState(null);
  const [items, setItems] = useState([
    { label: "Acil Tıp", value: "1" },
    { label: "Adli Tıp", value: "2" },
    { label: "Ağız, Diş ve Çene Cerrahisi", value: "3" },
    { label: "Ağız, Diş ve Çene Radyolojisi", value: "4" },
    { label: "Ağız, Yüz ve Çene Cerrahisi", value: "5" },
    { label: "Aile Hekimliği", value: "6" },
    { label: "Alerji Hastalıkları(İç Hast.)", value: "7" },
    { label: "Algoloji (Anesteziyoloji ve Reanimasyon)", value: "8" },
    { label: "Algoloji (FTR)", value: "9" },
    { label: "Algoloji (Nöroloji)", value: "10" },
    { label: "Anatomi", value: "11" },
    { label: "Androloji(Üroloji)", value: "12" },
    { label: "Anesteziyoloji ve Reanimasyon", value: "13" },
    { label: "Askeri Sahra Hekimliği", value: "14" },
    { label: "Beyin ve Sinir Cerrahisi", value: "15" },
    { label: "Cerrahi Onkoloji (Genel Cerrahi)", value: "16" },
    { label: "Çevre Sağlığı", value: "17" },
    { label: "Çocuk Acil", value: "18" },
    { label: "Çocuk Alerjisi", value: "19" },
    { label: "Çocuk Cerrahisi", value: "20" },
    { label: "Çocuk Diş Hekimliği", value: "21" },
    { label: "Çocuk Endokrinolojisi", value: "22" },
    { label: "Çocuk Endokrinolojisi ve Metabolizma Hastalıkları", value: "23" },
    { label: "Çocuk Enfeksiyon Hastalıkları", value: "24" },
    { label: "Çocuk Gastroenterolojisi", value: "25" },
    { label: "Çocuk Genetik Hastalıkları", value: "26" },
    { label: "Çocuk Göğüs Hastalıkları", value: "27" },
    { label: "Çocuk Hematolojisi ", value: "28" },
    { label: "Çocuk Hematolojisi ve Onkolojisi", value: "29" },
    { label: "Çocuk İmmünolojisi", value: "30" },
    { label: "Çocuk İmmünolojisi ve Alerji Hastalıkları", value: "31" },
    { label: "Çocuk Kalp ve Damar Cerrahisi", value: "32" },
    { label: "Çocuk Kardiyolojisi", value: "33" },
    { label: "Çocuk Metabolizma Hastalıkları", value: "34" },
    { label: "Çocuk Nefrolojisi", value: "35" },
    { label: "Çocuk Nörolojisi", value: "36" },
    { label: "Çocuk Onkolojisi", value: "37" },
    { label: "Çocuk Romatoloji", value: "38" },
    { label: "Çocuk Sağlığı ve Hastalıkları", value: "39" },
    { label: "Çocuk Ürolojisi", value: "40" },
    { label: "Çocuk Ürolojisi (Çocuk Cerrahisi)", value: "41" },
    { label: "Çocuk Ürolojisi (Üroloji)", value: "42" },
    { label: "Çocuk ve Ergen Ruh Sağlığı ve Hastalıkları", value: "43" },
    { label: "Deri ve Zührevi Hastalıkları", value: "44" },
    { label: "Dermatopatoloji", value: "45" },
    { label: "Diğer Branş", value: "46a" },
    { label: "Diş Hastalıkları ve Tedavisi", value: "46" },
    { label: "El Cerrahisi (Genel Cerrahi)", value: "48" },
    { label: "El Cerrahisi(Ortopedi ve Travmatoloji)", value: "49" },
    { label: "El Cerrahisi(Plastik_Rekons.ve Estetik Cerr.)", value: "50" },
    { label: "Embriyoloji ve Histoloji", value: "51" },
    { label: "Endodonti", value: "52" },
    { label: "Endokrinoloji ve Metabolizma Hastalıkları", value: "53" },
    { label: "Enfeksiyon Hastalıkları (İç Hast.)", value: "54" },
    { label: "Enfeksiyon Hastalıkları ve Klinik Mikrobiyoloji", value: "55a" },
    { label: "Fizikoterapi ve İdroterapi", value: "55" },
    { label: "Fiziksel Tıp ve Rehabilitasyon", value: "56" },
    { label: "Fizyoloji", value: "57" },
    { label: "Gastroenteroloji(İç Hast.)", value: "58" },
    { label: "Gastroentroloji Cerrahisi(Genel Cerr.)", value: "59" },
    { label: "Gelişimsel Pediatri", value: "60" },
    { label: "Genel Cerrahi", value: "61" },
    { label: "Geriatri(İç Hast.)", value: "62" },
    { label: "Girişimsel Radyoloji(Radyoloji)", value: "63" },
    { label: "Göğüs Cerrahisi.", value: "64" },
    { label: "Göğüs Hastalıkları", value: "65" },
    { label: "Göz Hastalıkları", value: "66" },
    { label: "Halk Sağlığı", value: "67a" },
    { label: "Hava ve Uzay Hekimliği", value: "67" },
    { label: "Hematoloji(İç Hast.)", value: "68" },
    { label: "Hemodiyaliz Kliniği", value: "69" },
    { label: "İç Hastalıkları", value: "70" },
    { label: "İlk ve Acil Yardım", value: "71" },
    { label: "İmmünoloji(Tıbbi Mikrobiyoloji)", value: "72" },
    { label: "İmmünoloji ve Alerji Hastalıklar(İç Hastalıkları)", value: "73" },
    {
      label: "İmmünoloji ve Alerji Hastalıkları (Deri ve Zührevi Hastalıkları)",
      value: "74",
    },
    {
      label: "İmmünoloji ve Alerji Hastalıkları(Göğüs Hastalıkları)",
      value: "75",
    },
    {
      label: "İmmünoloji ve Alerji Hastalıkları (Göğüs Hastalıkları)",
      value: "76",
    },
    { label: "İş ve Meslek Hastalıkları", value: "77" },
    { label: "İşyeri Hekimliği(Halk Sağlığı)", value: "78" },
    { label: "Jinekolojik Onkoloji Cerrahisi", value: "79" },
    { label: "Kadın Hastalıkları ve Doğum", value: "80" },
    { label: "Kalp ve Damar Cerrahisi", value: "81" },
    { label: "Kardiyoloji", value: "82" },
    { label: "Klinik Genetik", value: "83" },
    { label: "Klinik Genetik", value: "84" },
    { label: "Klinik Genetik(Tıbbi Genetik)", value: "85" },
    { label: "Klinik Moleküler Genetik(Tıbbi Genetik)", value: "86" },
    { label: "Klinik Nörofizyoloji", value: "87" },
    { label: "Klinik Sitogenetik(Tıbbi Genetik)", value: "88" },
    { label: "Kulak-Burun-Boğaz Hastalıkları", value: "89" },
    { label: "Mikoloji(Tıbbi Mikrobiyoloji)", value: "90" },
    { label: "Nefroloji", value: "91" },
    { label: "Neonatoloji", value: "92" },
    { label: "Nöroloji", value: "93" },
    { label: "Nöropatoloji", value: "94" },
    { label: "Nöroradyoloji(Radyoloji)", value: "95" },
    { label: "Nükleer Tıp", value: "96" },
    { label: "Okul Hekimliği", value: "97" },
    { label: "Ortodonti", value: "98" },
    { label: "Ortopedi ve Travmatoloji", value: "99" },
    { label: "Pediyatrik Radyoloji", value: "100" },
    { label: "Perinatoloji", value: "101" },
    { label: "Periodontoloji", value: "102" },
    { label: "Plastik, Rekonstrüktif ve Estetik Cerrahi", value: "103" },
    { label: "Pratisyen Hekim", value: "104" },
    { label: "Protetik Diş Tedavisi", value: "105" },
    { label: "Radyasyon Onkolojisi", value: "106" },
    { label: "Radyoloji", value: "107" },
    { label: "Restoratif Diş Tedavisi", value: "108" },
    { label: "Romatoloji(Fizik Tedavi)", value: "109" },
    { label: "Romatoloji(İç Hast.)", value: "110" },
    { label: "Ruh Sağlığı ve Hastalıkları", value: "111" },
    { label: "Sitopatoloji(Tıbbi Patoloji)", value: "112" },
    { label: "Spor Hekimliği", value: "113" },
    { label: "Sualtı Hekimliği ve Hiperbarik Tıp", value: "114" },
    { label: "Tıbbi Biyokimya", value: "115" },
    { label: "Tıbbi Biyoloji", value: "116" },
    { label: "Tıbbi Biyoloji ve Genetik", value: "117" },
    { label: "Tıbbi Ekoloji ve Hidroklimatoloji", value: "118" },
    { label: "Tıbbi Farmakoloji", value: "119" },
    { label: "Tıbbi Genetik", value: "120" },
    { label: "Tıbbi Mikrobiyoloji", value: "121" },
    { label: "Tıbbi Onkoloji(İç Hast.)", value: "122" },
    { label: "Tıbbi Parazitoloji", value: "123" },
    { label: "Tıbbi Patoloji", value: "124" },
    { label: "Toksikoloji(Adli Tıp)", value: "125" },
    { label: "Toksikoloji(Tıbbi Farmakoloji)", value: "126" },
    {
      label: "Tüberküloz, Allerjik Hastalıklar (Göğüs Hastalıkları)",
      value: "127",
    },
    { label: "Üreme Endokrinolojisi ve İnfertilite", value: "128" },
    { label: "Üroloji", value: "129" },
    { label: "Viroloji(Tıbbi Mikrobiyoloji)", value: "130" },
    { label: "Yoğun Bakım (Anesteziyoloji ve Reanimasyon)", value: "131" },
    { label: "Yoğun Bakım(Çocuk Sağ. ve Hast.)", value: "132" },
    {
      label: "Yoğun Bakım (Enfeksiyon Hastalıkları ve Klinik Mikrobiyoloji)",
      value: "133",
    },
    { label: "Yoğun Bakım (Genel Cerrahi)", value: "134" },
    { label: "Yoğun Bakım(Göğüs Hast.)", value: "135" },
    { label: "Yoğun Bakım(İç Hast.)", value: "136" },
    { label: "Yoğun Bakım(Nöroloji)", value: "137" },
  ]);
  const [error, setError] = useState("");
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

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const handleConfirm1 = (time1) => {
    if (updateValue[1] != undefined) {
      setUpdateValue([time1, updateValue[1]]);
      if (
        moment(new Date(time1)).locale("tr", trLocale).format("LT") ==
        moment(new Date(value[0])).locale("tr", trLocale).format("LT")
      ) {
        if (
          moment(updateValue[1]).locale("tr", trLocale).format("LT") ==
          moment(new Date(value[1])).locale("tr", trLocale).format("LT")
        ) {
          if (Validation) {
            setValidation(false);
          }
        } else {
          if (!Validation) {
            setValidation(true);
          }
        }
      } else {
        if (!Validation) {
          setValidation(true);
        }
      }
      hideDatePicker1();
    } else {
      setUpdateValue([time1, undefined]);
      if (
        moment(new Date(time1)).locale("tr", trLocale).format("LT") ==
        moment(new Date(value[0])).locale("tr", trLocale).format("LT")
      ) {
        if (Validation) {
          setValidation(false);
        }
      } else {
        if (!Validation) {
          setValidation(true);
        }
      }
      hideDatePicker1();
    }
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleConfirm2 = (time2) => {
    if (updateValue[0] != undefined) {
      setUpdateValue([updateValue[0], time2]);
      if (
        moment(new Date(time2)).locale("tr", trLocale).format("LT") ==
        moment(new Date(value[1])).locale("tr", trLocale).format("LT")
      ) {
        if (
          moment(updateValue[0]).locale("tr", trLocale).format("LT") ==
          moment(new Date(value[0])).locale("tr", trLocale).format("LT")
        ) {
          if (Validation) {
            setValidation(false);
          }
        } else {
          if (!Validation) {
            setValidation(true);
          }
        }
      } else {
        if (!Validation) {
          setValidation(true);
        }
      }

      hideDatePicker2();
    } else {
      setUpdateValue([undefined, time2]);
      if (
        moment(new Date(time2)).locale("tr", trLocale).format("LT") ==
        moment(new Date(value[1])).locale("tr", trLocale).format("LT")
      ) {
        if (Validation) {
          setValidation(false);
        }
      } else {
        if (!Validation) {
          setValidation(true);
        }
      }
      hideDatePicker2();
    }
  };

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const [Validation, setValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  const Validate = (topInfo, updateValue) => {
    switch (topInfo) {
      case "İsim":
      case "Çalışılan Yer":
      case "Kronik Hastalık":
        if (updateValue != "") {
          if (updateValue.length > 1) {
            if (!Validation) {
              setValidation(true);
            }
            return (
              <TextInput.Icon
                icon="check-circle-outline"
                forceTextInputFocus={false}
                iconColor={"green"}
              />
            );
          } else {
            if (Validation) {
              setValidation(false);
            }
            return (
              <TextInput.Icon
                icon="close-circle-outline"
                forceTextInputFocus={false}
                iconColor={"#f44336"}
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
                  icon="check-circle-outline"
                  forceTextInputFocus={false}
                  iconColor={"green"}
                />
              );
            } else {
              if (Validation) {
                setValidation(false);
              }
              return (
                <TextInput.Icon
                  icon="close-circle-outline"
                  forceTextInputFocus={false}
                  iconColor={"#f44336"}
                />
              );
            }
          } else {
            if (Validation) {
              setValidation(false);
            }
            return (
              <TextInput.Icon
                icon="close-circle-outline"
                forceTextInputFocus={false}
                iconColor={"#f44336"}
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
                icon="check-circle-outline"
                forceTextInputFocus={false}
                iconColor={"green"}
              />
            );
          } else {
            if (Validation) {
              setValidation(false);
            }
            return (
              <TextInput.Icon
                icon="close-circle-outline"
                forceTextInputFocus={false}
                iconColor={"#f44336"}
              />
            );
          }
        }
        break;
      case "Yaş":
        // 13> büyük olma zorunluluğu getir!
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
      case "Şifre":
        if (updateValue != "") {
          if (
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(
              updateValue
            )
          ) {
            if (!Validation) {
              setValidation(true);
            }
            return (
              <TextInput.Icon
                icon="check-circle-outline"
                forceTextInputFocus={false}
                iconColor={"green"}
              />
            );
          } else {
            if (Validation) {
              setValidation(false);
            }
            return (
              <TextInput.Icon
                icon="close-circle-outline"
                forceTextInputFocus={false}
                iconColor={"#f44336"}
              />
            );
          }
        }
        break;
      case "Branş":
        if (updateValue != "" && updateValue != value) {
          if (!Validation) {
            setValidation(true);
          }
        } else {
          if (Validation) {
            setValidation(false);
          }
        }
        break;
      case "Çalışma Saatleri":
        // const indexClock = updateValue.substr(6).indexOf(":");

        break;
      default:
        break;
    }
  };
  const [update, setUpdate] = useState(false);

  const user = firebase.auth().currentUser;

  const nameUpdate = (id, UpdateName) => {
    setLoading(true);

    var NameArray = [];
    for (let i = 1; i < UpdateName.toLowerCase().length + 1; i++) {
      NameArray.push(UpdateName.substring(0, i));
    }

    firebase
      .auth()
      .currentUser.updateProfile({ displayName: UpdateName })
      .then(() => {
        firebase
          .firestore()
          .collection(w_user)
          .doc(id)
          .update({ name: UpdateName, nameSearch: NameArray })
          .then(() => {
            firebase
              .firestore()
              .collection(w_user)
              .doc(id)
              .collection(w_user_collection)
              .onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                  snapshot.forEach((query) => {
                    firebase
                      .firestore()
                      .collection(w_user_other)
                      .doc(query.data().Id)
                      .collection(w_user_other_collection)
                      .where("Id", "==", user.uid)
                      .get()
                      .then((snapshot1) => {
                        snapshot1.forEach((snapshot1For) => {
                          snapshot1For.ref.update({ name: UpdateName });
                        });
                      })
                      .catch(() => {
                        setUpdate(false);
                        setLoading(false);
                      });

                    // D_user -> Bildirimler'e hastanın emailini ekle.
                    // firebase
                    //   .firestore()
                    //   .collection("D_user")
                    //   .doc(query.data().Id)
                    //   .collection("Bildirimlerim")
                    //   .where("id", "==", user.uid)
                    //   .onSnapshot((snapshot2) => {
                    //     snapshot2.forEach((snapshot2For) => {
                    //       snapshot2For.ref.update({ name: UpdateName });
                    //     });
                    //   });
                  });
                }
              });

            if (w_user == "H_user") {
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
                      })
                      .catch(() => {
                        setUpdate(false);
                        setLoading(false);
                      });
                  });
                })
                .then(() => {
                  setLoading(false);
                  setUpdate(true);
                  setTimeout(() => {
                    setUpdate(false);
                    setLoading(false);
                    toggleModal();
                  }, 3000);
                })
                .catch(() => {
                  setUpdate(false);
                  setLoading(false);
                });
            } else {
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
                      .update({ names: [snapsFor.data().names[0], UpdateName] })
                      .then(() => {
                        setLoading(false);
                        setUpdate(true);
                        setTimeout(() => {
                          setUpdate(false);
                          setLoading(false);
                          toggleModal();
                        }, 3000);
                      });
                  });
                })
                .then(() => {
                  setUpdate(true);
                  setTimeout(() => {
                    setUpdate(false);
                    setLoading(false);
                    toggleModal();
                  }, 3000);
                })
                .catch(() => {
                  setUpdate(false);
                  setLoading(false);
                });
            }
          });
      })
      .catch((e) => {
        setUpdate(false);
        setLoading(false);
      });
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
    setLoading(true);
    firebase
      .firestore()
      .collection(w_user)
      .doc(id)
      .update({ cinsiyet: genderUpdate })
      .then(() => {
        firebase
          .firestore()
          .collection(w_user)
          .doc(id)
          .collection(w_user_collection)
          .onSnapshot((snaps) => {
            snaps.forEach((snapsFor) => {
              firebase
                .firestore()
                .collection(w_user_other)
                .doc(snapsFor.data().Id)
                .collection(w_user_other_collection)
                .where("Id", "==", user.uid)
                .get()
                .then((snapsW) => {
                  snapsW.forEach((snapsWFor) => {
                    snapsWFor.ref.update({ cinsiyet: genderUpdate });
                  });
                })
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
      });
  };

  const KHastalikUpdate = (id, KHastalikUpdate) => {
    setLoading(true);
    firebase
      .firestore()
      .collection("H_user")
      .doc(id)
      .update({ KHastalik: KHastalikUpdate })
      .then(() => {
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
                .where("Id", "==", id)
                .onSnapshot((snaps2) => {
                  snaps2.forEach((snaps2For) => {
                    snaps2For.ref
                      .update({ KHastalik: KHastalikUpdate })
                      .then(() => {
                        setUpdate(true);
                        setTimeout(() => {
                          setUpdate(false);
                          setValidation(false);
                          setLoading(false);
                          toggleModal();
                        }, 3000);
                      })
                      .catch(() => {
                        setUpdate(false);
                        setLoading(false);
                        alert("Başarısız güncelleme. Lütfen tekrar deneyiniz.");
                      });
                  });
                });
            });
          });
      })
      .catch(() => {
        console.log("başarısızn güncelleme.");
      });
  };

  //const [UpdadeTextInput, setUpdadeTextInput] = useState(false);

  const reauthenticate = (password) => {
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(cred);
  };

  const EmailUpdate = (id, emailUpdate) => {
    // GÜNCELLENENLER: H_user, Chats, D_user->Hastalarım
    setLoading(true);
    reauthenticate(password)
      .then(() => {
        const UpdateEmail = user.updateEmail(emailUpdate.toLowerCase());
        UpdateEmail.then(() => {
          firebase
            .firestore()
            .collection("Chats")
            .where("users", "array-contains", value.toLowerCase())
            .get()
            .then((chatSnaps) => {
              chatSnaps.forEach((chatSnapsFor) => {
                if (chatSnapsFor.exists) {
                  if (w_user == "H_user") {
                    chatSnapsFor.ref.update({
                      users: [
                        emailUpdate.toLowerCase(),
                        chatSnapsFor.data().users[1],
                      ],
                    });
                  } else {
                    chatSnapsFor.ref.update({
                      users: [
                        chatSnapsFor.data().users[0],
                        emailUpdate.toLowerCase(),
                      ],
                    });
                  }
                }
              });
            })
            .then(() => {
              firebase
                .firestore()
                .collection(w_user)
                .doc(id)
                .update({ email: emailUpdate.toLowerCase() })
                .then(() => {
                  firebase
                    .firestore()
                    .collection(w_user)
                    .doc(id)
                    .collection(w_user_collection)
                    .onSnapshot((querySnaps) => {
                      if (!querySnaps.empty) {
                        querySnaps.forEach((queryFor) => {
                          firebase
                            .firestore()
                            .collection(w_user_other)
                            .doc(queryFor.data().Id)
                            .collection(w_user_other_collection)
                            .where("Id", "==", user.uid)
                            .get()
                            .then((snapsThen) => {
                              snapsThen.forEach((snapsThenFor) => {
                                snapsThenFor.ref.update({
                                  email: emailUpdate.toLowerCase(),
                                });
                              });
                            })
                            .then(() => {
                              setLoading(false);
                              setUpdate(true);
                              setTimeout(() => {
                                setUpdate(false);
                                setValidation(false);
                                setLoading(false);
                                toggleModal();
                              }, 3000);
                            });
                        });
                      } else {
                        setLoading(false);
                        setUpdate(true);
                        setTimeout(() => {
                          setUpdate(false);
                          setValidation(false);
                          setLoading(false);
                          toggleModal();
                        }, 3000);
                      }
                    });
                });
            });
        }).catch((error) => {
          const ErrorCode = error.code;
          switch (ErrorCode.substr(5)) {
            case "invalid-email":
              setError("Email adresi geçersiz.");
              setLoading(false);
              break;
            case "email-already-in-use":
              setError("Bu E-mail kullanılıyor.");
              setLoading(false);

              break;
            case "requires-recent-login":
              setError(
                "İsteğiniz zaman aşımına uğradı. Lütfen şifrenizi ve yeni email'inizi tekrar girip deneyiziz."
              );
              setLoading(false);

              break;
            default:
              break;
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode.substr(5)) {
          case "user-mismatch":
            setError("Şifrenizi kontrol edip tekrar deneyiniz.");
            setLoading(false);

            break;
          // case "user-not-found":
          //   alert("Kullanıcı Bulunamadı.")
          //   break;
          // case "invalid-email":
          //   alert("Geçersiz E-posta")
          //   break;
          case "wrong-password":
            setError("Yanlış şifre.");
            setLoading(false);

            break;
          case "invalid-verification-code":
          case "invalid-verification-id":
            setError("Geçersiz doğrulama.");
            setLoading(false);

            break;
          default:
            setError("Güncelleme başarısız. Lütfen tekrar deneyin.");
            setLoading(false);
            break;
        }
      });
  };

  const PasswordUpdate = (updatePassword) => {
    setLoading(true);
    reauthenticate(password)
      .then(() => {
        user
          .updatePassword(updatePassword)
          .then(() => {
            setLoading(false);
            setUpdate(true);
            setTimeout(() => {
              setUpdate(false);
              setValidation(false);
              setLoading(false);
              toggleModal();
            }, 3000);
          })
          .catch((error) => {
            const ErrorCode = error.code;
            switch (ErrorCode.substr(5)) {
              case "weak-password":
                setError("Parola yeterince güçlü değil.");
                break;
              case "requires-recent-login":
                setError("Lütfen mevcut şifrenizi tekrar giriniz.");
                break;
              default:
                setError("Hata lütfen tekrar deneyiniz.");
                break;
            }
            setLoading(false);
          });
      })
      .catch((error) => {
        const ErrorCode = error.code;
        switch (ErrorCode.substr(5)) {
          case "user-mismatch":
            setError("Şifrenizi kontrol edip tekrar deneyiniz.");
            setLoading(false);
            break;
          // case "user-not-found":
          //   break;
          case "invalid-credential":
            break;
          case "wrong-password":
            setError("Yanlış şifre.");
            setLoading(false);
            break;
          case "invalid-verification-code":
          case "invalid-verification-id":
            setError("Geçersiz doğrulama.");
            setLoading(false);
            break;
          default:
            setError("Güncelleme başarısız. Lütfen tekrar deneyin.");
            setLoading(false);
            break;
        }
      });
  };

  const BransUpdate = (id, updateBrans) => {
    setLoading(true);

    var BransArray = [];
    for (let i = 1; i < updateBrans.toLowerCase().length + 1; i++) {
      BransArray.push(updateBrans.substring(0, i));
    }

    firebase
      .firestore()
      .collection("D_user")
      .doc(id)
      .update({ brans: updateBrans, bransSearch: BransArray })
      .then(() => {
        firebase
          .firestore()
          .collection("D_user")
          .doc(id)
          .collection("Hastalarım")
          .onSnapshot((snaps) => {
            if (!snaps.empty) {
              snaps.forEach((snapsFor) => {
                firebase
                  .firestore()
                  .collection("H_user")
                  .doc(snapsFor.data().Id)
                  .collection("Doktorlarım")
                  .where("Id", "==", user.uid)
                  .get()
                  .then((snaps2) => {
                    snaps2.forEach((snaps2For) => {
                      snaps2For.ref.update({ brans: updateBrans });
                    });
                  })
                  .then(() => {
                    setLoading(false);
                    setUpdate(true);
                    setTimeout(() => {
                      setUpdate(false);
                      setValidation(false);
                      setLoading(false);
                      toggleModal();
                    }, 3000);
                  })
                  .catch((e) => {
                    setLoading(false);
                    console.log(e);
                  });
              });
            } else {
              setLoading(false);
              setUpdate(true);
              setTimeout(() => {
                setUpdate(false);
                setValidation(false);
                setLoading(false);
                toggleModal();
              }, 3000);
            }
          });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        //setUpdate(true);
        // setTimeout(() => {
        //   setUpdate(false);
        //   setValidation(false);
        //   setLoading(false);
        //   toggleModal();
        // }, 3000);
      });
  };

  const CalismaSaatleriUpdate = (id, SaatUpdate) => {
    const SaatUpdateValue = SaatUpdate;
    setLoading(true);
    if (SaatUpdateValue[0] == undefined) {
      SaatUpdateValue[0] = value[0];
    }
    if (SaatUpdate[1] == undefined) {
      SaatUpdateValue[1] = value[1];
    }
    firebase
      .firestore()
      .collection("D_user")
      .doc(id)
      .update({ time1: SaatUpdateValue[0], time2: SaatUpdateValue[1] })
      .then(() => {
        firebase
          .firestore()
          .collection("D_user")
          .doc(id)
          .collection("Hastalarım")
          .onSnapshot((snaps) => {
            snaps.forEach((snapsFor) => {
              firebase
                .firestore()
                .collection("H_user")
                .doc(snapsFor.data().Id)
                .collection("Doktorlarım")
                .where("Id", "==", id)
                .get()
                .then((query) => {
                  query.forEach((queryFor) => {
                    queryFor.ref.update({
                      iletisimSaat1: SaatUpdateValue[0],
                      iletisimSaat2: SaatUpdateValue[1],
                    });
                  });
                })
                .then(() => {
                  setLoading(false);
                  setValidation(false);
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
  };

  const CalisilanYerUpdate = (id, CalisilanYerUpdate) => {
    setLoading(true);

    var CalisilanYerArray = [];
    for (let i = 1; i < CalisilanYerUpdate.toLowerCase().length + 1; i++) {
      CalisilanYerArray.push(CalisilanYerUpdate.substring(0, i));
    }

    firebase
      .firestore()
      .collection("D_user")
      .doc(id)
      .update({
        CalisilanYer: CalisilanYerUpdate,
        calislanYerSearch: CalisilanYerArray,
      })
      .then(() => {
        firebase
          .firestore()
          .collection("D_user")
          .doc(id)
          .collection("Hastalarım")
          .onSnapshot((snaps) => {
            snaps.forEach((snapsFor) => {
              firebase
                .firestore()
                .collection("H_user")
                .doc(snapsFor.data().Id)
                .collection("Doktorlarım")
                .where("Id", "==", id)
                .get()
                .then((query) => {
                  query.forEach((queryFor) => {
                    queryFor.ref
                      .update({ calisilanYer: CalisilanYerUpdate })
                      .then(() => {
                        setLoading(false);
                        setValidation(false);
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
          });
      });
  };

  const Update = async (topInfo, updateValue) => {
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
      case "Şifre":
        PasswordUpdate(updateValue);
        break;
      case "Kronik Hastalık":
        KHastalikUpdate(id, updateValue);
        break;
      case "Branş":
        BransUpdate(id, updateValue);
        break;
      case "Çalışma Saatleri":
        CalismaSaatleriUpdate(id, updateValue);
        break;
      case "Çalışılan Yer":
        CalisilanYerUpdate(id, updateValue);
        break;
      default:
        break;
    }
  };

  const passwordSee = () => {
    if (!isPasswordSee) {
      return (
        <TextInput.Icon
          icon="eye-outline"
          forceTextInputFocus={false}
          onPress={() => setispasswordSee(!isPasswordSee)}
        />
      );
    } else {
      return (
        <TextInput.Icon
          icon="eye-off-outline"
          forceTextInputFocus={false}
          onPress={() => setispasswordSee(!isPasswordSee)}
        />
      );
    }
  };

  const passwordSeeAgain = () => {
    if (!ispasswordSeeAgain) {
      return (
        <TextInput.Icon
          icon="eye-outline"
          forceTextInputFocus={false}
          onPress={() => setispasswordSeeAgain(!ispasswordSeeAgain)}
        />
      );
    } else {
      return (
        <TextInput.Icon
          icon="eye-off-outline"
          forceTextInputFocus={false}
          onPress={() => setispasswordSeeAgain(!ispasswordSeeAgain)}
        />
      );
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
      onBackdropPress={!loading ? onBackdropPress : null}
      backdropOpacity={0.8}
      onModalHide={() => {
        setdogumTarih("");
        setCheckedE(false);
        setCheckedK(false);
        setValidation(false);
        setispasswordSee(true);
        setispasswordSeeAgain(true);
        setPassword("");
        setError("");
        setUpdateValue("");
        setLoading(false);
        setValueB(null);
        //setUpdadeTextInput(false);
      }}
      onModalShow={() => {
        if (value == "Erkek") {
          setCheckedE(true);
        } else if (value == "Kadın") {
          setCheckedK(true);
        }
      }}
      avoidKeyboard
      //avoidKeyboard
    >
      <SuccesModal isVisible={update} text="Güncelleme başarılı!" />
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
            <Text style={styles.valueStyle}>
              {topInfo == "Çalışma Saatleri"
                ? moment(value[0]).locale("tr", trLocale).format("LT") +
                  " - " +
                  moment(value[1]).locale("tr", trLocale).format("LT")
                : value}{" "}
            </Text>
            {infoTitle}
          </Text>
        </View>
        {topInfo == "İsim" ||
        topInfo == "Telefon Numarası" ||
        topInfo == "Çalışılan Yer" ||
        topInfo == "Kronik Hastalık" ? (
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
        ) : topInfo == "E-mail" || topInfo == "Şifre" ? (
          <View>
            {error != "" ? (
              <>
                <Ionicons
                  name="alert-circle-outline"
                  size={30}
                  color="red"
                  style={{ alignSelf: "center" }}
                />
                <Text
                  style={{
                    color: "red",
                    fontSize: 18,
                    alignSelf: "center",
                    marginVertical: 10,
                    fontWeight: "bold",
                    marginHorizontal: 7,
                  }}
                >
                  {error}
                </Text>
              </>
            ) : null}

            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={(text) => setPassword(text)}
              activeOutlineColor="#B71C1C"
              outlineColor="white"
              secureTextEntry={isPasswordSee}
              right={topInfo != "Şifre" ? passwordSee() : null}
              left={topInfo == "Şifre" ? passwordSee() : null}
              //disabled={UpdadeTextInput}
              //right={Validate(topInfo, updateValue)}
              // underlineColor="red"
              //placeholderTextColor="#fff"
              theme={{ roundness: 10 }}
              mode="outlined"
              label={topInfo == "Şifre" ? "Mevcut Şifre" : "Şifre"}
            ></TextInput>

            <TextInput
              style={[styles.textInput, { marginBottom: 10 }]}
              value={updateValue}
              onChangeText={(text) => setUpdateValue(text)}
              activeOutlineColor="#B71C1C"
              outlineColor="white"
              right={Validate(topInfo, updateValue)}
              left={topInfo == "Şifre" ? passwordSeeAgain() : null}
              secureTextEntry={topInfo == "Şifre" ? ispasswordSeeAgain : null}
              // underlineColor="red"
              //placeholderTextColor="#fff"
              theme={{ roundness: 10 }}
              mode="outlined"
              label={placeHolderModal}
            ></TextInput>
            {(topInfo == "Şifre") & (updateValue != "") ? (
              <HelperText
                type="info"
                visible={!Validation}
                style={{
                  color: "#f44336",
                  textAlign: "justify",
                  //backgroundColor: "red",
                  marginBottom: 10,
                  width: 300,
                  alignSelf: "center",
                }}
              >
                <Ionicons name="alert-circle-outline" />
                &nbsp; Şifre, en az 8 en çok 32 karakter olmalıdır. En az; 1
                harf, 1 rakam içermelidir. Boşluk içermemeli. Özel karakterler
                kullanılabilir: @$!%*#?&^_-
              </HelperText>
            ) : null}
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
        ) : topInfo == "Branş" ? (
          <DropDownPicker
            open={open}
            value={valueB}
            onChangeValue={(value) => {
              // value'si seçilen value'ye eşit olan
              for (var i = 0; i < items.length; i++) {
                if (value == items[i].value) {
                  setUpdateValue(items[i].label);
                  Validate(topInfo, items[i].label);
                }
              }
            }}
            items={items}
            setOpen={setOpen}
            setValue={setValueB}
            setItems={setItems}
            listMode="MODAL"
            placeholder={value}
            placeholderStyle={{
              color: "grey",
            }}
            dropDownDirection="TOP"
            style={styles.picker}
            containerStyle={{
              width: 300,
              justifyContent: "center",
              alignSelf: "center",
            }}
            textStyle={{
              fontSize: 18,
            }}
            listItemLabelStyle={{
              color: "#000",
            }}
            itemSeparator={true}
            dropDownContainerStyle={{
              // backgroundColor: "#dfdfdf",
              borderRadius: 8,
              borderWidth: 1,
              // backgroundColor:"#fafafa"
              borderColor: "#eceff1",
              borderTopWidth: 0,
              height: 600,
              backgroundColor: "whitesmoke",
            }}
            itemSeparatorStyle={{
              backgroundColor: "grey",
              marginLeft: 10,
              height: StyleSheet.hairlineWidth,
            }}
            searchable={true}
            searchPlaceholder="Ara..."
            searchTextInputStyle={{
              color: "#000",
              // backgroundColor:"red",
              borderWidth: 0,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "grey",
              flex: 1,
            }}
            language="TR"
            searchContainerStyle={{
              borderWidth: 0,
              borderBottomWidth: 0,
            }}
            selectedItemContainerStyle={{
              backgroundColor: "#f44336",
            }}
          />
        ) : topInfo == "Çalışma Saatleri" ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 6,
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={showDatePicker1}>
              <Text
                style={{
                  marginLeft: 10,
                  color: "grey",
                  fontSize: 18,
                  marginTop: 5,
                }}
              >
                Başlangıç
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  paddingHorizontal: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>
                  {Array.isArray(updateValue) && updateValue[0] != undefined
                    ? moment(updateValue[0]).locale("tr", trLocale).format("LT")
                    : moment(value[0]).locale("tr", trLocale).format("LT")}
                </Text>
                <Ionicons
                  name="chevron-down-outline"
                  size={18}
                  style={{ marginLeft: 10 }}
                />
              </View>
            </TouchableOpacity>
            <Ionicons
              name="remove-outline"
              size={18}
              style={{ alignSelf: "center" }}
            />
            <TouchableOpacity onPress={showDatePicker2}>
              <Text
                style={{
                  marginLeft: 10,
                  color: "grey",
                  fontSize: 18,
                  marginTop: 5,
                }}
              >
                Bitiş
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  paddingHorizontal: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>
                  {Array.isArray(updateValue) && updateValue[1] != undefined
                    ? moment(updateValue[1]).locale("tr", trLocale).format("LT")
                    : moment(value[1]).locale("tr", trLocale).format("LT")}
                </Text>
                <Ionicons
                  name="chevron-down-outline"
                  size={18}
                  style={{ marginLeft: 10 }}
                />
              </View>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible1}
              mode="time"
              date={
                Array.isArray(updateValue)
                  ? updateValue[0] == undefined
                    ? new Date(value[0])
                    : updateValue[0]
                  : new Date(value[0])
              }
              onConfirm={handleConfirm1}
              onCancel={hideDatePicker1}
              locale="tr-TR"
              confirmTextIOS="Tamam"
              cancelTextIOS="İptal"
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible2}
              mode="time"
              date={
                Array.isArray(updateValue)
                  ? updateValue[1] == undefined
                    ? new Date(value[1])
                    : updateValue[1]
                  : new Date(value[1])
              }
              onConfirm={handleConfirm2}
              onCancel={hideDatePicker2}
              locale="tr-TR"
              confirmTextIOS="Tamam"
              cancelTextIOS="İptal"
            />
          </View>
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
                } else if (
                  topInfo == "E-mail" ||
                  topInfo == "Kronik Hastalık" ||
                  topInfo == "Branş" ||
                  topInfo == "Çalışma Saatleri"
                ) {
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
  },
  valueStyle: {
    fontSize: 20,
    color: "#1C3879",
    fontWeight: "bold",
  },
  textCont: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  textInput: {
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 20,
    backgroundColor: "#ECECEC",
    //height: 70,
    color: "#fff",
  },
  buttonCont: {
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: 300,
    height: 50,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#f44336",
    borderBottomWidth: 0.8,
    borderRadius: 0,
    paddingLeft: 10,
    fontSize: 18,
    marginVertical: 15,
  },
});

export default ProfileUpdateModal;
