const express = require("express");
const app = express();
const connectDB = require("./db/connectDB");
const productsRouter = require("./routes/products");
require("dotenv").config();

app.use(express.json());

//routes

app.use("/api/v1/products", productsRouter);

//Connect DB

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
