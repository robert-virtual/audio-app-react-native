import { useEffect, useState, createContext } from "react";
import { usePermissions, getAssetsAsync } from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ImagesContext = createContext({ fotos: [], cargando: true });
const { round } = Math;

export function ImagesProvider({ children }) {
  const [saved, setSaved] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [status, requestPermission] = usePermissions();
  const [fotos, setFotos] = useState([]);
  useEffect(() => {
    if (saved) {
      return;
    }
    console.log("guardados en local estorage");
    if (fotos.length) {
      AsyncStorage.setItem("photos", JSON.stringify(fotos));
    }
  }, [fotos]);

  useEffect(() => {
    init();
  }, []);
  async function init() {
    await requestPermission();
    getPhotos();
  }

  async function getPhotos() {
    setCargando(true);
    const string = await AsyncStorage.getItem("photos");
    const stringObj = JSON.parse(string);
    setCargando(false);
    if (stringObj.length) {
      console.log("from AsyncStorage");
      setSaved(true);
      setFotos(stringObj);
    }
    try {
      let res = await getAssetsAsync({
        mediaType: "photo",
      });
      res = await getAssetsAsync({
        mediaType: "photo",
        first: res.totalCount,
      });
      if (fotos.length < res.assets.length) {
        console.log("new images");
        setFotos(res.assets.reverse());
      }
      console.log("No new images");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ImagesContext.Provider value={{ fotos, cargando }}>
      {children}
    </ImagesContext.Provider>
  );
}
