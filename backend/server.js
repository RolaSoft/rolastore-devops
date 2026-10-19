
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rolastore";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    application: "RolaStore API",
    status: "running"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "rolastore-api"
  });
});

app.get("/api/products", async (req, res) => {
  res.json([
    {
      id: 1,
      name: "Laptop",
      price: 300000
    },
    {
      id: 2,
      name: "Smartphone",
      price: 150000
    },
    {
      id: 3,
      name: "Wireless Headset",
      price: 25000
    }
  ]);
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`RolaStore API running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

