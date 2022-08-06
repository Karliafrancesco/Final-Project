const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const PORT = 8000;

const {
   handleSignUp,
   handleSignIn,
   handlePostReview,
   handleMoviesSearch,
   handleUsers,
} = require("./handlers");

express()
   .use(morgan("tiny"))
   .use(express.json())

   // Requests for static files will look in public.
   .use(express.static("public"))

   // Endpoints ------------------------------------------------

   //signup for new user, verifies all users
   .post("/signup", handleSignUp)
   //verifies users, checks if password and email are correct
   .post("/signin", handleSignIn)
   //post a review on a specific movie
   .post("/postreview", handlePostReview) //NOT DONE YET!!!!!
   //searches all movies
   .get("/moviessearch", handleMoviesSearch)
   //gets all users in user collection
   .get("/users", handleUsers)

   //-----------------------------------------------------------

   .get("*", (req, res) => {
      return res
         .status(404)
         .json({ status: 404, message: "No endpoint found." });
   })

   .listen(PORT, () => console.log(`Listening on port ${PORT}`));
