import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signUpNewUsers } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const dispatch = useDispatch();
  // const { loading, error } = useSelector((state) => {
  //   state.auth;
  // });
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(signUpNewUsers({ email, password, first_name: firstname }));
    navigate("/");
  };

  return (
    <div className="md:flex md:justify-center">
      <form onSubmit={handleSignUp}>
        <h2 className="p-5 font-semibold text-2xl">Sign up</h2>
        <p className="pl-5">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
        <div className="mt-5">
          <Input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="mt-4" disabled={""}>
            {/* {loading ? "Signing up..." : "Sign Up"} */}
            signUp
          </Button>
          {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
        </div>
      </form>
    </div>
  );
};

export default Signup;
