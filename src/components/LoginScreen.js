import React, { useState } from "react";
import "../css/loginScreen.css";
import { Link, useNavigate } from "react-router-dom";
import { authentication } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
export default function LoginScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        console.log("Signed in");
        alert("Logged In Succesfully");
        navigate("/home");

        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };
  return (
    <div className="parentDiv">
      {/* <Navbar /> */}
      <div className="myCard">
        <div className="loginCard">
          <h1 className="heading">Login</h1>
          <form>
            <div className="mb-3 my-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label text-green-bold"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control input-width"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 my-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label text-green-bold"
              >
                Password
              </label>
              <div className="d-flex  ">
                <input
                  type={isShowPassword ? "text" : "password"}
                  className="form-control input-width "
                  id="exampleInputPassword1"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isShowPassword ? (
                  <div
                    className="link-hover text-green-bold hide-btn"
                    onClick={() => {
                      setIsShowPassword(false);
                    }}
                  >
                    hide
                  </div>
                ) : (
                  <div
                    className="link-hover text-green-bold hide-btn"
                    onClick={() => {
                      setIsShowPassword(true);
                    }}
                  >
                    show
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                type="button"
                className="btn btn-color btn-hover my-3"
                onClick={handleSignIn}
              >
                Submit
              </button>
            </div>
            <Link className="my-3 text-green-bold " to="/register">
              Don't have an account? Register
            </Link>
          </form>
        </div>
        <div className="welcomeCard">
          <h4>Welcome to</h4>
          <h4>Self Reliant Agriculture Platform</h4>
        </div>
      </div>
    </div>
  );
}
