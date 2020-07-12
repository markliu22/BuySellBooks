// import express from "express";
// import User from "../models/userModel";
import { isAuth, isAdmin, getToken } from "../util";
const express = require("express");
const Product = require("../models/Product");

// get access to Router from express
const router = express.Router();

// Handle GET request on /api/products/
// router.get("/", async (req, res) => {
//   const allProducts = await Product.find({});
//   // const products = await Product.find({ ...searchKeyword }).sort(sortOrder); //////////////////////////////////////////////////////////
//   res.send(allProducts);
//   // res.send(products);
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  // const category = req.query.category ? { category: req.query.category } : {}; // If req.query.category exists, set category to it, else jsut use an empty object
  const category = { category: "textbooks" }; //  <<< CAN DO IT LIKE THE WAY ABOVE OR CAN ALSO DO IT THIS WAY (bc the only category is textbooks, all posting will have the category 'textbooks')
  const searchKeyword = req.query.searchKeyword
    ? // If req.query.searchKeyword exists
      {
        name: {
          $regex: req.query.searchKeyword,
          $options: "i",
        },
      }
    : {};
  // Check if req.query.sortOrder exists, if so, check if it's by lowest, if so the sortOrder is going to be based on price and -1, else going to be based on price and 1, if req.query.sortOrder does not exists, going to be based on _id and -1
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === "lowest"
      ? { price: -1 }
      : { price: 1 }
    : { _id: -1 };
  // Pass in orderOrder for sort. Deconstruct category and searchKeyword
  const products = await Product.find({ ...category, ...searchKeyword }).sort(
    sortOrder
  );
  res.send(products);
}); /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle GET request on /api/products/:id
router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  // If product exists, res.send that product
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});

// Handle POST request on /api/products/
// router.post("/", isAuth, isAdmin, async (req, res) => {
router.post("/", isAuth, async (req, res) => {
  // Create product based on data from req
  const product = Product({
    // fill in the Product info based on the info that comes from the client(req)
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description,
    sellerPhone: req.body.sellerPhone,
    sellerEmail: req.body.sellerEmail,
  });
  // Save newSavedProduct
  const newSavedProduct = await product.save();
  console.log(newSavedProduct.category);
  //if product exists, that means it's created correctly, send back data
  if (newSavedProduct) {
    return res
      .status(201)
      .send({ message: "New Product Created", data: newSavedProduct });
  }
  return res.status(500).send({ message: " Error in Creating Product." });
});

// Handle PUT request on /api/products/idHere
// router.put("/:id", isAuth, isAdmin, async (req, res) => {
router.put("/:id", isAuth, async (req, res) => {
  const productId = req.params.id;
  // Find product by its id (from request)
  const product = await Product.findById(productId);
  // if product exists, update the product based on the data from req
  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.price = req.body.price;
    product.description = req.body.description;
    product.sellerPhone = req.body.sellerPhone;
    product.sellerEmail = req.body.sellerEmail;
    // Save product
    const updatedProduct = await product.save();
    // If all ok, send updatedProduct back to the frontend
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: "Product Updated", data: updatedProduct });
    }
  }
  return res.status(500).send({ message: " Error in Updating Product." });
});

// Handle DELETE request on /api/products/idHere
// router.delete("/:id", isAuth, isAdmin, async (req, res) => {
router.delete("/:id", isAuth, async (req, res) => {
  // Find product by id (from req)
  const deletedProduct = await Product.findById(req.params.id);
  // If product exists, delete/remove it, send message
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion");
  }
});

export default router;
