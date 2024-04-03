const Product = require("../models/products");

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured;
    // queryObject.featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
  res
    .status(200)
    .json({ msg: "success", total_results: products.length, products });
};

const getSingleProduct = async (req, res) => {
  res.status(200).json({ msg: "success", data: "Single product" });
};

const updateProduct = async (req, res) => {
  res.status(200).json({ msg: "success", data: "update product" });
};
const deleteProduct = async (req, res) => {
  res.status(200).json({ msg: "success", data: "delete product" });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
