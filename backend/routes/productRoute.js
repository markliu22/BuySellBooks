import { isAuth, getToken } from "../util";
const express = require("express");
const Product = require("../models/Product");

// get access to Router from express
const router = express.Router();

// Handle GET request on /api/products/
// router.get("/", async (req, res) => {
//   const allProducts = await Product.find({});
//   // const products = await Product.find({ ...searchKeyword }).sort(sortOrder);
//   res.send(allProducts);
//   // res.send(products);
// });

// Handle GET request on /api/products/
router.get("/", async (req, res) => {
  // const category = req.query.category ? { category: req.query.category } : {}; // If req.query.category exists, set category to it, else jsut use an empty object
  const category = { category: "textbooks" };
  const searchKeyword = req.query.searchKeyword // If req.query.searchKeyword exists
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: "i", // regex "i" = insensitivity to match upper and lower cases
        },
      }
    : {};
  // If req.query.sortOrder exists, check by lowest or not
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === "lowest"
      ? { price: -1 }
      : { price: 1 }
    : { _id: -1 };
  // Try finding products by keyword, sort, return
  const products = await Product.find({ ...category, ...searchKeyword }).sort(
    sortOrder
  );
  res.send(products);
});

// Handle GET request on /api/products/:id
router.get("/:id", async (req, res) => {
  // Find product based on id from req
  const product = await Product.findOne({ _id: req.params.id });
  // Send
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});

// Handle POST request on /api/products/
// VERIFY TOKEN WITH isAuth MIDDLEWARE FUNCTION (util.js)
router.post("/", isAuth, async (req, res) => {
  // Create product based on data from req
  const product = Product({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description,
    sellerPhone: req.body.sellerPhone,
    sellerEmail: req.body.sellerEmail,
  });
  // Save
  const newSavedProduct = await product.save();
  if (newSavedProduct) {
    // Send back
    return res
      .status(201)
      .send({ message: "New Product Created", data: newSavedProduct });
  }
  return res.status(500).send({ message: " Error in Creating Product." });
});

// Handle PUT request on /api/products/id_of_product_here
// VERIFY TOKEN WITH isAuth MIDDLEWARE FUNCTION (util.js)
router.put("/:id", isAuth, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId); // Find product by id
  // if product exists, update the product based on the data from req
  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.price = req.body.price;
    product.description = req.body.description;
    product.sellerPhone = req.body.sellerPhone;
    product.sellerEmail = req.body.sellerEmail;
    // Save
    const updatedProduct = await product.save();
    // Send back
    if (updatedProduct) {
      return res.status(200).send({
        message: "Product Updated Successfully",
        data: updatedProduct,
      });
    }
  }
  return res.status(500).send({ message: " Error in Updating Product." });
});

// Handle DELETE request on /api/products/idHere
// VERIFY TOKEN WITH isAuth MIDDLEWARE FUNCTION (util.js)
router.delete("/:id", isAuth, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id); // Find product by id
  // Delete, send
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion");
  }
});

export default router;
