import React from "react";
import "../css/loginScreen.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
export default function LoginScreen() {
  return (
    <div className="parentDiv">
      {/* <Navbar /> */}
      <div className="myCard">
        <div className="loginCard">
          <h1 className="heading">Login</h1>
          <form>
            <div className="mb-3 my-3">
              <label
                for="exampleInputEmail1"
                className="form-label text-green-bold"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 my-3">
              <label
                for="exampleInputPassword1"
                className="form-label text-green-bold"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button type="submit" className="btn btn-color btn-hover my-3">
                Submit
              </button>
            </div>
            <Link className="my-3 text-green-bold " to="/register">
              Don't have an account? Register
            </Link>
          </form>
        </div>
        <div className="gestureCard">
          <h4>Welcome to</h4>
          <h4>Self Reliant Agriculture Platform</h4>
        </div>
      </div>
    </div>
  );
}
