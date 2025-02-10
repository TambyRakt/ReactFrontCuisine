// index.tsx
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import des écrans
import SeConnecter from "./SeConnecter";
import Inscription from "./Inscription";
import ListeDesPlats from "./ListeDesPlats";
import Voirplus from "./Voirplus";
import MonPanier from "./MonPanier";
import AllCommande from "./AllCommande";
import Colors from "../src/config/Color";
import { CartProvider } from "../src/context/CardContext";

export type PlatData = {
  id: number;
  name: string;
  image: any;
  ingredients: string[];
  tempscuisson: Date;
  prix: number;
  description: string;
};

export type RootStackParamList = {
  SeConnecter: undefined;
  Inscription: undefined;
  ListeDesPlats: undefined;
  Voirplus: { item: PlatData };
  MonPanier: undefined;
  AllCommande: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
      <CartProvider>
        <Stack.Navigator
          initialRouteName="SeConnecter"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.textSecondary },
            headerTintColor: Colors.text,
          }}
        >
          <Stack.Screen
            name="SeConnecter"
            component={SeConnecter}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Inscription"
            component={Inscription}
            options={{ headerShown: false }}
          />
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
          <Stack.Screen
            name="AllCommande"
            component={AllCommande}
            options={{ title: "Mes Commandes" }}
          />
        </Stack.Navigator>
      </CartProvider>
  );
};

export default App;
