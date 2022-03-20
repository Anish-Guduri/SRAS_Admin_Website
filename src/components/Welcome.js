import React from "react";
import welcomeBackgroundImage from "../img/welcomeBackgroundImage.jpeg";
export default function Welcome() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#ba2",
        backgroundImage: `url(${welcomeBackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: 0.2,
      }}
    >
      <h1 className="mx-3" style={{ color: "#804000", opacity: 1 }}>
        Welcome to
      </h1>
      <h1 style={{ color: "#804000" }}>Self Reliant Agriculture Platform</h1>
    </div>
  );
}
