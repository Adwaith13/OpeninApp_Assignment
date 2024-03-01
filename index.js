//including required packages
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

//importing the function to connect to database
const { connectToDatabase } = require("./models/main");

//importing routes
const userAuth = require("./routes/auth");
const task = require("./routes/task");
const subtask = require("./routes/subtask");

dotenv.config();
//invoking the express function
const app = express();

//body parser package to parse the incoming data eg: form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connecting the database
connectToDatabase();

//health server
app.get("/", (req, res) => {
  res.json({ status: "good", message: "server is working" });
});

//routes
app.use("/", userAuth);
app.use("/", task);
app.use("/", subtask);

//starting server on a port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});
