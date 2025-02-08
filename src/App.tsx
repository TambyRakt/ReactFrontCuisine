// src/App.tsx
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ListeDesPlats from "./components/ListeDesPlats";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ListeDesPlats />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
