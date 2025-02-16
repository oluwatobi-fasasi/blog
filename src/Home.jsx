import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

const Home = () => {
  const [blogpost, setBlogpost] = useState([]);
  const { session } = UserAuth();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await supabase.from("blog_posts").select("*");
    setBlogpost(data);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Your Story</h1>
      <Link to={"/create"} className="flex justify-center">
        <Button className="ml-5 mt-5">Create your post</Button>
      </Link>

      {session ? (
        <div>
          <p className="font-semibold">
            Welcome, {session.user.user_metadata?.first_name || "Unknown"}
          </p>
          <p className="font-semibold">Email: {session.user.email}</p>
          <Link to={"/dashboard"}>
            <Button>Go to dashboard</Button>
          </Link>
        </div>
      ) : (
        <div className="m-5 flex justify-center gap-6">
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
          <Link to={"/signup"}>
            <Button>Signup</Button>
          </Link>
        </div>
      )}

      <section className="md:text-center">
        {blogpost.map((content) => (
          <Card key={content.id}>
            <CardHeader>
              <CardTitle>{content.title}</CardTitle>
              <CardDescription className="font-semibold">
                Author: {content.author}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {content.post.substring(0, 100)}...
              </p>
              <Link to={"/" + content.id}>
                <Button className="mt-4">Read more</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Home;
