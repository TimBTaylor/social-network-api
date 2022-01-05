const db = require("../db");
const express = require("express");
const router = express.Router();

//create post
router.post("/new-post", (req, res) => {
  const postedByID = req.body.postedByID;
  const text = req.body.text;
  const date = req.body.date;
  const userName = req.body.userName;
  const userImage = req.body.userImage;
  const postImage = req.body.postImage;
  db.query(
    "INSERT INTO Posts (postedByID, text, date, userName, userImage, postImage) VALUES (?, ?, ?, ?, ?, ?)",
    [postedByID, text, date, userName, userImage, postImage],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else if (result.affectedRows === 1) {
        return res.status(201).json("Posted successfully");
      }
    }
  );
});

//get users post
router.get("/:userID/posts", (req, res) => {
  const userID = req.params.userID;
  db.query(
    "SELECT p.postedByID, p.text, p.postImage, p.date, p.userName as postedByName, p.userImage as postedByImage, p.id as postID, p.retweet, p.originalPostedByID, p.originalPostedByName, p.originalPostedByImage, p.originalPostedByDate, p.originalPostID, p.likes, p.retweets  FROM Posts as p WHERE postedByID = ?",
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

//get post that the user followed
router.get("/:userID/posts/following", (req, res) => {
  const userID = req.params.userID;
  db.query(
    "SELECT p.postedByID, p.text, p.postImage, p.date, p.userName as postedByName, p.userImage as postedByImage, p.id as postID, p.retweet, p.originalPostedByID, p.originalPostedByName, p.originalPostedByImage, p.originalPostedByDate, p.originalPostID, p.likes, p.retweets FROM Posts as p INNER JOIN Following as f ON p.postedByID = f.userFollowedID AND f.userFollowingID = ?",
    [userID, userID],
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
    "SELECT p.postedByID, p.text, p.postImage, p.date, p.userName as postedByName, p.userImage as postedByImage, p.id as postID, p.retweet, p.originalPostedByID, p.originalPostedByName, p.originalPostedByImage, p.originalPostedByDate, p.originalPostID, p.likes, p.retweets FROM Posts as p INNER JOIN Likes as l ON p.id = l.postID AND l.likedByID = ?",
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
    "SELECT p.postedByID, p.text, p.postImage, p.date, p.userName as postedByName, p.userImage as postedByImage, p.id as postID, p.retweet, p.originalPostedByID, p.originalPostedByName, p.originalPostedByImage, p.originalPostedByDate, p.originalPostID, p.likes, p.retweets FROM Posts as p WHERE p.retweet = 1 AND p.postedByID = ?",
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

//add retweet to a post create new retweeted post
router.post("/new-retweet", (req, res) => {
  const retweetsAmount = req.body.retweetsAmount;
  const postID = req.body.originalPostID;
  db.query(
    `UPDATE Posts SET retweets = ? WHERE id = ?`,
    [retweetsAmount, postID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else if (result.affectedRows === 1) {
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
            } else if (result.affectedRows === 1) {
              return res.status(201).json(result);
            }
          }
        );
      }
    }
  );
});

//remove retweet from a post
router.put("/remove-retweet", (req, res) => {
  const retweetsAmount = req.body.retweetsAmount;
  const postID = req.body.postID;
  const retweetedPostID = req.body.retweetedPostID;
  db.query("DELETE FROM Posts WHERE id = ?", [postID], (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else if (result.affectedRows === 1) {
      db.query(
        "UPDATE Posts SET retweets = ? WHERE id = ? ",
        [retweetsAmount, retweetedPostID],
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
