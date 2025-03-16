import React, { useEffect, useState } from "react";

import { supabase } from "../supabase";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/auth/authSlice";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { session, user } = useSelector((state) => state.auth || {});
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    await dispatch(logoutUser());

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
      <Link to={"/"}>
        <Button className="ml-5">Homepage</Button>
      </Link>
      {posts.length === 0 ? (
        <p>You haven't created any posts yet. </p>
      ) : (
        posts.map((post) => (
          <Link to={"/" + post.id} key={post.id}>
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
