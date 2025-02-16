import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "./components/ui/button";
import { supabase } from "./supabase";

const DetailPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    checkUser();
  }, [id]);

  async function fetchData() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();
    setPost(data);
  }

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }

  async function handleDelete() {
    await supabase.from("blog_posts").delete().eq("id", id);
    navigate("/dashboard");
  }

  const isAuthor = user && user.id === post.user_id;
  return (
    <div className="p-5">
      <Link to={"/"}>
        <Button className="mb-6">Homepage</Button>
      </Link>
      <h1 className="text-sm font-bold">{post.title}</h1>
      <p className="mt-4 text-justify">{post.post}</p>

      {user && isAuthor && (
        <div className="flex gap-4 justify-center mt-5" key={user.id}>
          <Link to={"/update/" + id}>
            <Button>Edit</Button>
          </Link>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      )}
    </div>
  );
};

export default DetailPost;
