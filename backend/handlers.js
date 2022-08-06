"use strict";
const bcrypt = require("bcrypt");
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

const handleSignUp = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);
   await client.connect();

   try {
      const db = client.db("db-name");

      const exist = await db
         .collection("users")
         .findOne({ username: req.body.username });

      if (exist) {
         return res
            .status(409)
            .json({ status: 409, message: "User already exists" });
      }

      const hashed = await bcrypt.hash(req.body.password, 10);
      await db.collection("users").insertOne({
         username: req.body.username,
         name: req.body.name,
         lastName: req.body.lastName,
         password: hashed,
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

   const { username, password } = req.body;

   if (!username || !password) {
      return res.status(400).json({
         status: 400,
         message: "Missing data",
         data: req.body,
      });
   }

   try {
      await client.connect();
      const users = client.db("db-name").collection("users");

      const user = await users.findOne({ username });

      if (!user) {
         return res.status(404).json({
            status: 404,
            message: "No user found",
            data: { username },
         });
      }

      const verify = await bcrypt.compare(password, user.password);

      if (!verify) {
         return res.status(401).json({
            status: 401,
            message: "Incorrect password",
            data: { username },
         });
      } else {
         const clone = { ...user };
         delete clone.password;

         return res.status(200).json({ status: 200, data: { user: clone } });
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

const handlePostReview = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);
   await client.connect();

   const { review, movie_id } = req.body;

   if (!review) {
      return res.status(400).json({
         status: 400,
         message: "Missing data",
         data: req.body,
      });
   }

   try {
      const db = client.db("db-name");

      const reviews = await db.collection("reviews").find().toArray();

      let obj = { review: { review }, id: { movie_id } };

      if (reviews) {
         reviews.insertOne(obj);
      }
   } catch (e) {
      console.error("Error signing in:", e);
      return res.status(500).json({ status: 500, message: e.name });
   } finally {
      client.close();
   }
};

module.exports = {
   handleSignUp,
   handleSignIn,
   handleMoviesSearch,
   handleUsers,
   handlePostReview,
};
