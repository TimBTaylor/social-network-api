require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const userRouter = require("./routes/user");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET, POST, DELETE, PUT"],
  })
);

app.get("/healthcheck", (req, res) => {
  return res.status(200);
});

app.get("/", (req, res) => {
  return res.json("Hello World");
});

app.use("/user", userRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server running on port 3001");
});

const db = require("./db");
const router = express.Router();
router.get("/random", (req, res) => {
  db.query("SELECT * FROM Users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

module.exports = app;
