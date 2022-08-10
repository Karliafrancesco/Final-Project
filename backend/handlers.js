"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI } = process.env;
const client_key = process.env.BACK_KEY;

require("dotenv").config();

const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
};

const fetch = (...args) =>
   import("node-fetch").then(({ default: fetch }) => fetch(...args));

//-----------------------------------------------------------
//-----------------------------------------------------------

const authenticateToken = (req, res, next) => {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];
   if (token == null)
      return res.status(401).json({ status: 401, message: "no credentials" });

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err)
         return res
            .status(403)
            .json({ status: 403, message: "No access to this page" });
      req.user = user;
      next();
   });
};

//-----------------------------------------------------------
//-----------------------------------------------------------

const generateAccessToken = (user) => {
   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
};

//-----------------------------------------------------------
//-----------------------------------------------------------

const handleSignUp = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);
   await client.connect();

   try {
      const db = client.db("db-name");

      //variable to check users collection and see if username exists
      const exist = await db
         .collection("users")
         .findOne({ username: req.body.username });

      if (exist) {
         return res
            .status(409)
            .json({ status: 409, message: "User already exists" });
      }

      //variable to hide users password when sent to the database
      const hashed = await bcrypt.hash(req.body.password, 10);

      //inserting new info in users collection
      await db.collection("users").insertOne({
         username: req.body.username,
         name: req.body.name,
         lastName: req.body.lastName,
         password: hashed,
         favorites: [],
      });

      res.status(200).json({ status: 200, message: "User Created" });
   } catch (e) {
      console.error("Error signing up:", e);
      return res.status(500).json({ status: 500, message: e.name });
   } finally {
      client.close();
   }
};

//-----------------------------------------------------------
//-----------------------------------------------------------

const handleSignIn = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);
   try {
      await client.connect();
      console.log("Connected!");
      const db = client.db("db-name");
      const users = db.collection("users");

      //looks in collection to see if that user exists
      const user = await users.findOne({ username: req.body.username });
      // if user doesn't exists return error
      if (user === null) {
         return res
            .status(400)
            .json({ status: 400, message: "User not found" });
      }

      //if user exists it verifies if both passwords match, bycrypt hides password in DB
      if (await bcrypt.compare(req.body.password, user.password)) {
         const username = req.body.username;
         const user = { name: username };
         // if sign if complete, user is granted ACCESS TOKEN
         const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
         res.json({ accessToken: accessToken });
      } else {
         return res
            .status(400)
            .json({ message: "Information enterted is not correct" });
      }
   } catch {}
   client.close();
   console.log("disconnected!");
};

//-----------------------------------------------------------
//-----------------------------------------------------------

const handleMoviesSearch = async (req, res) => {
   try {
      let response = await fetch(
         `https://api.themoviedb.org/3/search/movie?api_key=${client_key}&query=${req.query.search}`
      );

      const data = await response.json();
      console.log(data);
      res.status(200).json({ status: 200, data });
   } catch (err) {
      return err.error ? JSON.parse(err.error) : err;
   }
};

//-----------------------------------------------------------
//-----------------------------------------------------------

const handleUsers = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);
   await client.connect();

   try {
      const db = client.db("db-name");
      //find all users in users collection and converts it to array
      const users = await db.collection("users").find().toArray();

      if (users) {
         //to delete password from each user so its not shown for security
         users.forEach((obj) => {
            delete obj["password"];
         });
         return res.status(200).json({ status: 200, users });
      } else {
         return res
            .status(404)
            .json({ status: 404, message: "No users found" });
      }
   } catch (e) {
      console.error("Error signing in:", e);
      return res.status(500).json({ status: 500, message: e.name });
   } finally {
      client.close();
   }
};

//-----------------------------------------------------------
//-----------------------------------------------------------

const handleLoggedUser = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);
   await client.connect();

   try {
      const db = client.db("db-name");
      //find all users in users collection and converts it to array
      const users = await db.collection("users").find().toArray();
      const result = users.filter((user) => user.username === req.user.name);
      const user = result[0];

      // if (users) {
      //    //to delete password from each user so its not shown for security
      //    users.forEach((obj) => {
      //       delete obj["password"];
      //    });
      //    return
      res.status(200).json({ status: 200, user: user, message: "logged" });
      // } else {
      //    return res
      //       .status(404)
      //       .json({ status: 404, message: "No users found" });
      // }
   } catch (e) {
      console.error("Error signing in:", e);
      return res.status(500).json({ status: 500, message: e.name });
   } finally {
      client.close();
   }
};

//-----------------------------------------------------------
//-----------------------------------------------------------

const handlePostReview = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);
   await client.connect();

   const { review, author, movie_id } = req.body;

   if (!review) {
      return res.status(400).json({
         status: 400,
         message: "Missing data",
         data: req.body,
      });
   }

   try {
      const db = client.db("db-name");

      await db.collection("reviews").insertOne({
         id: req.body.id,
         author: req.body.author,
         movie_id: movie_id,
         review: req.body.review,
      });

      res.status(200).json({ status: 200, message: "review posted" });
   } catch (e) {
      console.error("Error posting review:", e);
      return res.status(500).json({ status: 500, message: e.name });
   } finally {
      client.close();
   }
};

//-----------------------------------------------------------
//-----------------------------------------------------------

const handleMovieReviews = async (req, res) => {
   const movieId = req.params.id;
   const client = new MongoClient(MONGO_URI, options);
   await client.connect();

   try {
      const db = client.db("db-name");

      const validateMovie = await db
         .collection("reviews")
         .find({ movie_id: movieId })
         .toArray();

      const review = validateMovie.map((r) => {
         return { author: r.author, review: r.review, authorId: r.id };
      });

      if (validateMovie !== null) {
         return res.status(200).json({
            status: 200,
            data: review,
            message: `You are viewing reviews with the id of ${movieId}`,
         });
      } else {
         return res.status(404).json({
            status: 404,
            data: movieId,
            message: `No movie reviews with the id of ${movieId}`,
         });
      }
   } catch (err) {
      console.log(err.message);
   } finally {
      client.close();
   }
};

//-----------------------------------------------------------
//-----------------------------------------------------------

const handleRate = async (req, res) => {};

//-----------------------------------------------------------
//-----------------------------------------------------------

const handleUser = async (req, res) => {
   const userId = req.params.id;
   const client = new MongoClient(MONGO_URI, options);
   await client.connect();

   try {
      const db = client.db("db-name");

      const validateUser = await db.collection("users").findOne({
         _id: ObjectId(userId),
      });

      if (validateUser !== null) {
         return res.status(200).json({
            status: 200,
            data: validateUser,
            message: `You are viewing a profile with the id ${userId}`,
         });
      } else {
         return res.status(404).json({
            status: 404,
            data: userId,
            message: `user ${userId} not found`,
         });
      }
   } catch (err) {
      console.log(err.message);
   } finally {
      client.close();
   }
};

//-----------------------------------------------------------
//-----------------------------------------------------------

const handleFavorite = async (req, res) => {
   const userId = req.params.id;
   const client = new MongoClient(MONGO_URI, options);
   await client.connect();
   console.log("connected");

   try {
      const db = client.db("db-name");
      const currentUser = await db.collection("users").findOne({
         _id: ObjectId(userId),
      });

      if (currentUser === null) {
         return res.status(404).json({
            status: 404,
            message: "user not found",
         });
      }

      const favArray = currentUser.favorites;
      favArray.push({
         title: req.body.title,
         image: req.body.poster_path,
      });

      console.log(favArray);

      const insertDoc = await db.collection("users").updateOne(
         {
            _id: ObjectId(userId),
         },
         {
            $set: {
               favorites: favArray,
            },
         }
      );
      console.log(insertDoc);

      if (insertDoc.modifiedCount > 0) {
         return res
            .status(200)
            .json({ status: 200, message: "added to favorites" });
      } else {
         return res
            .status(400)
            .json({ status: 400, message: "Couldn't update doc" });
      }
   } catch (err) {
      console.log(err.message);
   } finally {
      client.close();
   }
};

//-----------------------------------------------------------
//-----------------------------------------------------------

module.exports = {
   handleSignUp,
   handleSignIn,
   handleMoviesSearch,
   handleUsers,
   handlePostReview,
   authenticateToken,
   handleLoggedUser,
   handleRate,
   handleMovieReviews,
   handleUser,
   handleFavorite,
};
