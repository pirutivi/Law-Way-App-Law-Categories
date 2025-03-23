const BASE_URL = "http://10.31.37.145:8080/laws";


export const getMainCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/main-categories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching main categories:", error);
    throw error;
  }
};

export const getSubCategories = async (mainCategory: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${mainCategory}/subcategories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching subcategories for ${mainCategory}:`, error);
    throw error;
  }
};

export const getLaws = async (mainCategory: string, subCategory: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${mainCategory}/${subCategory}/laws`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching laws for ${mainCategory} > ${subCategory}:`, error);
    throw error;
  }
};