import React, { useState } from "react";
import "./App.css";
// import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import HomeScreen from "./components/HomeScreen";
import { Routes, Route } from "react-router-dom";
import Account from "./components/Account";
import About from "./components/About";
import SlotDetails from "./components/SlotDetails";
function App() {
  // const [redirectNow, setRedirectNow] = useState(false);
  // setTimeout(() => setRedirectNow(true), 2000);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/register" element={<RegisterScreen />} />
        <Route exact path="/home" element={<HomeScreen />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/slotdetails" element={<SlotDetails />} />
      </Routes>
    </>
  );
}

export default App;
