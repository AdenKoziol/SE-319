// Author: Aden Koziol
// ISU Netid : akoziol@iastate.edu
// Date :  April 26, 2024

const express = require("express");
const db = require("./db.js");
const cors = require("cors");
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());

// Only required for local images
//app.use(express.static("public"));
//app.use("/images", express.static("images"));

app.listen(PORT, () => {
console.log(`Server is running on ${PORT}`);
});

//Route to get all posts
app.get("/catalog", async (req, res) => {
    try {
    const query = "SELECT * FROM fakestore_catalog";
    const [result] = await db.query(query); // Execute the query and wait for the result
    console.log("Success in Reading MySQL");
    res.status(200).send(result); // Send the results as the response
    } catch (err) {
    // If an error occurs, catch it and send an appropriate error response
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: 'An error occurred while fetching items.' });
    }
});

app.get("/catalog/:id", async (req, res) => {
    try {
    // Read id from frontend
    const id = req.params.id;
    const query = "SELECT * FROM fakestore_catalog WHERE id = ?";
    const [result] = await db.query(query, [id]); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
    } catch (err) {
    // If an error occurs, catch it and send an appropriate error response
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: 'An error occurred while fetching items.' });
    }
});

app.post("/catalog", async(req, res) => {
    try {
        // Validate if body contains data
        if (!req.body || Object.keys(req.body).length === 0) {
            const msg = "POST:Bad request: No data provided.";
            console.log(msg);
            return res.status(400).send({ error: msg});
        }

        // Check if the table exists
        const [tableExists] = await db.query("SHOW TABLES LIKE 'fakestore_catalog'");
            if (tableExists.length === 0) {
            const msg = "POST:Table does not exist";
            console.log(msg);
            return res.status(404).send({error:msg});
        }

        // Check if the 'product' exists
        const itemId = req.body.id;
        const [productExists] = await db.query("SELECT * FROM fakestore_catalog WHERE id = ?", [itemId]);
        if (productExists.length > 0) {
            // Item exists
            const msg = "POST:Item already exists";
            console.log(msg);
            return res.status(409).send({error:msg});
        }

        // Proceed to add new item
        const { id, title, price, description, category, image, rating } = req.body;
        const insertSql = "INSERT INTO fakestore_catalog (id, title, price, description, category, image, rating) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const insertResult = await db.query(insertSql, [id, title, price, description, category, image, rating]);

        // success
        const msg = "POST:Success in Posting MySQL"+insertResult;
        console.log(msg);
        return res.status(200).send({success:msg});

    } catch (err) {
        const msg = "POST: An ERROR occured in Post" + err;
        console.error(msg);
        res.status(500).send({error:msg});
    }
});

// Route to delete a post
app.delete("/catalog/:id", async (req, res) => {
    try{
        /// Read id from frontend
        const itemId = req.params.id;

        // Verify if item already exists
        console.log("DELETE DELETE DELETE ",itemId);
        const [productExists] = await db.query("SELECT * FROM fakestore_catalog WHERE id = ?", [itemId]);
        if (productExists.length <= 0) {
            // Item does NOT exist
            const msg = "DELETE:Item "+itemId+" does NOT exist";
            console.log(msg);
            return res.status(409).send({error:msg});
        }

        // Proceed to delete it
        const id = req.params.id;
        const deleteResult = await db.query("DELETE FROM fakestore_catalog WHERE id= ?", id);
        
        // success
        const msg = "Success in DELETE item :"+deleteResult;
        console.log(msg);
        return res.status(200).send({success:msg});

    } catch (err) {
        // Handle any error
        const msg = "DELETE: An ERROR occurred in Delete"+err;
        console.error(msg);
        res.status(500).send({error:msg});
    }
});