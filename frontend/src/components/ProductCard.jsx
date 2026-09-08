import { Link } from "react-router-dom";
import { formatINR } from "../utils/format";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-4 transition hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {product.brand}
        </p>
        <h3 className="mt-1 text-base font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {product.variantCount} variant{product.variantCount > 1 ? "s" : ""} available
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900">
          From {formatINR(product.startingPrice)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
