const mongoose = require("mongoose");

// Define a product Schema, it describes how a product will be saved in the mongodb database
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "textbooks", required: false },
  sellerPhone: { type: String, required: true },
  sellerEmail: { type: String, required: true },
});

// When you call mongoose.model() on a schema, Mongoose compiles a model for you.
// The .model() function makes a copy of schema. The first argument is the singular name of the collection your model is for.
// const userModel = mongoose.model("User", userSchema);
module.exports = mongoose.model("Products", productSchema);
