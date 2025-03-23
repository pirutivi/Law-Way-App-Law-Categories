import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { getSubCategories } from "../../api";
import { AntDesign } from "@expo/vector-icons";

type SubCategory = {
  name: string;
  id: string;
};

const primaryColor = "#0891b2";
const greyColor = "#737373";

export default function SubCategoriesScreen() {
  const { mainCategory } = useLocalSearchParams();
  const router = useRouter();

  // Ensure mainCategory is always a string
  const mainCategoryStr = Array.isArray(mainCategory) ? mainCategory[0] : mainCategory;

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubCategories() {
      if (!mainCategoryStr) {
        setError("Main category is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log(`Fetching subcategories for: ${mainCategoryStr}`);

        // Ensure category is encoded properly
        const encodedCategory = encodeURIComponent(mainCategoryStr);
        const data = await getSubCategories(encodedCategory);

        console.log("API Response:", data); // Debugging

        if (Array.isArray(data)) {
          setSubCategories(data.map((name, index) => ({ id: String(index), name })));
        } else {
          setError("Invalid API response format.");
        }
      } catch (err: any) {
        console.error("Error fetching subcategories:", err);
        setError("Network error: Failed to load subcategories.");
      } finally {
        setLoading(false);
      }
    }
    fetchSubCategories();
  }, [mainCategoryStr]);

  if (loading) return <ActivityIndicator size="large" color={primaryColor} />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Subcategories of {mainCategoryStr}</Text>
      {subCategories.length === 0 ? (
        <Text style={styles.noDataText}>No subcategories found.</Text>
      ) : (
        subCategories.map((sub) => (
          <TouchableOpacity
            key={sub.id}
            onPress={() =>
              router.push({
                pathname: "/laws/mainCategory/subCategory",
                params: { mainCategory: mainCategoryStr, subCategory: sub.name },
              })
            }
            style={styles.category}
          >
            <AntDesign name="folderopen" size={26} color={greyColor} />
            <Text style={styles.text}>{sub.name}</Text>
          </TouchableOpacity>
        ))
      )}
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
  noDataText: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
});
