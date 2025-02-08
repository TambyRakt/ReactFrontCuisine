import { ImageSourcePropType } from "react-native";
import { getAllPlat } from "../service/PlatService";


export type PlatData = {
    id: number;
    name: string; // Ajout du champ 'name'
    image: ImageSourcePropType;
    ingredients: string[];
    tempscuisson:Date;
    prix: number;
    description: string;
};

export const getPlats=() => {
    return new Promise((resolve ,reject)=>{
        getAllPlat().then((response: any) => {
            const plats: PlatData[] = response.map((plat: any) => {
                return {
                    id:plat.id,
                    name: plat.nomPlat,
                    image: require("../assets/photoplats/3.jpg"),
                    ingredients: plat.recettes.map((ingredient:any) => {
                        return ingredient.idIngredient.nomIngredient;
                        
                    }),
                    tempscuisson:plat.tempsCuisson,
                    prix: plat.prixUnitaire,
                    description: "Un délicieux poulet accompagné de riz parfumé et de légumes frais."
                }
            })
            resolve(plats);
        })
    })
}


// export const plats: Record<number, PlatData> = {
//     1: {
//         name: "Poulet et Riz Parfumé",
//         image: require("../assets/photoplats/1.jpg"),
//         ingredients: ["Poulet", "Riz", "Épices", "Légumes"],
//         prix: 12.5,
//         description: "Un délicieux poulet accompagné de riz parfumé et de légumes frais."
//     },
//     2: {
//         name: "Saumon Grillé au Citron",
//         image: require("../assets/photoplats/2.jpg"),
//         ingredients: ["Saumon", "Citron", "Aneth", "Pommes de terre"],
//         prix: 15.0,
//         description: "Saumon grillé avec une touche de citron et servi avec des pommes de terre."
//     },
//     3: {
//         name: "Pâtes à la Sauce Tomate",
//         image: require("../assets/photoplats/3.jpg"),
//         ingredients: ["Pâtes", "Tomates", "Basilic", "Parmesan"],
//         prix: 10.0,
//         description: "Pâtes italiennes avec une sauce tomate maison et du parmesan."
//     },
//     4: {
//         name: "Bœuf Bourguignon",
//         image: require("../assets/photoplats/4.jpg"),
//         ingredients: ["Bœuf", "Champignons", "Vin rouge", "Oignons"],
//         prix: 18.0,
//         description: "Un bœuf tendre mijoté au vin rouge avec des champignons."
//     },
//     5: {
//         name: "Pizza Jambon Olives",
//         image: require("../assets/photoplats/5.jpg"),
//         ingredients: ["Pizza", "Mozzarella", "Jambon", "Olives"],
//         prix: 12.0,
//         description: "Pizza savoureuse avec du jambon, de la mozzarella fondue et des olives."
//     },
//     6: {
//         name: "Poulet au Curry",
//         image: require("../assets/photoplats/6.jpg"),
//         ingredients: ["Poulet", "Curry", "Noix de coco", "Riz"],
//         prix: 14.0,
//         description: "Poulet au curry avec une sauce onctueuse à la noix de coco, servi avec du riz."
//     },
//     7: {
//         name: "Crevettes Sautées à l'Ail",
//         image: require("../assets/photoplats/7.jpg"),
//         ingredients: ["Crevettes", "Ail", "Persil", "Beurre"],
//         prix: 16.0,
//         description: "Crevettes sautées à l'ail avec une touche de persil frais."
//     },
//     8: {
//         name: "Salade Grecque",
//         image: require("../assets/photoplats/8.jpg"),
//         ingredients: ["Salade", "Tomates", "Concombre", "Feta"],
//         prix: 8.0,
//         description: "Une salade grecque fraîche et légère avec de la feta et des légumes croquants."
//     },
//     9: {
//         name: "Sandwich Jambon-Beurre",
//         image: require("../assets/photoplats/9.jpg"),
//         ingredients: ["Baguette", "Jambon", "Beurre", "Cornichons"],
//         prix: 5.0,
//         description: "Un classique sandwich jambon-beurre avec des cornichons croquants."
//     },
//     10: {
//         name: "Mousse au Chocolat",
//         image: require("../assets/photoplats/10.jpg"),
//         ingredients: ["Chocolat", "Crème", "Oeufs", "Sucre"],
//         prix: 6.0,
//         description: "Un dessert riche : la mousse au chocolat onctueuse et savoureuse."
//     },
//     11: {
//         name: "Sushi Bowl",
//         image: require("../assets/photoplats/11.jpg"),
//         ingredients: ["Riz", "Thon", "Algues", "Avocat"],
//         prix: 10.0,
//         description: "Un sushi bowl avec du thon frais et de l'avocat sur un lit de riz."
//     },
//     12: {
//         name: "Soupe Asiatique",
//         image: require("../assets/photoplats/12.jpg"),
//         ingredients: ["Légumes", "Bouillon", "Épices", "Nouilles"],
//         prix: 9.0,
//         description: "Soupe asiatique aux nouilles et légumes croquants dans un bouillon savoureux."
//     },
//     13: {
//         name: "Steak et Frites",
//         image: require("../assets/photoplats/13.jpg"),
//         ingredients: ["Steak", "Frites", "Beurre", "Herbes"],
//         prix: 20.0,
//         description: "Steak grillé parfait accompagné de frites croustillantes."
//     },
//     14: {
//         name: "Salade de Quinoa",
//         image: require("../assets/photoplats/14.jpg"),
//         ingredients: ["Quinoa", "Pois chiches", "Courgettes", "Citron"],
//         prix: 11.0,
//         description: "Salade de quinoa végétarienne avec des légumes et une touche de citron."
//     },
//     15: {
//         name: "Bruschetta",
//         image: require("../assets/photoplats/15.jpg"),
//         ingredients: ["Pain", "Tomates", "Basilic", "Huile d'olive"],
//         prix: 7.0,
//         description: "Bruschetta classique italienne avec des tomates fraîches et du basilic."
//     },
// };
