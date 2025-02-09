import { Stack } from "expo-router";

import { navigationRef } from "../src/service/api/RootNavigation"  

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown:false }} />;
}
