import Product from "../models/Product.js";

// GET /api/products
// Returns a lightweight list of all products (name, brand, starting price, thumbnail)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    const list = products.map((p) => {
      const lowestPriceVariant = p.variants.reduce((min, v) =>
        v.price < min.price ? v : min
      );
      return {
        id: p._id,
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        startingPrice: lowestPriceVariant.price,
        image: lowestPriceVariant.image,
        variantCount: p.variants.length,
      };
    });

    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/products/:slug
// Returns full product detail including all variants and their EMI plans
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
