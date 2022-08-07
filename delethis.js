const handleSignIn = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);

   // Extract the sign in details from the request.
   const { username, password } = req.body;

   // If either value is missing, respond with a bad request.
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

      // Verify that the user attempting to sign in exists.
      if (!user) {
         return res.status(404).json({
            status: 404,
            message: "No user found",
            data: { username },
         });
      }

      // Verify that the password entered is correct.
      const verify = await bcrypt.compare(password, user.password);

      if (!verify) {
         return res.status(401).json({
            status: 401,
            message: "Incorrect password",
            data: { username },
         });
      } else {
         const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
         res.json({ accessToken: accessToken });
      }
   } catch (e) {
      console.error("Error signing in:", e);
      return res.status(500).json({ status: 500, message: e.name });
   } finally {
      client.close();
   }
};

const handleLogin = async (req, res) => {
   const username = req.body.username;
   const user = { name: username };

   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
   res.json({ accessToken: accessToken });

   // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
   // return res.status(200).json({
   //    message: "Success",
   //    token: accessToken,
   //    refreshToken: refreshToken,
   // });
};
