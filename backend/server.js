require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


connectDB();

app.use(express.json());
app.use("/api/leads", leadRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("CRM Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("api/leads", leadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});