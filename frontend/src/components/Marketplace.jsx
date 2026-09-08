import { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/productApi";
import ProductCard from "./ProductCard";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return <p className="py-16 text-center text-sm text-gray-400">Loading products...</p>;
  }

  if (error) {
    return <p className="py-16 text-center text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="px-4 py-2 md:px-10 md:py-6">
      <h2 className="mb-3 text-lg font-bold text-gray-900 md:text-xl">1Fi Marketplace</h2>
      <p className="mb-4 text-sm text-gray-500 md:mb-6">
        Shop smartphones with EMI plans backed by mutual funds
      </p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;