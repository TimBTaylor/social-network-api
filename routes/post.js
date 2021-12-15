const db = require("../db");
const express = require("express");
const router = express.Router();

//get post that the user followed
router.get("/:userID/posts/following", (req, res) => {
  const userID = req.params.userID;
  db.query(
    "SELECT p.postedByID, p.text, p.postImage, p.date, p.userName as postedByName, p.userImage as postedByImage, p.id as postID FROM Posts as p INNER JOIN Following as f ON p.postedByID = f.userFollowedID AND f.userFollowingID = ?",
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

//get post the user liked
router.get("/:userID/posts/liked", (req, res) => {
  const userID = req.params.userID;
  db.query(
    "SELECT p.postedById, p.text, p.postImage, p.date, p.userName as postedByName, p.userImage as postedByImage, p.id as postID FROM Posts as p INNER JOIN Likes as l ON p.id = l.postID AND l.likedByID = ?",
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
});

module.exports = router;
