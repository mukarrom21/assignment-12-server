// require
const express = require("express");
const cors = require("cors");
// const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
// express
const app = express();
// port
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

// connect with mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fhqdpjy.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// ----------------------------------------
async function run() {
  try {
    await client.connect();
    const productCollection = client.db("assignment_12").collection("products");
    const orderCollection = client.db("assignment_12").collection("orders");
    const reviewCollection = client.db("assignment_12").collection("reviews");
    // get api --------------------------
    app.get("/products", async (req, res) => {
      const products = await productCollection.find().toArray();
      res.send(products);
    });
    // Read one data from database (search data by id)
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });
    // Post api
    // add new data to database (create)
    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    });
    //Post Order information---------------------
    app.get("/orders", async (req, res) => {
      const products = await orderCollection.find().toArray();
      res.send(products);
    });
    app.post("/orders", async (req, res) => {
      const newOrder = req.body;
      const result = await orderCollection.insertOne(newOrder);
      res.send(result);
    });
// ---------- review api --------------
    app.post("/reviews", async (req, res) => {
      const newReviews = req.body;
      const result = await reviewCollection.insertOne(newReviews);
      res.send(result);
    });


    // ==========================
  } finally {
  }
}
run().catch(console.dir);

// Check in the browser https://mmh12.herokuapp.com
app.get("/", (req, res) => {
  res.send("assignment 12 running");
});
// listen the port
app.listen(port, () => {
  console.log("mmh12", port);
});
