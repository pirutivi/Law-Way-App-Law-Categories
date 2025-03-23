import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Main Categories" }} />
      <Stack.Screen name="subCategories/mainCategory" options={{ title: "Sub Categories" }} />
      <Stack.Screen name="laws/mainCategory/subCategory" options={{ title: "Laws" }} />
    </Stack>
  );
}

