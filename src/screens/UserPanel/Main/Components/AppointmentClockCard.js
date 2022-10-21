import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import moment from "moment";
import trLocale from "moment/locale/tr";
import AppointmentModal from "./AppointmentModal";
import { Alert } from "react-native";

const AppointmentClockCard = ({
  clock,
  data,
  selectedDate,
  DoctorId,
  H_id,
  H_name,
  H_Avatar,
  H_Cinsiyet,
  H_email,
  KHastalik,
}) => {
  const [selectClock, setSelectClock] = useState();
  const [isVisible, setVisible] = useState(false);
  const [DoluZamanlar, setDoluZamanlar] = useState([]);
  const [isFull, setIsFull] = useState(false);
  const [loading, setLoading] = useState(true);

  //console.log("selectedDate:", moment(selectedDate).format("LL"));

  useEffect(() => {
    const doluZamanlar = [];
    let unmounted = false;

    firebase
      .firestore()
      .collection("D_user")
      .doc(DoctorId)
      .collection("Hastalarım")
      .onSnapshot((snaps) => {
        snaps.forEach((snapsFor) => {
          firebase
            .firestore()
            .collection("D_user")
            .doc(DoctorId)
            .collection("Hastalarım")
            .doc(snapsFor.id)
            .collection("RandevuTarih")
            .onSnapshot((snaps2) => {
              snaps2.forEach((snaps2For) => {
                if (
                  (snaps2For.data().RandevuTarih ==
                    moment(selectedDate).format("LL")) &
                  (snaps2For.data().RandevuSaat == clock)
                ) {
                  if (!unmounted) {
                    setIsFull(true);
                  }
                } else {
                  if (isFull) {
                    if (!unmounted) {
                      setIsFull(false);
                    }
                  }
                }
                // doluZamanlar.push({
                //   RandevuSaat: snaps2For.data().RandevuSaat,
                //   RandevuTarih: snaps2For.data().RandevuTarih,
                // });
              });
            });
        });
      });
    // setDoluZamanlar(doluZamanlar);
    if (!unmounted) {
      setLoading(false);
    }

    // doluZamanlar.map((element) => {
    //   console.log("rT:", element.RandevuTarih);
    //   console.log("rTS:", moment(selectedDate).format("LL"));

    //   if (
    //     (element.RandevuTarih == moment(selectedDate).format("LL")) &
    //     (element.RandevuSaat == clock)
    //   ) {
    //     setIsFull(true);
    //   }
    // });
    return () => {
      unmounted = true;
    };
  }, [selectedDate]);

  const toggleModal = () => {
    setVisible(!isVisible);
  };
  return (
    <>
      <AppointmentModal
        isVisible={isVisible}
        onBackdropPress={toggleModal}
        date={selectedDate}
        clock={clock}
        H_id={H_id}
        H_name={H_name}
        H_Avatar={H_Avatar}
        H_Cinsiyet={H_Cinsiyet}
        H_email={H_email}
        KHastalik={KHastalik}
        doctorId={DoctorId}
      />
      <TouchableOpacity
        onPress={() => {
          setSelectClock(clock);
          if (!isFull & !loading) {
            setVisible(true);
          } else {
            Alert.alert(
              "Dolu!",
              "Randevu saati daha önce alınmış lütffen başka bir randevu saati ve/veya günü seçiniz!",
              [{ text: "Tamam" }]
            );
          }
        }}
      >
        <View style={styles.timeContainer}>
          <Text style={{ color: "#707070" }}>{clock}</Text>

          <View style={styles.freeArea}>
            {isFull ? <Text style={{ color: "#707070" }}>DOLU</Text> : null}
            <View
              style={[
                styles.radio,
                isFull
                  ? { backgroundColor: "#C21010" }
                  : {
                      backgroundColor: "white",
                      borderColor: "#7D8392",
                      borderWidth: 1,
                    },
              ]}
            ></View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    borderColor: "#DBE3EB",
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  freeArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  radio: {
    height: 15,
    width: 15,
    borderRadius: 30,

    marginLeft: 10,
    //backgroundColor: "#C21010",
  },
});

export default AppointmentClockCard;
