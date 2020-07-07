import express from "express";
import data from "./data";

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  // Find product with id that matches url parameter
  const product = data.products.find((x) => x._id === productId);
  // If product exists
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product Not Found" });
  }
});

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
