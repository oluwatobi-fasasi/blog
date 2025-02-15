import React, { useEffect, useState } from "react";

import { supabase } from "./supabase";
import { UserAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (session) {
      fetchUserPosts();
    }
  }, [session]);

  const fetchUserPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("user_id", session.user.id);

    setPosts(data);
  };
  const handleSignOut = async () => {
    await signOut();

    navigate("/");
  };

  return (
    <div>
      <h1 className="m-5 font-semibold text-2xl text-center">
        Your Dashboard{" "}
      </h1>
      <Link to={"/create"}>
        <Button className="ml-5">Create your post</Button>
      </Link>
      {posts.length === 0 ? (
        <p>You haven't created any posts yet. </p>
      ) : (
        posts.map((post) => (
          <Link to={"/" + post.id}>
            <div key={post.id} className="p-5">
              <h2 className="font-bold">{post.title}</h2>

              <p className="">
                Created at: {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          </Link>
        ))
      )}
      <Button onClick={handleSignOut} className="ml-5">
        Sign Out
      </Button>
    </div>
  );
};

export default Dashboard;
