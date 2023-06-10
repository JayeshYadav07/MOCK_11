const express = require("express");
const { PostModel } = require("../models/PostModel");
const PostRoutes = express.Router();

PostRoutes.post("/", async (req, res) => {
    const { name, email, destination, traveler, budget } = req.body;
    try {
        const post = new PostModel({
            name,
            email,
            destination,
            traveler,
            budget,
        });
        await post.save();
        res.status(201).send({ msg: "Post made successfully", post });
    } catch (error) {
        res.status(500).send({
            msg: "Something went wrong.",
            error: error.message,
        });
    }
});

PostRoutes.get("/", async (req, res) => {
    try {
        const post = await PostModel.find();
        res.send({ posts: post });
    } catch (error) {
        res.status(500).send({
            msg: "Something went wrong.",
            error: error.message,
        });
    }
});

PostRoutes.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await PostModel.findByIdAndDelete(id);
        res.send({ msg: "Post deleted successfully." });
    } catch (error) {
        res.status(500).send({
            msg: "Something went wrong.",
            error: error.message,
        });
    }
});

PostRoutes.post("/filter", async (req, res) => {
    const { sortByBudget, filterByDestination } = req.body;
    if (sortByBudget != "" && filterByDestination != "") {
        const post = await PostModel.find({
            destination: filterByDestination,
        }).sort({ budget: sortByBudget });
        res.status(200).send({ post: post });
    } else if (sortByBudget != "") {
        const post = await PostModel.find().sort({ budget: sortByBudget });
        res.status(200).send({ post: post });
    } else if (filterByDestination != "") {
        const post = await PostModel.find({
            destination: filterByDestination,
        });
        res.status(200).send({ post: post });
    } else {
        const post = await PostModel.find();
        res.status(200).send({ post: post });
    }
});

module.exports = { PostRoutes };
