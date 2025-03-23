import { TouchableOpacity, Text, StyleSheet } from "react-native";

type CategoryItemProps = {
    name: string; // The name of the category
    onPress: () => void; // The function to call when the item is pressed
  };

export default function CategoryItem({ name, onPress }: CategoryItemProps) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    backgroundColor: "#f8f8f8",
  },
  text: {
    fontSize: 16,
  },
});
