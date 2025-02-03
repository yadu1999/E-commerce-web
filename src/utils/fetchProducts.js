import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");

    return response.data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      lastPrice: (product.price * 1.2).toFixed(2), // Adding 20% to price for lastPrice
      img: product.image, // Using API image
      quantity: 1, // Default quantity
      category: product.category.charAt(0).toUpperCase() + product.category.slice(1), // Capitalize category
    }));
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
};
