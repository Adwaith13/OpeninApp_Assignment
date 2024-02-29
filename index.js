//including required packages
const express = require("express");
const bodyParser = require("body-parser");

//importing the function to connect to database
const { connectToDatabase } = require("./Models/main");

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

//starting server on a port
app.listen(3000, () => {
  console.log("Server is running on PORT: 3000");
});
