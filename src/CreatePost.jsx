import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [post, setPost] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: user } = await supabase.auth.getUser();

    await supabase
      .from("blog_posts")
      .insert([
        {
          author: author,
          title: title,
          post: post,
          user_id: user.user?.id || null,
        },
      ])
      .select();

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="md:flex md:flex-col">
      <Input
        type="text"
        placeholder="Your Name"
        name="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <Input
        type="text"
        placeholder="Your Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Textarea
        placeholder="Write Here......."
        name="post"
        value={post}
        onChange={(e) => setPost(e.target.value)}
        required
      />

      <Button type="submit" className="mt-5">
        Create Post
      </Button>
    </form>
  );
};

export default CreatePost;
