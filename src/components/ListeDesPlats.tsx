import React, { useState, useLayoutEffect, useContext } from "react";
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
import { LinearGradient } from "expo-linear-gradient"; // Manafatra LinearGradient ho an'ny background misy dégradé
import { plats } from "../data/Image"; 
import { useNavigation } from "@react-navigation/native"; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; 
import { RootStackParamList, PlatData } from "../../app/index"; // Manafatra ny types RootStackParamList sy PlatData avy amin'ny rakitra index
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../context/CardContext"; 

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "ListeDesPlats">; // Mamorona type "NavigationProp" ho an'ny pejy "ListeDesPlats"

const ListeDesPlats = () => { // Mamorona ny component ListeDesPlats
  const [search, setSearch] = useState(""); // Mamorona state "search" manomboka amin'ny string foana, ampiasaina amin'ny fikarohana
  const [maxPrix, setMaxPrix] = useState<number | null>(null); // Mamorona state "maxPrix" ho an'ny vidiny ambony indrindra; null raha tsy voafaritra
  const navigation = useNavigation<NavigationProp>(); // Maka ny object navigation avy amin'ny hook useNavigation
  const { addToCart } = useContext(CartContext); // Maka ny function "addToCart" avy amin'ny CartContext

  // Mampiasa useLayoutEffect mba hametrahana ny options ao amin'ny header (tapaka eo an-tampony)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => ( // Mamorona singa ho an'ny faritra havanana amin'ny header
        <TouchableOpacity onPress={() => navigation.navigate("MonPanier")}>
          {/* Raha tsindriana ity, dia mandeha any amin'ny pejy "MonPanier" */}
          <Ionicons 
            name="cart"           // Anaran'ny icon: "cart"
            size={24}             // Habe: 24
            color={Colors.textSecondary} // Loko: avy amin'ny Colors.textSecondary
            style={{ marginRight: 16 }}  // Manampy margin havanana 16
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]); // Mihazakazaka rehefa miova ny navigation

  // Mandamina sy manivana ny lisitry ny plats araka ny teny fikarohana sy ny maxPrix
  const platsFiltres = Object.values(plats).filter(
    (plat) =>
      plat.name.toLowerCase().includes(search.toLowerCase()) && // Manamarina raha misy ny teny fikarohana ao amin'ny anaran'ny plat (tsy misy case-sensitive)
      (maxPrix === null || plat.prix <= maxPrix) // Raha tsy voafaritra ny maxPrix na raha latsaka na mitovy amin'ny maxPrix ny vidiny
  );

  return ( // Mamerina ny vokatra (render) ny component
    <LinearGradient
      colors={[Colors.gradientStart, Colors.gradientEnd]} // Manampy dégradé amin'ny background amin'ny alalan'ny loko manomboka sy mifarana
      style={styles.gradientBackground} // Mampihatra ny style "gradientBackground"
    >
      <View style={styles.container}> 
        {/* Container lehibe amin'ny pejy */}
        <Text style={styles.titre}>Recherche de Plats</Text> 
        {/* Lohateny eo afovoany amin'ny pejy */}
        <View style={styles.searchRow}>
          {/* Andalana misy ireo inputs fikarohana sy filtre */}
          <TextInput
            style={styles.input} // Mampihatra ny style "input"
            placeholder="Rechercher un plat" // Soratra fanazavana rehefa tsy misy soratra
            placeholderTextColor={Colors.placeholder} // Loko ny soratra placeholder
            value={search} // Ny sanda ankehitriny amin'ny state "search"
            onChangeText={setSearch} // Raha miova ny soratra, dia havaozina ny "search"
          />
          <TextInput
            style={styles.input} // Mampihatra ny style "input"
            placeholder="Filtrer par prix max" // Soratra fanazavana ho an'ny filtre vidiny
            placeholderTextColor={Colors.placeholder} // Loko ny soratra placeholder
            keyboardType="numeric" // Mampiseho clavier nomerao ho an'ny fidirana isa
            value={maxPrix?.toString() || ""} // Raha misy "maxPrix", aseho amin'ny endrika string; raha tsy misy, string foana
            onChangeText={(value) =>
              setMaxPrix(value ? parseFloat(value) : null) // Ovaina ho isa (float) raha misy, raha tsy izany dia null
            }
          />
        </View>
        <FlatList
          data={platsFiltres} // Ny angon-drakitra aseho dia avy amin'ny lisitra "platsFiltres"
          keyExtractor={(item) => item.name} // Mampiasa ny "item.name" ho identifier tokana (key)
          renderItem={({ item }) => ( // Manamboatra ny fomba hisehoan'ny tsirairay amin'ny lisitra
            <View style={styles.card}>
              {/* Card manokana ho an'ny plat tsirairay */}
              <Image style={styles.image} source={item.image} />
              {/* Aseho ny sary amin'ny plat */}
              <View style={styles.rowContainer}>
                {/* Container misy ny antsipirian'ny plat sy ny bokotra */}
                <View style={styles.infoContainer}>
                  {/* Container ho an'ny fanazavana: anarana sy vidiny */}
                  <Text style={styles.nomPlat}>{item.name}</Text>
                  {/* Aseho ny anaran'ny plat */}
                  <Text style={styles.prixPlat}>{item.prix} €</Text>
                  {/* Aseho ny vidiny amin'ny plat */}
                </View>
                <View style={styles.buttonsContainer}>
                  {/* Container misy ny bokotra "Voir plus" sy "Acheter" */}
                  <TouchableOpacity
                    style={styles.buttonVoirPlus} // Style ho an'ny bokotra "Voir plus"
                    onPress={() => {
                      navigation.navigate("Voirplus", { item });
                      // Raha tsindriana ny bokotra "Voir plus", dia mandeha any amin'ny pejy "Voirplus" miaraka amin'ny antsipiriany (item)
                    }}
                  >
                    <Text style={styles.buttonText}>Voir plus</Text>
                    {/* Soratra "Voir plus" ao anaty bokotra */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonAcheter} // Style ho an'ny bokotra "Acheter"
                    onPress={() => {
                      addToCart(item);               // Manampy ny plat ao anaty panier amin'ny alalan'ny addToCart
                      navigation.navigate("MonPanier"); // Mivezivezy avy hatrany any amin'ny pejy "MonPanier"
                    }}
                  >
                    <Text style={styles.buttonText}>Acheter</Text>
                    {/* Soratra "Acheter" ao anaty bokotra */}
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
  gradientBackground: { // Style ho an'ny background misy dégradé
    flex: 1, // Maka ny habaka feno amin'ny efijery
  },
  container: { // Style ho an'ny container fototra
    flex: 1, // Maka ny habaka feno
    padding: 16, // Manampy padding 16 eo amin'ny sisiny
  },
  titre: { // Style ho an'ny lohateny
    fontSize: 26, // Habe ny soratra 26
    fontWeight: "bold", // Soratra matevina (bold)
    color: Colors.text, // Loko ny soratra avy amin'ny Colors.text
    marginBottom: 16, // Margin ambany 16
    textAlign: "center", // Asiana eo afovoany ny soratra
  },
  searchRow: { // Style ho an'ny andalana misy ny inputs
    flexDirection: "row", // Alefa amin'ny laharana (row)
    justifyContent: "space-between", // Zaraina eo amin'ny sisiny roa
    gap: 12, // Elanelana 12 eo anelanelan'ny components
    marginBottom: 16, // Margin ambany 16
  },
  input: { // Style ho an'ny input (TextInput)
    height: 40, // Haavony 40
    borderColor: Colors.border, // Loko ny sisiny avy amin'ny Colors.border
    borderWidth: 1, // Sakan'ny sisiny 1
    borderRadius: 8, // Zoro boribory 8
    paddingHorizontal: 12, // Padding eo amin'ny lafiny havanana sy havia 12
    flex: 1, // Maka habaka feno ao amin'ny row
    backgroundColor: Colors.cardBackground, // Loko aorian'ny card avy amin'ny Colors.cardBackground
    fontSize: 14, // Habe ny soratra 14
  },
  card: { // Style ho an'ny card manokana amin'ny plat tsirairay
    backgroundColor: Colors.cardBackground, // Loko amin'ny card
    borderRadius: 12, // Zoro boribory 12
    overflow: "hidden", // Raha mihoatra ny sisiny, dia tapahina
    borderColor: Colors.border, // Loko ny sisiny avy amin'ny Colors.border
    borderWidth: 1, // Sakan'ny sisiny 1
    marginBottom: 16, // Margin ambany 16
    elevation: 4, // Elevation 4 ho an'ny Android
    shadowColor: Colors.shadow, // Loko ny aloka avy amin'ny Colors.shadow
    shadowOffset: { width: 0, height: 2 }, // Fandrefesana ny aloka: tsy misy amin'ny lafiny horizontal, 2 amin'ny vertical
    shadowOpacity: 0.2, // Hakitroky ny aloka 0.2
    shadowRadius: 4, // Radius ny aloka 4
  },
  image: { // Style ho an'ny sary
    width: "100%", // Sakany feno (100% ny container)
    height: 180, // Haavo 180
    resizeMode: "cover", // Asehoy amin'ny fomba cover mba hifanaraka tsara ny sary
  },
  rowContainer: { // Style ho an'ny container misy ny antsipiriany sy bokotra
    flexDirection: "row", // Alefa amin'ny laharana
    justifyContent: "space-between", // Zaraina amin'ny sisiny roa
    alignItems: "center", // Asiana eo afovoan'ny axis vertical
    padding: 12, // Padding 12 manodidina
  },
  infoContainer: { // Style ho an'ny container misy ny fanazavana (anarana sy vidiny)
    flex: 1, // Maka habaka feno
    marginRight: 12, // Margin havanana 12
  },
  nomPlat: { // Style ho an'ny anaran'ny plat
    fontSize: 18, // Habe 18 ny soratra
    fontWeight: "bold", // Soratra matevina
    color: Colors.text, // Loko avy amin'ny Colors.text
    marginBottom: 4, // Margin ambany 4
  },
  prixPlat: { // Style ho an'ny vidiny
    fontSize: 16, // Habe 16 ny soratra
    color: Colors.textSecondary, // Loko avy amin'ny Colors.textSecondary
  },
  buttonsContainer: { // Style ho an'ny container misy ny bokotra
    flexDirection: "row", // Alefa amin'ny laharana
    gap: 8, // Elanelana 8 eo anelanelan'ny bokotra
  },
  buttonVoirPlus: { // Style ho an'ny bokotra "Voir plus"
    backgroundColor: Colors.textSecondary, // Loko avy amin'ny Colors.textSecondary
    paddingVertical: 6, // Padding ambony sy ambany 6
    paddingHorizontal: 14, // Padding amin'ny lafiny havanana sy havia 14
    borderRadius: 8, // Zoro boribory 8
  },
  buttonAcheter: { // Style ho an'ny bokotra "Acheter"
    backgroundColor: Colors.text, // Loko avy amin'ny Colors.text
    paddingVertical: 6, // Padding ambony sy ambany 6
    paddingHorizontal: 14, // Padding amin'ny lafiny havanana sy havia 14
    borderRadius: 8, // Zoro boribory 8
  },
  buttonText: { // Style ho an'ny lahatsoratra ao anaty bokotra
    color: Colors.buttonText, // Loko avy amin'ny Colors.buttonText
    fontSize: 12, // Habe 12 ny soratra
    fontWeight: "bold", // Soratra matevina
    textAlign: "center", // Asiana eo afovoany ny lahatsoratra
  },
});

export default ListeDesPlats; // Alefa export ny component ListeDesPlats
