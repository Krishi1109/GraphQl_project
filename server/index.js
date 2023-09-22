const express = require("express");
const colors = require("colors")
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schema/schema");
const connectDB = require("./config/db")
const port = process.env.PORT || 8000;

const app = express();

// connect to DB
connectDB()

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, (re, res) => {
  console.log("Server is running on port : ", port);
});
