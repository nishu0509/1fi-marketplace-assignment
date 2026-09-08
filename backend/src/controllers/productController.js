import Product from "../models/Product.js";

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
