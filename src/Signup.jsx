import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { UserAuth } from "./context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Initialize to false
  const navigate = useNavigate();

  const { session, signUpNewUser } = UserAuth();
  console.log(email, password, firstname);
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const { data, error } = await signUpNewUser(email, password, firstname);
      if (error) {
        setError(error.message); // Set error message
      } else {
        navigate("/"); // Redirect on success
      }
    } catch (error) {
      setError("An unexpected error occurred."); // Handle unexpected errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <h2>Sign up</h2>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
        <div>
          <Input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)} // Fixed: Use setFirstName
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
          <Button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Signup;
