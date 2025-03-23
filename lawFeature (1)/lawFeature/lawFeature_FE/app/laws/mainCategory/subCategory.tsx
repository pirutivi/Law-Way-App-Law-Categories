import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { getLaws } from "../../../api";
import { FontAwesome5 } from "@expo/vector-icons";

const primaryColor = "#0891b2";
const greyColor = "#737373";

export default function LawsScreen() {
  const { mainCategory, subCategory } = useLocalSearchParams();

  const [laws, setLaws] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLaws() {
      const mainCategoryStr = Array.isArray(mainCategory) ? mainCategory[0] : mainCategory;
      const subCategoryStr = Array.isArray(subCategory) ? subCategory[0] : subCategory;

      if (!mainCategoryStr || !subCategoryStr) {
        setError("Invalid category selection.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const encodedMainCategory = encodeURIComponent(mainCategoryStr);
        const encodedSubCategory = encodeURIComponent(subCategoryStr);

        const data = await getLaws(encodedMainCategory, encodedSubCategory);
        
        console.log("API Response:", data); // Debugging

        if (Array.isArray(data)) {
          setLaws(data);
        } else if (data && Array.isArray(data.laws)) {
          setLaws(data.laws);
        } else {
          setError("Invalid API response.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load laws.");
      } finally {
        setLoading(false);
      }
    }

    fetchLaws();
  }, [mainCategory, subCategory]);

  if (loading) return <ActivityIndicator size="large" color={primaryColor} />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{subCategory}</Text>

      {laws.length === 0 ? (
        <Text style={styles.noDataText}>No laws found for this subcategory.</Text>
      ) : (
        laws.map((law, index) => (
          <View key={index} style={styles.lawContainer}>
            <FontAwesome5 name="balance-scale" size={20} color={primaryColor} />
            <Text style={styles.lawText}>{law}</Text>
          </View>
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: primaryColor,
    textAlign: "center",
  },
  lawContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginVertical: 6,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    elevation: 2,
  },
  lawText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
    flex: 1,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  noDataText: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
    color: greyColor,
  },
});
