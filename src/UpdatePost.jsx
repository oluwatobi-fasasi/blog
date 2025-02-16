import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import { supabase } from "./supabase";

const UpdatePost = () => {
  const { id } = useParams();
  // const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();
    // setAuthor(data.author);
    setTitle(data.title);
    setPost(data.post);
  }

  async function updatePost(e) {
    e.preventDefault();

    await supabase
      .from("blog_posts")
      .update({ title: title, post: post })
      .eq("id", id);
    navigate("/dashboard");
  }
  return (
    <div>
      <form onSubmit={updatePost}>
        <Input
          type="text"
          name="author"
          // value={author}
          // onChange={(e) => setAuthor(e.target.value)}
        />

        <Input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Write Here......."
          name="post"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <Button type="submit">Update Post</Button>
      </form>
    </div>
  );
};

export default UpdatePost;
