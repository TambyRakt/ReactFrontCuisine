import { NavigationContainerRef } from "@react-navigation/native"
import React from 'react';

// export const navigationRef = React.createRef<NavigationContainerRef>();

// export function navigate(name : string, params? : object) {
// 	console.log(navigationRef);
// 	navigationRef.current?.navigate(name, params);
// }

// export function goBack() {
// 	navigationRef.current?.goBack();
// }

import { router } from "expo-router"

export function navigate(name : string) {
	router.push(name)
}
