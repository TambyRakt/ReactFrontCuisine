// AllCommande.tsx
import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Colors from "../src/config/Color";
import { CartContext, Commande } from "../src/context/CardContext";

const AllCommande = () => {
  const { commandes } = useContext(CartContext);

  const renderCommande = ({ item }: { item: Commande }) => {
    // Calcul du montant total de la commande
    const total = item.items.reduce(
      (acc, entry) => acc + entry.item.prix * entry.quantity,
      0
    );

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
        <Text style={styles.commandeTotal}>
          Montant total: {total.toFixed(2)}€
        </Text>
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
  commandeDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  commandeItemText: {
    fontSize: 14,
    color: Colors.text,
  },
  commandeTotal: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: Colors.text,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.textSecondary,
  },
});

export default AllCommande;
