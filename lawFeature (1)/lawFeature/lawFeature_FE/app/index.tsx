import { useEffect, useState } from "react";
import { ScrollView, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, View } from "react-native";
import { getMainCategories } from "../api";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const primaryColor = "#0891b2";
const greyColor = "#737373";

export default function MainCategoriesScreen() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getMainCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) return <ActivityIndicator size="large" color={primaryColor} />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Main Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.category}
            onPress={() =>
              router.push({
                pathname: "/subCategories/mainCategory",
                params: { mainCategory: item },
              })
            }
          >
            <AntDesign name="appstore1" size={26} color={greyColor} />
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
