// import express from "express";
// import User from "../models/userModel";
import { isAuth, isAdmin, getToken } from "../util";
const express = require("express");
const Product = require("../models/Product");

// get access to Router from express
const router = express.Router();

// Handle GET request on /api/products/
router.get("/", async (req, res) => {
  const allProducts = await Product.find({});
  res.send(allProducts);
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
