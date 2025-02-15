// import React, { useState } from "react";
// import { Button } from "./components/ui/button";
// import { supabase } from "./supabase";
// import { redirect } from "react-router-dom";
// import { Input } from "./components/ui/input";
// import { Textarea } from "./components/ui/textarea";

// const CreatePost = () => {
//   const [blogPost, setPost] = useState({
//     author: "",
//     title: "",
//     post: "",
//   });

//   // const [author, setAuthor] = useState("")
//   // const [title, setTitle] = useState("")

//   const handleAuthor = (e) => {
//     setPost((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//   };
//   const handleTitle = (e) => {
//     setPost((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//   };
//   const handlePost = (e) => {
//     setPost((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//   };

//   async function createPost(e) {
//     e.preventDefault();
//     const { data: user } = await supabase.auth.getUser();
//     await supabase.from("blog_posts").insert({
//       author: blogPost.author,
//       title: blogPost.title,
//       post: blogPost.post,
//       user_id: user.id,
//     });
//   }

//   return (
//     <form onSubmit={createPost}>
//       <Input
//         type="text"
//         placeholder="Your Name"
//         name="author"
//         onChange={handleAuthor}
//       />

//       <Input
//         type="text"
//         placeholder="Your Title"
//         name="title"
//         onChange={handleTitle}
//       />

//       <Textarea
//         placeholder="Write Here......."
//         name="post"
//         onChange={handlePost}
//       />
//       <Button type="submit">Create Post</Button>
//     </form>
//   );
// };

// export default CreatePost;

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [post, setPost] = useState("");
  // const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current user's session
    const { data: user } = await supabase.auth.getUser();

    console.log(user.user.id);

    // if (!user) {
    //   alert("You must be logged in to create a post.");
    //   return;
    // }

    // Insert the post with the user's ID

    await supabase.from("blog_posts").insert({
      author: author,
      title: title,
      post: post,
      user_id: user.user.id,
    });

    navigate("/"); // Redirect to home page after successful submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={post}
        onChange={(e) => setPost(e.target.value)}
        required
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
