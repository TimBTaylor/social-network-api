const db = require("../db");
const express = require("express");
const router = express.Router();

//user follows themselve
router.post("/:userID", (req, res) => {
  const userID = req.params.userID;
  db.query(
    "INSERT INTO Following (userFollowingID, userFollowedID) Values(?, ?)",
    [userID, userID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else if (result.affectedRows === 1) {
        return res.status(201).json("User following themselves");
      }
    }
  );
});

//follow a user
router.post("/user/follow", (req, res) => {
  const userID = req.body.userID;
  const followUserID = req.body.followUserID;
  db.query(
    "INSERT INTO Following (userFollowingID, userFollowedID) Values (?, ?)",
    [userID, followUserID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else if (result.affectedRows === 1) {
        return res.status(201).json("Follow request successful");
      }
    }
  );
});

//unfollow a user
router.post("/user/unfollow", (req, res) => {
  const userID = req.body.userID;
  const unFollowUserID = req.body.unFollowUserID;
  db.query(
    "DELETE FROM Following WHERE userFollowingID = ? AND userFollowedID = ?",
    [userID, unFollowUserID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else if (result.affectedRows === 1) {
        return res.status(200).json("Unfollow request successful");
      }
    }
  );
});

module.exports = router;
