const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authrouter = require("./routes/auth");
const userrouter = require("./routes/users");
const movierouter = require("./routes/movies");
const listrouter = require("./routes/list");
//seccurity packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
// const rateLimiter = require("express-rate-limit");

//Database connection
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("DB connecton Successful"))
  .catch((err) => {
    console.log(err);
  });



//middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/users", userrouter);
app.use("/api/v1/movies", movierouter);
app.use("/api/v1/lists", listrouter);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server is listening ......");
});
