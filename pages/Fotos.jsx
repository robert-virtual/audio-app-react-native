import {
  useWindowDimensions,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { useState } from "react";
import { LauchGallery } from "../components";
export function Fotos() {
  const [selectedImage, setSelectedImage] = useState();
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <LauchGallery
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setSelectedImage={setSelectedImage}
      />
      {selectedImage ? (
        <Image source={{ uri: selectedImage.uri, width, height: width }} />
      ) : (
        <View />
      )}

      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => setModalVisible(true)}
      >
        <Text>Abrir fotos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
