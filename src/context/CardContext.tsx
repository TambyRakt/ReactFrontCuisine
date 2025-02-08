// src/context/CartContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { PlatData } from "../../app/index";
import { addpanier, addCommande as serviceAddCommande } from "../service/PlatService";

// Définition du type Commande
export interface Commande {
  id: number;
  // Pour chaque ligne de commande, on stocke l'item et sa quantité
  items: { item: PlatData; quantity: number }[];
  date: Date;
}

type CartContextType = {
  cart: PlatData[];
  addToCart: (item: PlatData) => void;
  removeFromCart: (index: number) => void;
  commandes: Commande[];
  addCommande: (commande: Commande) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  commandes: [],
  addCommande: () => {},
});

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<PlatData[]>([]);
  const [commandes, setCommandes] = useState<Commande[]>([]);

  const addToCart = (item: PlatData) => {
    // Exemple d'appel au service pour ajouter un item au panier
    addpanier(1, item.id, 1);
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // La fonction addCommande du contexte appelle directement le service addCommande
  const addCommande = async (commande: Commande) => {
    try {
      // Appel du service en passant l'id du client (ici, 1)
      const response = await serviceAddCommande(1);
      console.log("Commande envoyée au service :", response);

      // Mise à jour locale : ajout de la commande et vidage du panier
      setCommandes((prevCommandes) => [...prevCommandes, commande]);
      setCart([]);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la commande", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, commandes, addCommande }}
    >
      {children}
    </CartContext.Provider>
  );
};
