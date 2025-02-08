// index.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListeDesPlats from "../src/components/ListeDesPlats";
import Voirplus from "../src/components/Voirplus";
import MonPanier from "../src/components/MonPanier";
import Colors from "../src/config/Color";
import { CartProvider } from "../src/context/CardContext";

export type PlatData = {
  name: string;
  image: any; // Vous pouvez préciser ImageSourcePropType si besoin
  ingredients: string[];
  prix: number;
  description: string;
};

export type RootStackParamList = {
  ListeDesPlats: undefined;
  Voirplus: { item: PlatData };
  MonPanier: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <CartProvider>
        <Stack.Navigator initialRouteName="ListeDesPlats">
          <Stack.Screen
            name="ListeDesPlats"
            component={ListeDesPlats}
            options={{ title: "Bienvenue" }}
          />
          <Stack.Screen
            name="Voirplus"
            component={Voirplus}
            options={{ title: "Détails du Plat" }}
          />
          <Stack.Screen
            name="MonPanier"
            component={MonPanier}
            options={{ title: "Mon Panier" }}
          />
        </Stack.Navigator>

    </CartProvider>
  );
};

export default App;
