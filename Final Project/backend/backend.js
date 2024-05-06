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
const dbName = "finalProject";
const client = new MongoClient(url);
const db = client.db(dbName);

// Read all products
app.get("/listProducts", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
    .collection("projectData")
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
            "name": values[1],
            "url": values[2],
            "price": values[3], 
            "datePosted": values[4],
            "poster": values[5],
            "description": values[6],
            "sport": values[7]
        };

        console.log(newDocument);
        const results = await db
        .collection("projectData")
        .insertOne(newDocument);
        res.status(200);
        res.send(results);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});

// Get a Product by id
app.get("/getProduct/:id", async (req, res) => {
    const productid = Number(req.params.id);
    console.log("Product to find :", productid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": productid };
    const results = await db.collection("projectData")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

// Update a Product maybe change more than just price
app.put("/updateProduct/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const query = { id: id };
        await client.connect();
        console.log("Product to Update:", id);

        const productToUpdate = await db.collection("projectData").findOne(query);
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
        const results = await db.collection("projectData").updateOne(query, updateData, options);
        res.status(200).send(results);
    } catch (error) {
        console.error("Error updating Product:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    } finally {
        await client.close(); 
    }
});

// Delete a Product
app.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await client.connect();
        console.log("Product to delete:", id);
        const query = { id: id };

        const productDeleted = await db.collection("projectData").findOne(query);
        if (!productDeleted) {
            return res.status(404).send({ message: 'Product not found' });
        }

        const results = await db.collection("projectData").deleteOne(query);
        res.status(200).send(results);
    } catch (error) {
        console.error("Error deleting Product:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});