import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import FilmsScreen from "./screens/FilmsScreen";
import AddFilmsScreen from "./screens/AddFilmsScreen";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";

// Créez l'onglet de navigation
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Films") {
              icon = "📽";
            } else if (route.name === "Ajouter un film") {
              icon = "➕";
            }
            return <Text style={{ fontSize: 25 }}>{icon}</Text>;
          },

          tabBarActiveTintColor: "#202020",
          tabBarInactiveTintColor: "gray",
        })}>
        <Tab.Screen name="Films" component={FilmsScreen} />
        <Tab.Screen
          name="Ajouter un film"
          component={AddFilmsScreen}
          initialParams={{ newFilm: null }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
