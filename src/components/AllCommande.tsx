// AllCommande.tsx
import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Colors from "../config/Color";
import { CartContext, Commande } from "../context/CardContext";

const AllCommande = () => {
  const { commandes } = useContext(CartContext);

  const renderCommande = ({ item }: { item: Commande }) => {
    return (
      <View style={styles.commandeItem}>
        <Text style={styles.commandeDate}>
          Date: {item.date.toLocaleString()}
        </Text>
        {item.items.map((entry, index) => (
          <Text key={index} style={styles.commandeItemText}>
            {entry.item.name} — {entry.quantity} x {entry.item.prix}€
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Commandes</Text>
      <FlatList
        data={commandes}
        keyExtractor={(commande) => commande.id.toString()}
        renderItem={renderCommande}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucune commande</Text>
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
    textAlign: "center",
    color: Colors.text,
  },
  commandeItem: {
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  commandeId: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  commandeDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  commandeItemText: {
    fontSize: 14,
    color: Colors.text,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.textSecondary,
  },
});

export default AllCommande;
