import React from "react";
import { View } from "react-native";
import Cell from "../../../components/Cell";
import Header from "../../../components/Header/Header";
import firebase from "firebase/compat/app";

const Other = ({ navigation }) => {
  const HakkimidaText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae dapibus lectus. Maecenas vitae nisl velit. Aenean nec nibh luctus, bibendum sapien vitae, congue sapien. Ut sed mauris luctus, tempor velit ac, molestie augue. Sed elementum euismod magna. Pellentesque luctus iaculis arcu, id semper enim pulvinar eget. Fusce in urna ipsum. Sed sagittis laoreet ante non facilisis. " +
    "Proin bibendum non metus ac commodo. Quisque gravida enim at luctus gravida. Sed pulvinar ut dolor sed porttitor. Nullam consequat porta eros, sit amet gravida sem ultrices vel. Nulla finibus malesuada nulla, sed varius diam fermentum nec. Nullam tempus est eget turpis tempus, rhoncus ultrices est tempus. Nulla rutrum quis felis vitae tempus. Vivamus dapibus placerat lacus non posuere. Integer accumsan volutpat mollis. Integer dignissim vehicula libero ut vulputate. " +
    "Suspendisse potenti. Sed sed metus erat. Donec at turpis risus. Donec vulputate venenatis elit, non posuere massa dictum porttitor. Aliquam aliquet ipsum et leo sollicitudin eleifend. Vivamus fermentum cursus pellentesque. Proin scelerisque ullamcorper euismod. Cras lobortis tellus sit amet orci ullamcorper laoreet. " +
    "Donec metus dui, cursus id posuere ac, feugiat nec ex. Phasellus sodales molestie nisl at consectetur. Etiam id risus efficitur, fringilla libero sit amet, faucibus nunc. Donec sit amet hendrerit massa, a cursus ex. Aliquam erat volutpat. Donec mauris arcu, maximus at vestibulum et, blandit sit amet urna. Nunc porta tortor a leo varius aliquet. In vel elementum risus. Proin quis tellus commodo, condimentum turpis et, mattis urna. Donec commodo accumsan varius. " +
    "Duis ut tincidunt orci. Nulla et consequat velit, et luctus lectus. Nunc suscipit nunc ante, et iaculis quam sollicitudin pretium. Cras nisl leo, volutpat sed ante quis, lobortis blandit risus. Ut vitae lacinia nisl, in porttitor dui. Integer dictum dolor nisl, at aliquet nisi elementum eu. Nunc rhoncus quam sit amet ornare aliquam. Cras tortor orci, tempus in pellentesque placerat, suscipit eget diam. Sed ipsum tellus, vehicula in dui eu, finibus euismod tortor. Donec eget nulla eget nisi hendrerit dignissim. Donec laoreet, justo id bibendum tristique, quam sapien volutpat quam, in auctor felis neque at justo. Sed accumsan mauris ac ultrices ultrices. Sed sagittis gravida ligula et hendrerit. ";

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        onPressChats={() =>
          navigation.navigate("ChatsScreen", { screen: "Chats" })
        }
        onPressNotifications={() => navigation.navigate("Notifications")}
        W_user="H_user"
      />
      <Cell
        title="Hakkımızda"
        icon="information-outline"
        tintColor="blue"
        onPress={() =>
          navigation.navigate("OtherScreen", {
            screen: "Others",
            params: {
              title: "Hakkımızda",
              text: HakkimidaText,
            },
          })
        }
      />

      <Cell
        title="Üyelik Sözleşmesi"
        icon="document-text-outline"
        tintColor="#26a69a"
        onPress={() =>
          navigation.navigate("OtherScreen", {
            screen: "Others",
            params: {
              title: "Üyelik Sözleşmesi",
              text: HakkimidaText,
            },
          })
        }
      />

      <Cell
        title="Sıkça Sorulan Sorular"
        icon="help-outline"
        tintColor="#00ca00"
        onPress={() =>
          navigation.navigate("OtherScreen", {
            screen: "Others",
            params: {
              title: "Sıkça Sorular Sorular",
              text: HakkimidaText,
            },
          })
        }
      />

      <Cell
        title="İletişim"
        icon="call-outline"
        tintColor="#f4e035"
        onPress={() =>
          navigation.navigate("OtherScreen", {
            screen: "Iletisim",
            params: {
              title: "İletişim",
            },
          })
        }
      />

      <Cell
        title="Bizi Değerlendirin"
        icon="star-outline"
        tintColor="#fdd835"
      />

      <Cell
        title="Çıkış"
        icon="log-out-outline"
        tintColor="#c62828"
        onPress={() => firebase.auth().signOut()}
      />
    </View>
  );
};

export default Other;
