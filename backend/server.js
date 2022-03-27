const express = require("express");
const dotenv = require("dotenv");
const games = require("./data/games");
const app = express();
const path = require("path");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const guideRoutes = require("./routes/guideRoutes");
const gameRoutes = require("./routes/gameRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();

app.use(express.json());

app.use(function (req, res, next) {
  const allowedDomains = [
    "http://localhost:3000",
    "http://localhost:3000/createguide",
  ];
  const origin = req.headers.origin;
  if (allowedDomains.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin); //request domain
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/games", gameRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
