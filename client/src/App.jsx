import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

import { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskType, setTasktype] = useState("Tasks!");
  const [user, setUser] = useState(null);

  // Check if user already logged in
  useEffect(() => {
    const getUser = async () => {
      try {

        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/me",
          { withCredentials: true }
        );

        setUser(data.user);
        setIsAuthenticated(true);

      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    getUser();
  }, []);

  return (
    <Router>

      <Header
        setTasks={setTasks}
        tasks={tasks}
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        setTasktype={setTasktype}
      />

      <Routes>

        <Route
          path="/"
          element={
            <Home
              tasks={tasks}
              taskType={taskType}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <Profile
              user={user}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />

      </Routes>

      <Toaster position="top-center" />

    </Router>
  );
}

export default App;