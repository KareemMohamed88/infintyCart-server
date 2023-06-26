const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbConnection = require("./config/conn");
const ProductRoutes = require('./Routes/ProductRoutes')
const CategoryRoutes = require("./Routes/categoryRoutes")
const UserRoutes = require("./Routes/UserRoutes")
const app = express();
dotenv.config({ path: "./config.env" });

dbConnection();
app.use(express.json());
if (process.env.ENV_MODE == "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.ENV_MODE}`);
}
app.get("/", (req, res) => {
  res.send("app runed");
});

app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/categories", CategoryRoutes);
app.use("/api/v1/users", UserRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
