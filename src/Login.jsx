import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { UserAuth } from "./context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signInUser } = UserAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await signInUser(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
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
          <Button type="submit" disabled={loading} className="mt-4">
            {loading ? "Logging in..." : "Login"}
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
