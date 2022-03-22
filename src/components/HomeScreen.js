import React, { useState } from "react";
import Navbar from "./Navbar";
import "../css/home.css";
export default function HomeScreen() {
  const [crop, setCrop] = useState("fd");
  return (
    <div className="">
      <Navbar />
      <div className=" container d-flex">
        <h5>Crop</h5>
        <input type="text" value={crop} placeholder=" enter crop name" />
      </div>
    </div>
  );
}
