import mongoose from "mongoose";

const emiPlanSchema = new mongoose.Schema(
  {
    tenureMonths: { type: Number, required: true }, 
    monthlyAmount: { type: Number, required: true }, 
    interestRate: { type: Number, required: true }, 
    cashback: { type: Number, default: 0 }, 
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    variantId: { type: String, required: true }, 
    label: { type: String, required: true }, 
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
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, default: "smartphones" },
    variants: { type: [variantSchema], validate: (v) => v.length >= 2 }, 
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
