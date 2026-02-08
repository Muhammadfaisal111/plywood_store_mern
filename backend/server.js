const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
dotenv.config();
connectDB();
const app = express();

app.use(express.json());
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
