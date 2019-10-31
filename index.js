// code away!
const express = require("express");
const app = express();
const postRouter = require("./postRouter");
const userRouter = require("./userRouter");

app.use(express.json(), logger);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

const logger = (req, res, next) => {
    console.log(`req.method = ${req.method}\nreq.url = ${req.url}\ntimestamp=${Date.now}`)
    next();
}