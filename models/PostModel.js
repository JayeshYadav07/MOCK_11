const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    traveler: {
        type: Number,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
});
const PostModel = mongoose.model("Post", postSchema);

module.exports = { PostModel };
