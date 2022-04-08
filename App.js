import { NavigationContainer } from "@react-navigation/native";
import { ImagesProvider } from "./context";
import { TabsMenu } from "./routes";

export default function App() {
  return (
    <NavigationContainer>
      <ImagesProvider>
        <TabsMenu />
      </ImagesProvider>
    </NavigationContainer>
  );
}
