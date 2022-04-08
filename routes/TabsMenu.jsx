import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fotos, Home, Profile } from "../pages";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const Tabs = createBottomTabNavigator();

export function TabsMenu() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Fotos"
        component={Fotos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="photo" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="photo" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
