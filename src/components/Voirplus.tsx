// Voirplus.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../app/index"; // Adaptez le chemin d'import
import Colors from "../config/Color";
import { getPlatById } from "../service/PlatService";
import { PlatData } from "../data/Image";


// Type pour la route
type VoirplusRouteProp = RouteProp<RootStackParamList, "Voirplus">;

const Voirplus = () => {
  const route = useRoute<VoirplusRouteProp>();
  const { item } = route.params;
  const [plats, setPlats] = useState<PlatData[]>([]); // Mamor
  useEffect(()=>{
    getPlatById(item.id).then((data: any)=>{
      setPlats(data);
    })
  },[])


  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={item.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.prix}>{item.prix} €</Text>
        <Text>Temps cuisson:{item.tempscuisson} sec</Text>
        <Text style={styles.ingredientsTitle}>Ingrédients :</Text>
        {item.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            • {ingredient}
          </Text>
        ))}
        <TouchableOpacity
          style={styles.buttonAjouter}
          onPress={() => {
            console.log("Ajouter", item.name);
          }}
        >
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background || "#fff", // Assurez-vous d'avoir cette couleur dans votre fichier Colors
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  prix: {
    fontSize: 20,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  ingredient: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 8,
    marginBottom: 2,
  },
  buttonAjouter: {
    marginTop: 20,
    backgroundColor: Colors.primary || "#3498db", // Vous pouvez définir Colors.primary dans votre config
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.buttonText || "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Voirplus;
