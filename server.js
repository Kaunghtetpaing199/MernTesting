const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

const routes = require("./router/api");

const BlogPost = require("./models/BlogPost");

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/mern_test", {
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
const rootDir = path.dirname(process.mainModule.filename);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(rootDir, "crush-course", "build")));
}
app.use(morgan("tiny"));

app.use("/api", routes);

app.listen(port, () => console.log(`Server start running at port ${port}`));
