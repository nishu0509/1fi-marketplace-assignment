import mongoose from "mongoose";

// EMI Plan sub-schema - each variant has its own set of EMI plans
// since monthly amount changes based on the variant's price
const emiPlanSchema = new mongoose.Schema(
  {
    tenureMonths: { type: Number, required: true }, // e.g. 3, 6, 12, 24, 36, 48, 60
    monthlyAmount: { type: Number, required: true }, // ₹ per month
    interestRate: { type: Number, required: true }, // e.g. 0 or 10.5
    cashback: { type: Number, default: 0 }, // additional cashback amount
  },
  { _id: false }
);

// Variant sub-schema - e.g. different storage/color combos of the same product
const variantSchema = new mongoose.Schema(
  {
    variantId: { type: String, required: true }, // e.g. "256gb-orange"
    label: { type: String, required: true }, // e.g. "256GB - Deep Orange"
    color: { type: String },
    storage: { type: String },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    emiPlans: { type: [emiPlanSchema], default: [] },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true }, // used for /products/:slug URL
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, default: "smartphones" },
    variants: { type: [variantSchema], validate: (v) => v.length >= 2 }, // at least 2 variants per product
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
