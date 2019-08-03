const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postRouter);

module.exports = app;
