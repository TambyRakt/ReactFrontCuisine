import { Stack } from "expo-router";
import { CartProvider } from "../src/context/CardContext";


export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown:false }} />;
    </CartProvider>
  )
}
