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
        return res.json("Email not found");
      }
    }
  );
});

//get amount of users followers
router.get("/:userID/followers", (req, res) => {
  const userID = req.params.userID;
  db.query(
    "SELECT * FROM Following WHERE userFollowedID = ?",
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

router.get("/:userID/following", (req, res) => {
  const userID = req.params.userID;
  db.query(
    "SELECT * FROM Following WHERE userFollowingID = ?",
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

//get user info for visiting user page
router.get("/:userID/info/:requestByID", (req, res) => {
  const userID = req.params.userID;
  const requestByID = req.params.requestByID;
  db.query(
    "SELECT name, profileImage, id FROM Users WHERE id = ?",
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else {
        let name = result[0].name;
        let profileImage = result[0].profileImage;
        let id = result[0].id;
        db.query(
          "SELECT * FROM Following WHERE userFollowingID = ?",
          [userID],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.json(err);
            } else {
              let followingAmount = result.length;
              db.query(
                "SELECT * FROM Following WHERE userFollowedID = ?",
                [userID],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    return res.json(err);
                  } else {
                    let followerAmount = result.length;
                    db.query(
                      "SELECT p.postedByID, p.text, p.postImage, p.date, p.userName as postedByName, p.userImage as postedByImage, p.id as postID, p.retweet, p.originalPostedByID, p.originalPostedByName, p.originalPostedByImage, p.originalPostedByDate, p.originalPostID, p.likes, p.retweets  FROM Posts as p WHERE postedByID = ?",
                      [userID],
                      (err, result) => {
                        if (err) {
                          console.log(err);
                          return res.json(err);
                        } else {
                          let usersPost = result;
                          db.query(
                            "SELECT p.postedByID, p.text, p.postImage, p.date, p.userName as postedByName, p.userImage as postedByImage, p.id as postID, p.retweet, p.originalPostedByID, p.originalPostedByName, p.originalPostedByImage, p.originalPostedByDate, p.originalPostID, p.likes, p.retweets FROM Posts as p INNER JOIN Likes as l ON p.id = l.postID AND l.likedByID = ?",
                            [userID],
                            (err, result) => {
                              if (err) {
                                console.log(err);
                                return res.json(err);
                              } else {
                                let likedPost = result;
                                db.query(
                                  "SELECT p.postedByID, p.text, p.postImage, p.date, p.userName as postedByName, p.userImage as postedByImage, p.id as postID, p.retweet, p.originalPostedByID, p.originalPostedByName, p.originalPostedByImage, p.originalPostedByDate, p.originalPostID, p.likes, p.retweets FROM Posts as p WHERE p.retweet = 1 AND p.postedByID = ?",
                                  [userID],
                                  (err, result) => {
                                    if (err) {
                                      console.log(err);
                                      return res.json(err);
                                    } else {
                                      let retweetedPost = result;
                                      db.query(
                                        "SELECT * FROM Following WHERE userFollowingID = ? AND userFollowedID = ?",
                                        [requestByID, userID],
                                        (err, result) => {
                                          if (err) {
                                            console.log(err);
                                            return res.json(err);
                                          } else {
                                            let visitorIsFollowing =
                                              result.length;
                                            db.query(
                                              "SELECT * FROM Following WHERE userFollowingID = ? AND userFollowedID = ?",
                                              [userID, requestByID],
                                              (err, result) => {
                                                if (err) {
                                                  console.log(err);
                                                  return res.json(err);
                                                } else {
                                                  let isFollowingVisitor =
                                                    result.length;
                                                  let userInfo = {
                                                    retweetedPost,
                                                    likedPost,
                                                    usersPost,
                                                    followerAmount,
                                                    followingAmount,
                                                    name,
                                                    profileImage,
                                                    id,
                                                    visitorIsFollowing,
                                                    isFollowingVisitor,
                                                  };
                                                  return res
                                                    .status(200)
                                                    .json(userInfo);
                                                }
                                              }
                                            );
                                          }
                                        }
                                      );
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

//get all users
router.get("/all-users", (req, res) => {
  db.query("SELECT * FROM Users", (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.status(200).json(result);
    }
  });
});

module.exports = router;
