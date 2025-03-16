import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signInUser } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
    navigate("/dashboard");
  };

  return (
    <div className="md:flex md:justify-center">
      <form onSubmit={handleLogin}>
        <h2 className="p-5 font-semibold text-2xl">Login</h2>
        <p className="pl-5">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <div>
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
          <Button type="submit" disabled={""} className="mt-4">
            SignIn
            {/* {loading ? "Logging in..." : "Login"} */}
          </Button>
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        </div>
      </form>
    </div>
  );
};

export default Login;
