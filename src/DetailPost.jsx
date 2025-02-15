import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "./supabase";
import { Button } from "./components/ui/button";

const DetailPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();
    setPost(data);
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.post}</p>
      <div className="flex gap-4">
        <Link to={"/update/" + id}>
          <Button>Edit</Button>
        </Link>
        <Link>
          <Button>Delete</Button>
        </Link>
      </div>
    </div>
  );
};

export default DetailPost;
