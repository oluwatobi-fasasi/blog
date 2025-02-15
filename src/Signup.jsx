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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { session, signUpNewUser } = UserAuth();
  console.log(email, password, firstname);
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await signUpNewUser(email, password, firstname);
      if (error) {
        setError(error.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
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
          <Button type="submit" disabled={loading} className="mt-4">
            {loading ? "Signing up..." : "Sign up"}
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Signup;
