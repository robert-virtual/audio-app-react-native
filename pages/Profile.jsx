import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { useState } from "react";
import { LauchGallery } from "../components";

export function Profile() {
  const [modalvisible, setModalvisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  return (
    <View style={styles.container}>
      <LauchGallery
        setModalVisible={setModalvisible}
        modalVisible={modalvisible}
        setSelectedImage={setSelectedImage}
      />
      <Image />
      <TouchableOpacity onPress={() => setModalvisible(true)}>
        <Text>Seleccionar Foto</Text>
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
});
