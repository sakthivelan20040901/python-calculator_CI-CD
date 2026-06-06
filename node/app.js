const express = require("express");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("./db");

const app = express();

app.use(express.json());
app.use(express.static("public"));

/* ---------- PRODUCT APIs ---------- */

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
                `http://php/?price=${product.data.price}&category=${product.data.category}`
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

/* ---------- SIGNUP ---------- */

app.post("/signup", async (req, res) => {

    try {

        const {
            username,
            email,
            password
        } = req.body;

        const hash =
            await bcrypt.hash(password, 10);

        await db.execute(
            `INSERT INTO users
            (username,email,password_hash)
            VALUES (?,?,?)`,
            [username, email, hash]
        );

        res.json({
            success: true,
            message: "Account created"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });
    }
});

/* ---------- LOGIN ---------- */

app.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const [rows] =
            await db.execute(
                "SELECT * FROM users WHERE email=?",
                [email]
            );

        if (rows.length === 0) {

            return res.status(401).json({
                error: "User not found"
            });
        }

        const user = rows[0];

        const valid =
            await bcrypt.compare(
                password,
                user.password_hash
            );

        if (!valid) {

            return res.status(401).json({
                error: "Invalid password"
            });
        }

        const token =
            jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                "polyshop-secret"
            );

        res.json({
    success: true,
    token,
    user: {
        id: user.id,
        username: user.username,
        email: user.email
    }
});

    } catch (err) {

        res.status(500).json({
            error: err.message
        });
    }
});

app.get("/orders/:userId", async (req,res)=>{

    const [orders] =
        await db.execute(

            `
            SELECT *
            FROM orders
            WHERE user_id = ?
            ORDER BY id DESC
            `,

            [req.params.userId]
        );

    res.json(orders);
});
app.post("/place-order", async (req, res) => {

    try {

        const {
            userId,
            cart,
            address
        } = req.body;

        for(const item of cart){

            await db.execute(

                `
                INSERT INTO orders
                (
                    user_id,
                    product_name,
                    amount,
                    address
                )
                VALUES
                (
                    ?,?,?,?
                )
                `,

                [
                    userId,
                    item.name,
                    item.price,
                    address
                ]
            );
        }

        res.json({
            success:true,
            message:"Order Placed"
        });

    } catch(err){

        res.status(500).json({
            error:err.message
        });
    }
});

/* ---------- START SERVER ---------- */

app.listen(3000, () => {

    console.log("Gateway Running");

});