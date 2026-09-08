import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();

// Helper to generate a standard EMI plan ladder for a given price
// Mirrors the reference image: 3/6/12/24 months @ 0% interest, 36/48/60 months @ 10.5%
const generateEmiPlans = (price, cashback = 7500) => {
  const plans = [
    { tenureMonths: 3, interestRate: 0 },
    { tenureMonths: 6, interestRate: 0 },
    { tenureMonths: 12, interestRate: 0 },
    { tenureMonths: 24, interestRate: 0 },
    { tenureMonths: 36, interestRate: 10.5 },
    { tenureMonths: 48, interestRate: 10.5 },
    { tenureMonths: 60, interestRate: 10.5 },
  ];

  return plans.map(({ tenureMonths, interestRate }) => {
    let monthlyAmount;
    if (interestRate === 0) {
      monthlyAmount = Math.round(price / tenureMonths);
    } else {
      // simple monthly interest approximation for demo purposes
      const totalInterest = (price * interestRate * (tenureMonths / 12)) / 100;
      monthlyAmount = Math.round((price + totalInterest) / tenureMonths);
    }
    return { tenureMonths, monthlyAmount, interestRate, cashback };
  });
};

const products = [
  {
    slug: "iphone-17-pro",
    name: "iPhone 17 Pro",
    brand: "Apple",
    category: "smartphones",
    variants: [
      {
        variantId: "256gb-orange",
        label: "256GB - Deep Orange",
        color: "Deep Orange",
        storage: "256GB",
        mrp: 134900,
        price: 127400,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600",
        emiPlans: generateEmiPlans(127400),
      },
      {
        variantId: "256gb-silver",
        label: "256GB - Silver",
        color: "Silver",
        storage: "256GB",
        mrp: 134900,
        price: 127400,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600",
        emiPlans: generateEmiPlans(127400),
      },
      {
        variantId: "512gb-blue",
        label: "512GB - Cosmic Blue",
        color: "Cosmic Blue",
        storage: "512GB",
        mrp: 154900,
        price: 147400,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600",
        emiPlans: generateEmiPlans(147400),
      },
    ],
  },
  {
    slug: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "smartphones",
    variants: [
      {
        variantId: "256gb-titanium-black",
        label: "256GB - Titanium Black",
        color: "Titanium Black",
        storage: "256GB",
        mrp: 129999,
        price: 119999,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600",
        emiPlans: generateEmiPlans(119999),
      },
      {
        variantId: "512gb-titanium-gray",
        label: "512GB - Titanium Gray",
        color: "Titanium Gray",
        storage: "512GB",
        mrp: 149999,
        price: 139999,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600",
        emiPlans: generateEmiPlans(139999),
      },
    ],
  },
  {
    slug: "oneplus-12",
    name: "OnePlus 12",
    brand: "OnePlus",
    category: "smartphones",
    variants: [
      {
        variantId: "256gb-flowy-emerald",
        label: "256GB - Flowy Emerald",
        color: "Flowy Emerald",
        storage: "256GB",
        mrp: 69999,
        price: 64999,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600",
        emiPlans: generateEmiPlans(64999),
      },
      {
        variantId: "512gb-silky-black",
        label: "512GB - Silky Black",
        color: "Silky Black",
        storage: "512GB",
        mrp: 79999,
        price: 74999,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600",
        emiPlans: generateEmiPlans(74999),
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    console.log("Existing products cleared");

    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
