// src/App.tsx
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { navigationRef } from "./service/api/RootNavigation"

// Components
import ListeDesPlats from "./components/ListeDesPlats";
import SeConnecter from "./components/SeConnecter";

const Stack = createNativeStackNavigator();

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
