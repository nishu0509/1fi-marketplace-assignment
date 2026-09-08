import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_BASE_URL });

// Fetch lightweight list of all products for the shop/listing page
export const fetchAllProducts = async () => {
  const res = await api.get("/products");
  return res.data.data;
};

// Fetch full detail (variants + EMI plans) for a single product by its slug
export const fetchProductBySlug = async (slug) => {
  const res = await api.get(`/products/${slug}`);
  return res.data.data;
};
