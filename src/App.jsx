import React from "react";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./CreatePost";
import DetailPost from "./DetailPost";
import UpdatePost from "./UpdatePost";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

const App = () => {
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
