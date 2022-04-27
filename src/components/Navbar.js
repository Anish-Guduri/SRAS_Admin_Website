import React from "react";
import "../css/navbar.css";
import { Link } from "react-router-dom";
import { authentication } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(authentication)
      .then(() => {
        alert("logged out succesfully");
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg  bg-green ">
        <div className="container-fluid">
          <h3 className="navbar-brand title">SRAS Admin</h3>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item link-hover">
                <Link
                  className="nav-link active text-white "
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item link-hover">
                <Link
                  className="nav-link  text-white "
                  aria-current="page"
                  to="/account"
                >
                  Account
                </Link>
              </li>
              <li className="nav-item link-hover">
                <Link
                  className="nav-link  text-white "
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item link-hover">
                <Link
                  className="nav-link  text-white "
                  aria-current="page"
                  to="/slotdetails"
                >
                  Slot Details
                </Link>
              </li>
            </ul>
            <div
              className=" d-flex text-white link-hover"
              onClick={handleLogout}
            >
              <i className="cil-account-logout "></i>
              Logout
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
