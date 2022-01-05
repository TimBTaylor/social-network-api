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

# left off here

### Get all time entrys for a company

`GET`

- Body
  `companyNumber`
- Example

```
await axios({
      method: "get",
      url: `https://ecommersappbytim.herokuapp.com/cart/${userId}/delete-from-cart`,
      header: { "Content-Type": "application/json" },
      data: {
        companyNumber
      },
    })
```
