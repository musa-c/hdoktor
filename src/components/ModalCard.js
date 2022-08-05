import {
  View,
  Text,
  Dimensions,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import CardText from "./Card/CardText";
import Separator from "../components/Separator";
import LoadingButton from "./Buttons/LoadingButton";
import firebase from "firebase/compat/app";

const ModalCard = ({
  isVisible,
  onBackdropPress,
  id,
  RandevuDate,
  username,
  HDocId,
  HEmail,
  onModalHide,
}) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [randevu, setRandevu] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setIsVisibleModal(isVisible == undefined ? false : isVisible);
    }
    const randevu = [];
    RandevuDate.map((element) => {
      if (element.Id == id) {
        randevu.push(element);
      }
    });

    if (!unmounted) {
      setRandevu(randevu);
    }

    return () => {
      unmounted = true;
    };
  }, [isVisible, refresh]);

  const user = firebase.auth().currentUser;
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [RandevuSaat, setRandevuSaat] = useState();
  const [RandevuTarih, setRandevuTarih] = useState();

  const PatientRemove = async (RandevuSaat, RandevuTarih) => {
    setRandevuSaat(RandevuSaat);
    setRandevuTarih(RandevuTarih);
    setDisabled(true);
    setLoading(true);
    firebase
      .firestore()
      .collection("D_user")
      .doc(user.uid)
      .collection("Hastalarım")
      .doc(HDocId)
      .collection("RandevuTarih")
      .where("RandevuSaat", "==", RandevuSaat)
      .where("RandevuTarih", "==", RandevuTarih)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              firebase
                .firestore()
                .collection("D_user")
                .doc(user.uid)
                .collection("Hastalarım")
                .doc(HDocId)
                .collection("RandevuTarih")
                .onSnapshot((docd) => {
                  firebase
                    .firestore()
                    .collection("D_user")
                    .doc(user.uid)
                    .collection("Hastalarım")
                    .doc(HDocId)
                    .update({ randevuCount: docd.docs.length });
                  firebase
                    .firestore()
                    .collection("H_user")
                    .where("email", "==", HEmail)
                    .get()
                    .then((query) => {
                      query.forEach((snapQuery) => {
                        firebase
                          .firestore()
                          .collection("H_user")
                          .doc(snapQuery.id)
                          .collection("Doktorlarım")
                          .where("email", "==", user.email)
                          .get()
                          .then((query2) => {
                            query2.forEach((snapQuery2) => {
                              firebase
                                .firestore()
                                .collection("H_user")
                                .doc(snapQuery.id)
                                .collection("Doktorlarım")
                                .doc(snapQuery2.id)
                                .collection("RandevuTarih")
                                .where("RandevuSaat", "==", RandevuSaat)
                                .where("RandevuTarih", "==", RandevuTarih)
                                .get()
                                .then((snapshot2) => {
                                  snapshot2.forEach((doc2) => {
                                    doc2.ref
                                      .delete()
                                      .then(() => {
                                        console.log(
                                          "doktor başarılı randevu silindi"
                                        );
                                        firebase
                                          .firestore()
                                          .collection("H_user")
                                          .doc(snapQuery.id)
                                          .collection("Doktorlarım")
                                          .doc(snapQuery2.id)
                                          .collection("RandevuTarih")
                                          .onSnapshot((doc3) => {
                                            firebase
                                              .firestore()
                                              .collection("H_user")
                                              .doc(snapQuery.id)
                                              .collection("Doktorlarım")
                                              .doc(snapQuery2.id)
                                              .update({
                                                randevuCount: doc3.docs.length,
                                              });
                                          });
                                        setLoading(false);
                                        setDisabled(false);
                                        if (docd.docs.length != 1) {
                                          setRefresh(!refresh);
                                        }
                                      })
                                      .catch(() => {
                                        console.log(
                                          "doktor başarısız randevu silindi"
                                        );
                                        setLoading(false);
                                        setDisabled(false);
                                      });
                                  });
                                });
                            });
                          })
                          .catch(() => {
                            console.log("olmadı3");
                            setLoading(false);
                            setDisabled(false);
                          });
                      });
                    })
                    .catch(() => {
                      console.log("olmadı2");
                      setLoading(false);
                      setDisabled(false);
                    });
                  //console.log("başarılı silme");

                  //setRefresh(!refresh);

                  // firebase
                  //   .firestore()
                  //   .collection("D_user")
                  //   .doc(user.uid)
                  //   .collection("Hastalarım")
                  //   .doc(HDocId)
                  //   .collection("RandevuTarih")
                  //   .onSnapshot((docx) => {
                  if (docd.docs.length == 0) {
                    //setIsVisibleModal(false);
                    // firebase
                    //   .firestore()
                    //   .collection("D_user")
                    //   .doc(user.uid)
                    //   .collection("Hastalarım")
                    //   .doc(HDocId)
                    //   .delete();
                    //.then(() => {
                    // console.log("hastlarım silinme başarılı");
                    // firebase
                    //   .firestore()
                    //   .collection("H_user")
                    //   .where("email", "==", HEmail)
                    //   .onSnapshot((docsnap) => {
                    //     docsnap.forEach((docsnap2) => {
                    //       firebase
                    //         .firestore()
                    //         .collection("H_user")
                    //         .doc(docsnap2.id)
                    //         .collection("Doktorlarım")
                    //         .where("email", "==", user.email)
                    //         .get()
                    //         .then((snapfor) => {
                    //           snapfor.forEach((snapfordelete) => {
                    //             snapfordelete.ref
                    //               .delete()
                    //               .then(() => {
                    //                 console.log("IDDD:", snapfordelete.id);
                    //                 // firebase
                    //                 //   .firestore()
                    //                 //   .collection("H_user")
                    //                 //   .doc(docsnap2.id)
                    //                 //   .collection("Doktorlarım")
                    //                 //   .doc(snapfordelete.id)
                    //                 //   .delete();
                    //                 console.log("doktor silindi");
                    //               })
                    //               .catch(() => {
                    //                 console.log("doktor silinemedi");
                    //               });
                    //           });
                    //         });
                    //     });
                    //   });
                    //setRefresh(!refresh);
                    //setIsVisibleModal(false);
                    // console.log("hasta silindi");
                    //  })
                    //.catch(() => {
                    // console.log("hastlarım silinme başarısız");
                    //});
                  } else if (docd.docs.length == 1) {
                    setIsVisibleModal(false);
                    // docd.forEach((singleDoc) => {
                    //   firebase
                    //     .firestore()
                    //     .collection("D_user")
                    //     .doc(user.uid)
                    //     .collection("Hastalarım")
                    //     .doc(HDocId)
                    //     .update({
                    //       RandevuSaat: singleDoc.data().RandevuSaat,
                    //       RandevuTarih: singleDoc.data().RandevuTarih,
                    //     })
                    //     .then(() => {
                    //       setRefresh(!refresh);
                    //       console.log("başarılı update HASTALARIM");
                    //     })
                    //     .catch(() => {
                    //       console.log("başarsızı update HASTALARIM");
                    //     });
                    //   firebase
                    //     .firestore()
                    //     .collection("H_user")
                    //     .where("email", "==", HEmail)
                    //     .get()
                    //     .then((singledocWhere) => {
                    //       singledocWhere.forEach((singledocFor) => {
                    //         firebase
                    //           .firestore()
                    //           .collection("H_user")
                    //           .doc(singledocFor.id)
                    //           .collection("Doktorlarım")
                    //           .where("email", "==", user.email)
                    //           .get()
                    //           .then((singledocWhere2) => {
                    //             singledocWhere2.forEach((singledocFor2) => {
                    //               firebase
                    //                 .firestore()
                    //                 .collection("H_user")
                    //                 .doc(singledocFor.id)
                    //                 .collection("Doktorlarım")
                    //                 .doc(singledocFor2.id)
                    //                 .update({
                    //                   RandevuSaat: singleDoc.data().RandevuSaat,
                    //                   RandevuTarih:
                    //                     singleDoc.data().RandevuTarih,
                    //                 })
                    //                 .then(() => {
                    //                   console.log(
                    //                     "başarılı DOKTORRLAIM Collection update"
                    //                   );
                    //                 })
                    //                 .catch(() => {
                    //                   console.log(
                    //                     "başarısız DOKTORRLAIM Collection update"
                    //                   );
                    //                 });
                    //             });
                    //           });
                    //       });
                    //     });
                    // });
                  }
                });

              // });
            })
            .catch(() => {
              console.log("başarısız silme");
              setLoading(false);
              setDisabled(false);
            });
        });
      })
      .catch(() => {
        console.log("olmadı");
        setLoading(false);
        setDisabled(false);
      });
  };

  return (
    <Modal
      isVisible={isVisibleModal}
      onBackdropPress={onBackdropPress}
      style={{ justifyContent: "center", margin: 20 }}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={0}
      animationOutTiming={300}
      onModalHide={onModalHide}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 15,
          width: Dimensions.get("screen").width / 1.1,
          height: Dimensions.get("screen").height / 2.3,
        }}
      >
        <View style={styles.ContUserName}>
          <Text style={styles.FontUserName}>{username}</Text>
        </View>
        <FlatList
          data={randevu}
          renderItem={(element) => (
            <View
              style={{
                margin: 10,
                alignItems: "center",
                //  backgroundColor: "yellow",
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View>
                <CardText
                  iconIonic={"calendar-sharp"}
                  size={30}
                  text={element.item.RandevuTarih}
                />
                <CardText
                  iconIonic={"alarm-sharp"}
                  size={30}
                  text={element.item.RandevuSaat}
                />
              </View>

              <View
                style={{
                  //backgroundColor: "red",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <LoadingButton
                  //icon="minus-box-outline"
                  //size={30}
                  // fontsize={10}
                  onPress={() => {
                    PatientRemove(
                      element.item.RandevuSaat,
                      element.item.RandevuTarih
                      //setLoading(true)
                    );
                  }}
                  FontStyle={{ fontSize: 15 }}
                  loading={
                    (element.item.RandevuSaat == RandevuSaat) &
                    (element.item.RandevuTarih == RandevuTarih)
                      ? loading
                      : false
                  }
                  disabled={disabled}
                  mode={"outlined"}
                  text="Kaldır"
                  key={{
                    Saat: element.item.RandevuSaat,
                    Tarih: element.item.RandevuTarih,
                  }}
                />
              </View>
              <Separator />
            </View>
          )}
        />
      </View>
      {/* <View style={{width: Dimensions.get("screen").width/1.1, backgroundColor:"blue", justifyContent:"center", alignItems:"center", flex:1}}>
        <ScrollView style={{flex:1 ,backgroundColor:"white"}}>

    {
      randevu.map((element)=>
      (
        <React.Fragment key={element.RandevuSaat}>
        <View style={{backgroundColor:"#fff", borderRadius:10,  alignItems:"center", justifyContent:"center" }}>
             
        <Text>Randevu Tarihi: {element.RandevuSaat}</Text>
        <Text>Randevu Saati: {element.RandevuTarih}</Text>

   
</View>
</React.Fragment>
      ))
    }
      </ScrollView>
      </View> */}

      {/* <View style={{backgroundColor:"#fff", borderRadius:10, width: Dimensions.get("screen").width/1.1, alignItems:"center", justifyContent:"center" }}>
             
        <Text>Randevu Tarihi: 2222</Text>
        <Text>Randevu Saati: </Text>
        </View> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  ContUserName: {
    justifyContent: "center",
    alignItems: "center",
  },
  FontUserName: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default ModalCard;
