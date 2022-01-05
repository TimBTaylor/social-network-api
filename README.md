# Social Network API

I created this API to use in the client side of my Social Network Application.

## Description

This API allows you to create a user, log in to their account, make post, follow others, likes other post, retweet others post.

## Technologies Used

- Express.js
- MySQL
- Bcrypt

## Installation

- Download the file from this repository
- Navigate to the file via your CLI

### Executing program

- Run the following code in your CLI while in the project directory

```
npm install
```

or

```
yarn install
```

- once it is finished installing the dependencies run the follow command

```
node server.js
```

- Download the npm package nodemon for best use in developement mode

## Routes

### Create a user

`POST user/register`

- Body
  `name, email, password`
- Example

```
await axios({
      method: "post",
      url: "https://localhost:3001/user/register",
      header: { "Content-Type": "application/json" },
      data: {
        name,
        email,
        password
      },
    })
```

### Login to users account

`POST user/login`

- Body
  `email, password`
- Example

```
await axios({
      method: "post",
      url: "https://localhost:3001/user/login",
      header: { "Content-Type": "application/json" },
      data: {
        email,
        password
      },
    })
```

### Amount of users followers

`GET user/:userID/followers`

- Body
  ``
- Example

```
await axios({
      method: "get",
      url: `https://localhost:3001/user/${userId}/followers`
    })
```

### Amount of user following

`GET user/:userID/following`

- Body
  ``
- Example

```
await axios({
      method: "get",
      url: `https://localhost:3001/user/${userId}/following`
    })
```

### Get all users

`GET user/all-users`

- Body
  ``
- Example

```
await axios({
      method: "get",
      url: `https://localhost:3001/address/${userId}/delete-address`,
    })
```

### Create new post

`POST post/new-post`

- Body
  `postedByID, text, date, userName, userImage, postImage`
- Example

```
await axios({
      method: "post",
      url: `https://localhost:3001/post/new-post`,
      header: { "Content-Type": "application/json" },
      data: {
        postedByID,
        text,
        date,
        userName,
        userImage,
        postImage
      },
    })
```

### Get users post

`GET post/:userID/posts`

- Body
  ``
- Example

```
await axios({
      method: "get",
      url: `https://localhost:3001/post/${userID}/posts`,
    })
```

### Get post the user follows

`GET post/:userID/posts/following`

- Body
  ``
- Example

```
await axios({
      method: "get",
      url: `https://localhost:3001/post/${userID}/posts/following`,
    })
```

### Get post the user liked

`GET post/:userID/posts/liked`

- Body
  ``
- Example

```
await axios({
      method: "get",
      url: `https://localhost:3001/post/${userID}/posts/liked`,
    })
```

### Get post the user retweeted

`GET post/:userID/posts/retweeted`

- Body
  ``
- Example

```
await axios({
      method: "get",
      url: `https://localhost:3001/post/${userID}/posts/retweeted`,
    })
```

### Add like to a post

`POST`

- Body
  `likesAmount, postID, postedByID, likedByID`
- Example

```
await axios({
      method: "post",
      url: `https://localhost:3001/post/add-like`,
      header: { "Content-Type": "application/json" },
      data: {
        likesAmount,
        postID,
        postedByID,
        likedByID
      },
    })
```

### Remove like from a post

`POST`

- Body
  `likesAmount, postID, postedByID, likedByID`
- Example

```
await axios({
      method: "post",
      url: `https://localhost:3001/post/remove-like`,
      header: { "Content-Type": "application/json" },
      data: {
        likesAmount,
        postID,
        postedByID,
        likedByID
      },
    })
```

### Add retweet to a post

`POST`

- Body
  `retweetsAmount, postID, postedByID, text, date, userName, userImage, postImage, retweet, originalPostedByID, originalPostedByName, originalPostedByImage, originalPostedByDate, originalPostID`
- Example

```
await axios({
      method: "post",
      url: `https://localhost:3001/post/new-retweet`,
      header: { "Content-Type": "application/json" },
      data: {
        retweetsAmount,
        postID,
        postedByID,
        text,
        date,
        userName,
        userImage,
        postImage,
        retweet,
        originalPostedByID,
        originalPostedByName,
        originalPostedByImage,
        originalPostedByDate,
        originalPostID
      },
    })
```

### Remove retweet from a post

`PUT`

- Body
  `retweetsAmount, postID, retweetedPostID`
- Example

```
await axios({
      method: "put",
      url: `https://localhost:3001/post/remove-retweet`,
      header: { "Content-Type": "application/json" },
      data: {
        retweetsAmount,
        postID,
        retweetedPostID
      },
    })
```

### Create notification

`POST`

- Body
  `userForID, userFromID, userFromImage, text, viewed, postID, date, retweet`
- Example

```
await axios({
      method: "post",
      url: `https://localhost:3001/notification/new-notification`,
      header: { "Content-Type": "application/json" },
      data: {
        userForID,
        userFromID,
        userFromImage,
        text,
        viewed,
        postID,
        date,
        retweet
      },
    })
```

### Get all notifications that are not viewed

`GET`

- Body
  ``
- Example

```
await axios({
      method: "get",
      url: `https://localhost:3001/notification/${userID}/not-viewed`,
    })
```

### Get all notifications that are viewed

`GET`

- Body
  ``
- Example

```
await axios({
      method: "get",
      url: `https://localhost:3001/notification/${userID}/viewed`,
    })
```

### View all notifications

`PUT`

- Body
  ``
- Example

```
await axios({
      method: "get",
      url: `https://localhost:3001/notification/${userID}/view-all`,
    })
```

### Follow a user

`post`

- Body
  `userID, followUserID`
- Example

```
await axios({
      method: "post",
      url: `https://localhost:3001/following/user/follow`,
      header: { "Content-Type": "application/json" },
      data: {
        userID,
        followUserID
      },
    })
```

### Unfollow a user

`post`

- Body
  `userID, followUserID`
- Example

```
await axios({
      method: "post",
      url: `https://localhost:3001/following/user/unfollow`,
      header: { "Content-Type": "application/json" },
      data: {
        userID,
        followUserID
      },
    })
```
