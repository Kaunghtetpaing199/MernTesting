const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

const routes = require("./router/api");

const BlogPost = require("./models/BlogPost");

const MONGODB_URL =
  "mongodb://kaunghtetpaing:kaunghtet199@cluster0-shard-00-00.hbnks.mongodb.net:27017,cluster0-shard-00-01.hbnks.mongodb.net:27017,cluster0-shard-00-02.hbnks.mongodb.net:27017/storybook?ssl=true&replicaSet=atlas-11n5u4-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(MONGODB_URL || "mongodb://localhost/mern_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

const data = {
  title: "Welcome to my app",
  body:
    "Beatae sit et fugiat quis ut ut. Est autem possimus minus. Qui odit quia.",
};

const newBlogPost = new BlogPost(data);

// newBlogPost.save((error) => {
//   if (error) {
//     console.log("Something happened!");
//   } else {
//     console.log("Data has been saved!");
//   }
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("tiny"));

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("crush-course/build"));
}

app.listen(port, () => console.log(`Server start running at port ${port}`));
