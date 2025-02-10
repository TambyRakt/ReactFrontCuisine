// MonPanier.tsx
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Colors from "../src/config/Color";
import { CartContext, Commande } from "../src/context/CardContext";
import { PlatData } from "../app/index";
import { Ionicons } from "@expo/vector-icons";
// Import du hook de navigation et des types
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../app/index"; // Ajustez le chemin en fonction de votre arborescence
import { getAllPanier } from "../src/service/PlatService";

// Définition du type pour la navigation
type MonPanierScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MonPanier"
>;

const MonPanier = () => {
  const { cart, removeFromCart, addCommande, getUserCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState<{ [key: number]: string }>({});
  const navigation = useNavigation<MonPanierScreenNavigationProp>();

  useEffect(() => {
    getUserCart()
  }, []);

  const handleOrder = () => {
    if (cart.length === 0) {
      Alert.alert("Erreur", "Votre panier est vide !");
      return;
    }

    // Construire la commande à partir des items du panier et des quantités saisies
    const itemsCommande = cart.map((item, index) => {
      const quantityStr = quantities[index] || "1";
      const quantity = parseInt(quantityStr, 10) || 1;
      return { item, quantity };
    });

    const newCommande: Commande = {
      id: Date.now(), // Utilisation d'un timestamp comme identifiant
      items: itemsCommande,
      date: new Date(),
    };

    // Ajout de la commande via le contexte
    addCommande(newCommande);

    // Afficher une alerte de confirmation
    Alert.alert("Commande", "Votre commande a été passée !");

    // Navigation vers la page AllCommande
    navigation.navigate("AllCommande");
  };

  const renderItem = ({ item, index }: { item: PlatData; index: number }) => {
    const quantity = quantities[index] || "1";

    return (
      <View style={styles.item}>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.prix} €</Text>
        </View>
        <TextInput
          style={styles.inputNumber}
          keyboardType="number-pad"
          value={quantity}
          onChangeText={(text) =>
            setQuantities((prev) => ({ ...prev, [index]: text }))
          }
        />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeFromCart(index)}
        >
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Panier</Text>
      <FlatList
        data={cart}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Votre panier est vide</Text>
        }
        contentContainerStyle={{ flexGrow: 1 }}
      />
      {cart.length > 0 && (
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>Commander</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.cardBackground,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.text,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: "600",
  },
  itemPrice: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  inputNumber: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 16,
    color: Colors.text,
    marginHorizontal: 12,
    backgroundColor: "#fff",
  },
  deleteButton: {
    padding: 4,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    color: Colors.textSecondary,
  },
  orderButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MonPanier;
