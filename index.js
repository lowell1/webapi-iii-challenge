// code away!
const express = require("express");
const app = express();
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const logger = (req, res, next) => {
    console.log(`req.method = ${req.method}\nreq.url = ${req.url}\ntimestamp=${Date.now()}`)
    next();
}

app.use(express.json(), logger);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.listen(8000, () => console.log("server listening port 8000"));