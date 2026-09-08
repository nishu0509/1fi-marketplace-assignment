import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductBySlug } from "../api/productApi";
import EMIPlanCard from "../components/EMIPlanCard";
import { formatINR } from "../utils/format";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setConfirmMessage("");
      try {
        const data = await fetchProductBySlug(slug);
        setProduct(data);
        setSelectedVariantId(data.variants[0]?.variantId ?? null);
        setSelectedPlanIndex(null);
      } catch (err) {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [slug]);

  if (loading) {
    return <p className="p-8 text-center text-gray-500">Loading product...</p>;
  }

  if (error || !product) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error}</p>
        <Link to="/" className="mt-4 inline-block text-violet-700 underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const selectedVariant = product.variants.find(
    (v) => v.variantId === selectedVariantId
  );

  const handleProceed = () => {
    if (selectedPlanIndex === null) {
      setConfirmMessage("Please select an EMI plan to proceed.");
      return;
    }
    const plan = selectedVariant.emiPlans[selectedPlanIndex];
    setConfirmMessage(
      `Proceeding with ${formatINR(plan.monthlyAmount)} x ${plan.tenureMonths} months plan for ${product.name} (${selectedVariant.label}).`
    );
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-white md:max-w-4xl">
      <header className="border-b border-gray-100 bg-white">
        <div className="px-4 py-4 md:px-8">
          <Link to="/" className="text-sm font-medium text-violet-700 hover:underline">
            &larr; Back to Marketplace
          </Link>
        </div>
      </header>

      <main className="px-4 py-6 md:px-8 md:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:gap-12">
          {/* Product image */}
          <div className="md:w-2/5 md:shrink-0">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white border border-gray-200">
              <img
                src={selectedVariant?.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Variant selector */}
            {product.variants.length > 1 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Available in {product.variants.length} variants
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.variantId}
                      onClick={() => {
                        setSelectedVariantId(v.variantId);
                        setSelectedPlanIndex(null);
                        setConfirmMessage("");
                      }}
                      className={`rounded-full border px-4 py-1.5 text-sm transition ${
                        v.variantId === selectedVariantId
                          ? "border-violet-700 bg-violet-700 text-white"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Product info + EMI plans */}
          <div className="md:flex-1">
            <span className="inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
              NEW
            </span>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
              {product.name} {selectedVariant?.storage && `- ${selectedVariant.storage}`}
            </h1>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatINR(selectedVariant?.price)}
              </span>
              {selectedVariant?.mrp > selectedVariant?.price && (
                <span className="text-gray-400 line-through">
                  {formatINR(selectedVariant.mrp)}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">EMI plans backed by mutual funds</p>

            <div className="mt-4 space-y-2">
              {selectedVariant?.emiPlans.map((plan, idx) => (
                <EMIPlanCard
                  key={idx}
                  plan={plan}
                  isSelected={selectedPlanIndex === idx}
                  onSelect={() => {
                    setSelectedPlanIndex(idx);
                    setConfirmMessage("");
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleProceed}
              className="mt-6 w-full rounded-xl bg-violet-700 py-3 font-semibold text-white transition hover:bg-violet-800"
            >
              Proceed with Selected Plan
            </button>

            {confirmMessage && (
              <p className="mt-3 text-sm text-gray-600">{confirmMessage}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
