import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { supabase } from "../supabase";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "@/redux/post/postSlice";

const UpdatePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.post);

  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchPostById(id));
    setTitle(posts.title);
    setPost(posts.post);
  }, [id]);

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
