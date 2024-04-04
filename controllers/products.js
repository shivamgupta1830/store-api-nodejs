const Product = require("../models/products");

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
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

  let result = Product.find(queryObject);

  //Sort

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //fields

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  //pagination
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  //final result

  const products = await result;

  res
    .status(200)
    .json({ msg: "success", total_results: products.length, products });
};

module.exports = {
  getAllProducts,
};
