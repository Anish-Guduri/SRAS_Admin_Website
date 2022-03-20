import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import HomeScreen from "./components/HomeScreen";
import { Routes, Route } from "react-router-dom";
function App() {
  const [redirectNow, setRedirectNow] = useState(false);
  setTimeout(() => setRedirectNow(true), 2000);
  return (
    <>
      <Routes>
        {redirectNow ? (
          <Route exact path="/" element={<LoginScreen />} />
        ) : (
          <Route exact path="/" element={<Welcome />} />
        )}
        <Route exact path="/register" element={<RegisterScreen />} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/home" element={<HomeScreen />} />
      </Routes>
    </>
  );
}

export default App;
