const db = require("../db");
const express = require("express");
const router = express.Router();

//create new notification
router.post("/new-notification", (req, res) => {
  const userForID = req.body.userForID;
  const userFromID = req.body.userFromID;
  const userFromImage = req.body.userFromImage;
  const text = req.body.text;
  const viewed = req.body.viewed;
  const postID = req.body.postID;
  const date = req.body.date;
  const retweet = req.body.retweet;
  db.query(
    "INSERT INTO Notifications (userForID, userFromID, userFromImage, text, viewed, postID, date, retweet) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [userForID, userFromID, userFromImage, text, viewed, postID, date, retweet],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else if (result.affectedRows === 1) {
        return res.status(201).json("New Notification successful");
      }
    }
  );
});

//get all notifications that are not viewed
router.get("/:userID/not-viewed", (req, res) => {
  const userID = req.params.userID;
  db.query(
    "SELECT * FROM Notifications WHERE userForID = ? AND viewed = 0",
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

//get all notifications that are viewed
router.get("/:userID/viewed", (req, res) => {
  const userID = req.params.userID;
  db.query(
    "SELECT * FROM Notifications WHERE userForID = ? AND viewed = 1",
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

//view all notificatons
router.put("/:userID/view-all", (req, res) => {
  const userID = req.params.userID;
  db.query(
    "UPDATE Notifications SET viewed = 1 WHERE viewed = 0 AND userForID = ?",
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else if (result.affectedRows >= 1) {
        return res.status(200).json(result);
      }
    }
  );
});

module.exports = router;
