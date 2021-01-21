const express = require("express");
const BlogPost = require("../models/BlogPost");

const router = express.Router();

router.get("/", (req, res) => {
  BlogPost.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => res.json(error));
});

router.post("/save", (req, res) => {
  const data = req.body;

  const newBlogPost = new BlogPost(data);

  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Sorry, internal server errors" });
      return;
    }
    return res.json({ msg: "We received your message" });
  });
});

router.get("/name", (req, res) => {
  const data = {
    username: "susu",
    age: 16,
  };
  res.json(data);
});

module.exports = router;
