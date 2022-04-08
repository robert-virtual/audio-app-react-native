import {
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";

const { round } = Math;
import { AntDesign } from "@expo/vector-icons";
import { ImagesContext } from "../context";
import { useContext } from "react";

export function LauchGallery({
  modalVisible,
  setModalVisible,
  setSelectedImage,
}) {
  const { cargando, fotos } = useContext(ImagesContext);
  const { width } = useWindowDimensions();

  function selectImage(item) {
    return (e) => {
      setModalVisible(false);
      setSelectedImage(item);
    };
  }

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modal}>
        <TouchableOpacity
          style={{ alignSelf: "flex-start", margin: 15 }}
          onPress={() => setModalVisible(false)}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        {cargando ? (
          <View style={styles.container}>
            <ActivityIndicator size={"large"} color="blue" />
          </View>
        ) : (
          <FlatList
            data={fotos}
            numColumns={round(width / 100)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <Pressable onPress={selectImage(item)}>
                  <Image
                    source={{
                      uri: item.uri,
                      width: 100,
                      height: 100,
                    }}
                  />
                </Pressable>
              );
            }}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
