import React, { useEffect } from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import DetailPost from "./components/DetailPost";
import UpdatePost from "./components/UpdatePost";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { supabase } from "./supabase";
import { useDispatch } from "react-redux";
import { checkSession } from "./redux/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check session on app load
    dispatch(checkSession());

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(checkSession());
      }
    );

    // Cleanup listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:id" element={<DetailPost />} />
        <Route path="/update/:id" element={<UpdatePost />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
