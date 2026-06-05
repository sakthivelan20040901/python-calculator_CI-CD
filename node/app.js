const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.static("public"));

app.get("/api/products", async (req, res) => {

    const products =
        await axios.get("http://java:8080/products");

    res.json(products.data);
});

app.get("/api/product/:id", async (req, res) => {

    const id = req.params.id;

    try {

        const product =
            await axios.get(`http://java:8080/products/${id}`);

        const inventory =
            await axios.get(`http://go:8081/inventory/${id}`);

        const recommendation =
            await axios.get(`http://python:5000/recommend/${id}`);

        const billing =
    await axios.get(
        `http://php/?price=${product.data.price}`
    );

        res.json({
            product: product.data,
            inventory: inventory.data,
            recommendation: recommendation.data,
            billing: billing.data
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

app.listen(3000, () => {
    console.log("Gateway Running");
});