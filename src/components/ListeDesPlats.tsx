import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../config/Color";
import { LinearGradient } from "expo-linear-gradient";
import { getPlats } from "../data/Image";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, PlatData } from "../../app/index";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../context/CardContext";
import Checkbox from "expo-checkbox"; // Assurez-vous d'avoir installé expo-checkbox

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "ListeDesPlats">;

export const ListeDesPlats = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation<NavigationProp>();
  const { addToCart } = useContext(CartContext);
  const [plats, setPlats] = useState<PlatData[]>([]);
  // États pour le tri
  const [sortMin, setSortMin] = useState(false);
  const [sortMax, setSortMax] = useState(false);

  useEffect(() => {
    getPlats().then((data: any) => {
      setPlats(data);
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("MonPanier")}>
          <Ionicons
            name="cart"
            size={24}
            color={Colors.cardBackground}
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Filtrer les plats selon le texte de recherche
  const filteredPlats = plats.filter((plat) =>
    plat.name.toLowerCase().includes(search.toLowerCase())
  );

  // Tri des plats en fonction du choix de l'utilisateur
  const sortedPlats = [...filteredPlats];
  if (sortMin) {
    sortedPlats.sort((a, b) => a.prix - b.prix);
  } else if (sortMax) {
    sortedPlats.sort((a, b) => b.prix - a.prix);
  }

  return (
    <LinearGradient
      colors={[Colors.gradientStart, Colors.gradientEnd]}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <Text style={styles.titre}>Recherche de Plats</Text>

        {/* Champ de recherche */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Rechercher un plat"
            placeholderTextColor={Colors.placeholder}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Bloc des filtres de tri par prix */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Trier par prix :</Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxItem}>
              <Checkbox
                value={sortMin}
                onValueChange={(newValue) => {
                  setSortMin(newValue);
                  if (newValue) setSortMax(false); // Désactive "Max" si "Min" est activé
                }}
                color={sortMin ? Colors.text : undefined}
              />
              <Text style={styles.checkboxLabel}>Min → Max</Text>
            </View>
            <View style={styles.checkboxItem}>
              <Checkbox
                value={sortMax}
                onValueChange={(newValue) => {
                  setSortMax(newValue);
                  if (newValue) setSortMin(false); // Désactive "Min" si "Max" est activé
                }}
                color={sortMax ? Colors.text : undefined}
              />
              <Text style={styles.checkboxLabel}>Max → Min</Text>
            </View>
          </View>
        </View>

        {/* Liste des plats */}
        <FlatList
          data={sortedPlats}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image style={styles.image} source={item.image} />
              <View style={styles.rowContainer}>
                <View style={styles.infoContainer}>
                  <Text style={styles.nomPlat}>{item.name}</Text>
                  <Text style={styles.prixPlat}>{item.prix} €</Text>
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.buttonVoirPlus}
                    onPress={() => {
                      navigation.navigate("Voirplus", { item });
                    }}
                  >
                    <Text style={styles.buttonText}>Voir plus</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonAcheter}
                    onPress={() => {
                      addToCart(item);
                      navigation.navigate("MonPanier");
                    }}
                  >
                    <Text style={styles.buttonText}>Acheter</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  titre: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
    textAlign: "center",
  },
  /* Styles pour le champ de recherche */
  searchContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.cardBackground,
    fontSize: 14,
  },
  /* Styles pour le bloc des filtres */
  filterContainer: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 4,
    color: Colors.text,
    fontSize: 14,
  },
  /* Styles pour la carte d'un plat */
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    overflow: "hidden",
    borderColor: Colors.border,
    borderWidth: 1,
    marginBottom: 16,
    elevation: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  nomPlat: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  prixPlat: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  buttonVoirPlus: {
    backgroundColor: Colors.textSecondary,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonAcheter: {
    backgroundColor: Colors.text,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ListeDesPlats;
