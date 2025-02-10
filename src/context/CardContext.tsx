// src/context/CartContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { PlatData } from "../../app/index";
import { addpanier, addCommande as serviceAddCommande, getAllPanier, getAllCommande } from "../service/PlatService";

// Définition du type Commande
export interface Commande {
  id: number;
  // Pour chaque ligne de commande, on stocke l'item et sa quantité
  items: { item: PlatData; quantity: number }[];
  date: Date;
}

type CartContextType = {
  cart: PlatData[];
  addToCart: (item: PlatData) => Promise<Awaited<any>>;
  removeFromCart: (index: number) => void;
  commandes: Commande[];
  addCommande: (commande: Commande) => void;
  setCart: (cart : PlatData[]) => void;
  getUserCart: () => void;
  getUserCommande: () => void
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: async () => Promise.resolve(),
  removeFromCart: () => {},
  commandes: [],
  addCommande: () => {},
  setCart: () => {},
  getUserCart: () => {},
  getUserCommande: () => {}
});

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<PlatData[]>([]);
  const [commandes, setCommandes] = useState<Commande[]>([]);

  const addToCart = (item: PlatData) => {
    console.log("DISODIJSODIJD")
    return new Promise((resolve, reject) => {
      // Exemple d'appel au service pour ajouter un item au panier
      setCart((prevCart) => [...prevCart, item]);
      addpanier(1, item.id, 1).then((data) => {
        resolve(null);
      });
    })
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

  const setCartValues = (cart : PlatData[]) => {
    setCart(cart)
  }

  const getUserCart = () => {
    getAllPanier().then((data : any) => {
      console.log(data)

      let newCart : PlatData[] = data.map((cartItem : any) => {
        return {
          id: cartItem.id,
          name: cartItem.idPlat.nomPlat,
          image: cartItem.idPlat.Images,
          ingredients: cartItem.idPlat.recettes.map((recette : any) => { return recette.idIngredient.nomIngredient }),
          tempscuisson: cartItem.idPlat.tempsCuisson,
          prix: cartItem.idPlat.prixUnitaire,
          description: "",
        }
      })

      setCart(newCart)
    })
  }

  const getUserCommande = () => {
    getAllCommande().then((data : any) => {
      let commandeData : Commande[] = data.map((commandeItem : any) => {
        return {
          // id: number;
          // // Pour chaque ligne de commande, on stocke l'item et sa quantité
          // items: { item: PlatData; quantity: number }[];
          // date: Date;
          id: commandeItem.id,
          date: new Date(commandeItem.dateCommande),
          items: commandeItem.detailCommandes.map((dCommandeItem : any) => {
            return {
              quantity: dCommandeItem.quantite,
              item: {
                id: dCommandeItem.idPlat.id,
                name: dCommandeItem.idPlat.nomPlat,
                image: dCommandeItem.idPlat.Images,
                ingredients: dCommandeItem.idPlat.recettes.map((recette : any) => { return recette.idIngredient.nomIngredient }),
                tempscuisson: dCommandeItem.idPlat.tempsCuisson,
                prix: dCommandeItem.idPlat.prixUnitaire,
                description: "",
              }
            }
          })
        }
      })

      setCommandes(commandeData)
    })
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, commandes, addCommande, setCart: setCartValues, getUserCart, getUserCommande }}
    >
      {children}
    </CartContext.Provider>
  );
};
