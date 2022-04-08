import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { Entypo } from "@expo/vector-icons";
import { usePermissions, getAssetsAsync } from "expo-media-library";
import { useEffect, useState } from "react";
export function Home() {
  const [sound, setSound] = useState();
  async function playAudio({ uri }) {
    let { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
    await sound.playAsync();
  }
  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const [status, requestPermission] = usePermissions();
  const [audios, setAudios] = useState([]);
  useEffect(() => {
    if (!status) {
      requestPermission();
      return;
    }
    getAudioFiles();
  }, [status]);
  const [cargando, setCargando] = useState(true);
  async function getAudioFiles() {
    let res = await getAssetsAsync({ mediaType: "audio" });
    // res = await getAssetsAsync({ mediaType: "audio", first: res.totalCount });
    setCargando(false);
    setAudios(res.assets);
  }
  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color="blue" />
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={audios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => playAudio(item)} style={styles.song}>
            <Text>{item.filename.split(".")[0]}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.player}>
        {sound ? (
          <TouchableOpacity onPress={() => sound.stopAsync()}>
            <Entypo name="controller-stop" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Entypo name="controller-play" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
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
  song: {
    padding: 10,
    marginVertical: 1,
    backgroundColor: "white",
  },
  player: {
    justifyContent: "flex-end",
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
