const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

express()
   .use(morgan("tiny"))
   .use(express.json())

   // Requests for static files will look in public.
   .use(express.static("public"))

   // Endpoints.
   .get("*", (req, res) => {
      return res
         .status(404)
         .json({ status: 404, message: "No endpoint found." });
   })

   .listen(PORT, () => console.log(`Listening on port ${PORT}`));
