// MonPanier.tsx
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colors from "../config/Color";
import { CartContext } from "../context/CardContext"; // Vérifiez le chemin si besoin
import { PlatData } from "../../app/index";
import { Ionicons } from "@expo/vector-icons";

const MonPanier = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  // Stockage local des quantités pour chaque item (indexé par l'index de l'item)
  const [quantities, setQuantities] = useState<{ [key: number]: string }>({});

  const renderItem = ({ item, index }: { item: PlatData; index: number }) => {
    // Par défaut, si aucune quantité n'est saisie, on affiche "1"
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
      />
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
});

export default MonPanier;
