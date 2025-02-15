import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { UserAuth } from "./context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Initialize to false
  const navigate = useNavigate();

  const { signInUser } = UserAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const { data, error } = await signInUser(email, password);
      if (error) {
        setError(error.message); // Set error message
      } else {
        navigate("/dashboard"); // Redirect on success
      }
    } catch (error) {
      setError("An unexpected error occurred."); // Handle unexpected errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <p>
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
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
