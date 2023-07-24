const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

app.get("/put", async (req, res) => {
  //insert bulk data
  const data = [
    {
      name: "Samsung Galaxy S10",
    },
    {
      name: "Samsung Galaxy S10+",
    },
    {
      name: "Samsung Galaxy S10e",
    },
  ];

  await Product.insertMany(data);

  res.status(200).json({
    message: "Data inserted successfully",
  });
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    data: products,
  });
});

console.log("mongodb://localhost:27017/ecommerce");
mongoose
  .connect(`mongodb://localhost:27017/ecommerce`)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Connection failed!", err);
  });

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
