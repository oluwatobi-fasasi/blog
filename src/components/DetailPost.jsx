import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostById, deletePost } from "../redux/post/postSlice";
import { supabase } from "../supabase";

const DetailPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => state.posts.post);

  const [user, setUser] = React.useState(null);

  useEffect(() => {
    dispatch(fetchPostById(id));
    checkUser();
  }, [dispatch, id]);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }

  const handleDelete = () => {
    dispatch(deletePost(id)).then(() => {
      navigate("/dashboard");
    });
  };

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
