const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoMemoryServer } = require("mongodb-memory-server");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
let inMemoryMongo = null;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("College Networking API is running");
});

// API structure requested by project requirements.
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected (local/atlas)");
  } catch (_error) {
    // Beginner-friendly fallback so project still runs without local Mongo setup.
    console.warn("Could not connect to MONGO_URI. Starting in-memory MongoDB...");
    inMemoryMongo = await MongoMemoryServer.create();
    const memoryUri = inMemoryMongo.getUri();
    await mongoose.connect(memoryUri);
    console.log("MongoDB connected (in-memory fallback)");
  }
};

const startServer = async () => {
  try {
    await connectToMongo();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1);
  }
};

startServer();
