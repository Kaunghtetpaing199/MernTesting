import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getBlogPost();
  }, []);

  const getBlogPost = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        setPosts(data);
        console.log(`Data has been received`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleChange = (e) => setTitle(e.target.value);

  const handleBody = (e) => setBody(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { title, body };
    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then((data) => {
        console.log("Data has been send to the server");
        resetUserInput();
        getBlogPost();
      })
      .catch((error) => console.log(error));
  };

  const resetUserInput = () => {
    setTitle("");
    setBody("");
  };

  const displayBlogPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };
  return (
    <div className="app">
      <h2>Welcome to the best app ever</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <textarea
            placeholder="body"
            name="body"
            cols="30"
            rows="10"
            value={body}
            onChange={handleBody}
          ></textarea>
        </div>

        <button>Submit</button>
      </form>

      <div className="blog-">{displayBlogPost(posts)}</div>
    </div>
  );
}

export default App;
