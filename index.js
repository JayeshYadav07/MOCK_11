const express = require("express");
const cors = require("cors");
const { PostRoutes } = require("./routes/PostRoutes.js");

const { connection } = require("./config/db");

require("dotenv").config();
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/post", PostRoutes);

app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to database");
        console.log(`Example app listening on port ${port}!`);
    } catch (error) {
        console.log(error);
    }
});
