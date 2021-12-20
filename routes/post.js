const db = require("../db");
const express = require("express");
const router = express.Router();

//get post that the user followed
router.get("/:userID/posts/following", (req, res) => {
  const userID = req.params.userID;
  db.query(
    "SELECT p.postedByID, p.text, p.postImage, p.date, p.userName as postedByName, p.userImage as postedByImage, p.id as postID, p.retweet, p.originalPostedByID, p.originalPostedByName, p.originalPostedByImage, p.originalPostedByDate, p.likes, p.retweets FROM Posts as p INNER JOIN Following as f ON p.postedByID = f.userFollowedID AND f.userFollowingID = ?",
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

//get post the user liked
router.get("/:userID/posts/liked", (req, res) => {
  const userID = req.params.userID;
  db.query(
    "SELECT p.postedById, p.text, p.postImage, p.date, p.userName as postedByName, p.userImage as postedByImage, p.id as postID, p.retweet, p.originalPostedByID, p.originalPostedByName, p.originalPostedByImage, p.originalPostedByDate FROM Posts as p INNER JOIN Likes as l ON p.id = l.postID AND l.likedByID = ?",
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

//get post the user retweeted
router.get("/:userID/posts/retweeted", (req, res) => {
  const userID = req.params.userID;
  db.query(
    "SELECT p.postedById, p.text, p.postImage, p.date, p.userName as postedByName, p.userImage as postedByImage, p.id as postID, p.retweet, p.originalPostedByID, p.originalPostedByName, p.originalPostedByImage, p.originalPostedByDate, p.originalPostID FROM Posts as p WHERE p.retweet = 1 AND p.postedByID = ?",
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

// create retweeted post
router.post("/newretweet", (req, res) => {
  db.query(
    "INSERT INTO Posts (postedByID, text, date, userName, userImage, postImage, retweet, originalPostedByID, originalPostedByName, originalPostedByImage, originalPostedByDate, originalPostID) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      req.body.postedByID,
      req.body.text,
      req.body.date,
      req.body.userName,
      req.body.userImage,
      req.body.postImage,
      req.body.retweet,
      req.body.originalPostedByID,
      req.body.originalPostedByName,
      req.body.originalPostedByImage,
      req.body.originalPostedByDate,
      req.body.originalPostID,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else {
        console.log(result);
        return res.status(201).json(result);
      }
    }
  );
});

//add like to a post and create new like row in Likes table
router.post("/add-like", (req, res) => {
  const likesAmount = req.body.likesAmount;
  const postID = req.body.postID;
  const postedByID = req.body.postedByID;
  const likedByID = req.body.likedByID;
  //updates the likes amount in the post table
  db.query(
    "UPDATE Posts SET likes = ? WHERE id = ?",
    [likesAmount, postID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else {
        //inserts new row into likes column
        db.query(
          `INSERT INTO Likes (postID, postedByID, likedByID) VALUES (?, ?, ?)`,
          [postID, postedByID, likedByID],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.json(err);
            } else {
              return res.status(200).json("Post likes updated successfully");
            }
          }
        );
      }
    }
  );
});

//remove like from a post and remove like from Likes table
router.post("/remove-like", (req, res) => {
  const likesAmount = req.body.likesAmount;
  const postID = req.body.postID;
  const postedByID = req.body.postedByID;
  const likedByID = req.body.likedByID;
  db.query(
    "UPDATE Posts SET likes = ? WHERE id = ?",
    [likesAmount, postID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else {
        db.query(
          "DELETE FROM Likes WHERE postID = ? AND postedByID = ? AND likedByID = ?",
          [postID, postedByID, likedByID],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.json(err);
            } else {
              return res.status(200).json("Post likes updated successfully");
            }
          }
        );
      }
    }
  );
});

//add retweet to a post
router.put("/add-retweet", (req, res) => {
  const retweetsAmount = req.body.retweetsAmount;
  const postID = req.body.postID;
  db.query(
    `UPDATE Posts SET retweets = ? WHERE id = ?`,
    [retweetsAmount, postID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else {
        return res.status(200).json("Post retweets updated successfully");
      }
    }
  );
});

//remove retweet from a post
router.put("/remove-retweet", (req, res) => {
  const retweetsAmount = req.body.retweetsAmount;
  //remeber this postID will be the postID from the post that gets delete not the post that was actually retweeted
  const postID = req.body.postID;
  const retweetedPostID = req.body.retweetedPostID;
  db.query("DELETE FROM Posts WHERE id = ?", [postID], (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      db.query(
        "UPDATE Posts SET retweets = ? WHERE id = ? ",
        [retweetedPostID],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.json(err);
          } else {
            return res.status(200).json("Post retweets udpated successfully");
          }
        }
      );
    }
  });
});

module.exports = router;
