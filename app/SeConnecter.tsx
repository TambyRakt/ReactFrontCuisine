import React, { useState } from "react";
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

const SeConnecter = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez renseigner l'email et le mot de passe");
      return;
    }
    console.log("Connexion avec", email, password);
    // Navigation vers ListeDesPlats après connexion réussie
    navigation.navigate("ListeDesPlats");
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
});

export default SeConnecter;
