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
      .eq("user_id", session.user.id); // Fetch posts for the logged-in user

    // if (error) {
    //   console.log("Error fetching posts:", error);
    // } else {
    //   setPosts(data);
    // }
    setPosts(data);
  };
  const handleSignOut = async () => {
    await signOut(); // Call the signOut function
    // if (error) {
    //   console.log("Error signing out:", error);
    // } else {
    //   navigate("/"); // Redirect to home page after signing out
    // }
    navigate("/");
  };

  return (
    <div>
      <h1>
        Your Dashboard{" "}
        <Link to={"/create"}>
          <Button>Create your post</Button>
        </Link>
      </h1>
      {posts.length === 0 ? (
        <p>You haven't created any posts yet. </p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Created at: {new Date(post.created_at).toLocaleString()}</p>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
