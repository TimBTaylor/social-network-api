const db = require("../db");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//register user account

//need to verify that an account is not already registered with that email
router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  //checks if email is already registered
  db.query("SELECT * FROM Users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else if (result.length === 0) {
      //registers email
      db.query(
        "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            //returns the users information
            db.query(
              "SELECT * FROM Users where email = ?",
              [email],
              (err, result) => {
                if (err) {
                  console.log(err);
                  return res.status(400).json(err);
                } else {
                  return res.status(201).json(result);
                }
              }
            );
          }
        }
      );
    } else {
      return res.json("Account exists with that email");
    }
  });
});

//login
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM Users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(400).json({ err: err });
      }
      if (result.length > 0) {
        if (await bcrypt.compare(password, result[0].password)) {
          return res.status(200).json(result);
        } else {
          return res.json("Wrong email/password combination");
        }
      } else {
        return res.json("Wrong email/password combination");
      }
    }
  );
});

module.exports = router;
