var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

const { MongoClient } = require("mongodb");

// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

// Read all products
app.get("/listProducts", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
    .collection("fakestore_catalog")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

// Create a new product
app.post("/addProduct", async (req, res) => {
    try {
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        const newDocument = {
            "id": values[0],
            "title": values[1],
            "price": values[2],
            "description": values[3], 
            "category": values[4],
            "image": values[5],
            "rating": values[6]
        };
        console.log(newDocument);
        const results = await db
        .collection("fakestore_catalog")
        .insertOne(newDocument);
        res.status(200);
        res.send(results);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});

// Update price of a product
app.put("/updateProduct/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const query = { id: id };
        await client.connect();
        console.log("Product to Update:", id);

        const productToUpdate = await db.collection("fakestore_catalog").findOne(query);
        if (!productToUpdate) {
            return res.status(404).send({ message: 'Product not found' });
        }
        console.log(req.body);
        
        const updateData = {
            $set: {
                "price": req.body.price
            }
        };

        const options = {};
        const results = await db.collection("fakestore_catalog").updateOne(query, updateData, options);
        res.status(200).send(results);
    } catch (error) {
        console.error("Error updating Product:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    } finally {
        await client.close(); 
    }
});

// Delete a product
app.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await client.connect();
        console.log("Product to delete:", id);
        const query = { id: id };

        const productDeleted = await db.collection("fakestore_catalog").findOne(query);
        if (!productDeleted) {
            return res.status(404).send({ message: 'Product not found' });
        }

        const results = await db.collection("fakestore_catalog").deleteOne(query);
        res.status(200).send(results);
    } catch (error) {
        console.error("Error deleting Product:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});

// Get a Product
app.get("/getProduct/:id", async (req, res) => {
    const productid = Number(req.params.id);
    console.log("Product to find :", productid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": productid };
    const results = await db.collection("fakestore_catalog")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});