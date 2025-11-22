import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Stack } from 'expo-router'
import { Colors } from '../constants/Colors'

const InitialLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.background } }}>
      <Stack.Screen name="index" />
    </Stack>
  )
}
export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  )
}