const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();

const DB = process.env.DB_URL;

mongoose.connect(DB, {});

const { Schema } = mongoose;

const ProductsSchema = new Schema(
    {
        img: {
            type: String,
        },
        name: {
            type: String,
        },
        price:{
            type :Number
        },
        category: {
            type: String,
        },
        detailimg: {
            type: String,
        },
        rating: {
            type: Number,
        },
        description: {
            type: String,
        },
        bedrooms:{
            type: Number
        },
        bathrooms: {
            type: Number,
        },
        area: {
            type: String,
        },
        floor: {
            type: Number,
        },
        parking: {
            type: String,
        },
    },
    { timestamps: true }
);

const Products = mongoose.model("products", ProductsSchema);
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/products", async (req, res) => {
    try {
        const get = await Products.find({});
        res.send(get);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const getId = req.params.id;
        const getProductsId = await Products.findById(getId);
        res.send(getProductsId);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

app.post("/products", (req, res) => {
    const getBody = req.body;
    const postProducts = new Products(getBody);
    postProducts.save();
    res.send(postProducts);
});

app.delete("/products/:id", async (req, res) => {
    try {
        const deletBody = req.params.id;
        const deletProducts = await Products.findByIdAndDelete(deletBody);
        res.send(deletProducts);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

app.put("/products/:id", async (req, res) => {
    try {
        const updateId = req.params.id;
        const updatedUser = req.body
        const result = await Products.findByIdAndUpdate(updateId, updatedUser, { new: true });
        res.send(result);
    } catch (err) {
        res.status(404).json({ message: "Not exist" });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});