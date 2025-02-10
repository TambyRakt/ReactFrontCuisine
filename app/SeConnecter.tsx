import React, { useContext, useState } from "react";
import{ListeDesPlats} from "./ListeDesPlats";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../src/config/Color";

import { login } from "@/src/service/LoginService";
import { CartContext } from "@/src/context/CardContext";

const SeConnecter = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ invalidCredentials, setInvalidCredentials ] = useState(false)
  const navigation = useNavigation();

  const { setCart } = useContext(CartContext);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez renseigner l'email et le mot de passe");
      return;
    }
    console.log("Connexion avec", email, password);

    login(email, password).then(() => {
      navigation.navigate("ListeDesPlats");
    }).catch((err) => {
      setInvalidCredentials(true)
    });

    setCart([])

    // Navigation vers ListeDesPlats après connexion réussie
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se Connecter</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.placeholder}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor={Colors.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      { invalidCredentials && <Text style={styles.error}>Email ou mot de passe invalide</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Inscription")}>
        <Text style={styles.linkText}>Pas encore de compte ? Inscrivez-vous</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.cardBackground,
  },
  button: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: Colors.primary,
    fontSize: 16,
    textAlign: "center",
  },
  error: {
    color: Colors.danger,
  }
});

export default SeConnecter;
