require("dotenv").config();
//express
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
const cors = require("cors");

//middleware
const errormiddleware = require("./Middleware/errorMiddleware");

//dotenv
const port = process.env.PORT;
const URL = process.env.MONGO_URL;
//router
const authRoutes = require("./Router/authRoutes");
const provider = require("./Router/providerRoute");

//cors
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

//api
app.use("/", authRoutes);
app.use("/", authRoutes);
app.use("/", provider);

app.use(errormiddleware);
app.listen(port, () => {
  console.log(`app is listting at port ${port}`);
  mongoose
    .connect(URL)
    .then(() => console.log("DB is connected"))
    .catch((err) => {
      console.log(err.message);
    });
});
