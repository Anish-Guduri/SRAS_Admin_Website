import React, { useState } from "react";
import "../css/registerScreen.css";
import { Link } from "react-router-dom";
import { authentication, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function RegisterScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [errorName, seterrorName] = useState("");
  // const [errorEmail, seterrorEmail] = useState("");
  // const [errorPassword, seterrorPassword] = useState("");
  // const [errorConfirmPassword, seterrorConfirmPassword] = useState("");

  const RegisterUser = () => {
    if (validate()) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then(() => {
          const user = authentication.currentUser;
          updateProfile(authentication.currentUser, {
            displayName: name,
          })
            .then(() => {
              try {
                const docRef = setDoc(doc(db, "marketAdmin", user.email), {
                  email: email,
                  name: name,
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
              console.log(
                user.displayName +
                  " " +
                  user.email +
                  " " +
                  user.uid +
                  " " +
                  user.emailVerified
              );
            })
            .catch((error) => {
              alert(error.message);
            });
          alert("Account created successfully! " + user.displayName);
          navigate("/home");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  function validateName(name) {
    let alpha = /^[a-zA-Z][a-zA-Z ]*$/;
    if (alpha.test(name)) {
      return true;
    } else {
      alert("Name must contain only alphabets");
      return false;
    }
  }
  function validateEmail(mail) {
    let reg =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    if (reg.test(mail)) {
      return true;
    } else {
      alert("please enter valid email");
      return false;
    }
  }
  function validatePassword(password) {
    var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (regularExpression.test(password)) return true;
    else {
      alert("please enter a valid password");
      return false;
    }
  }
  function validateConfirmPassword(confirmPassword, password) {
    if (confirmPassword === password) return true;
    else {
      alert("password mismatch");
      return false;
    }
  }
  function validate() {
    let val1 = validateName(name);
    let val2 = validateEmail(email);
    let val3 = validatePassword(password);
    let val4 = validateConfirmPassword(confirmPassword, password);
    if (val1 && val2 && val3 && val4) {
      return true;
    } else {
      return false;
    }
  }
  // const handleClick = () => {
  //   console.log("clicked");
  //   console.log(name + " " + email + " " + password);
  // };
  return (
    <div className="parentDiv">
      <div className="myCard">
        <div className="gestureCard">
          <h4>Welcome to</h4>
          <h4>Self Reliant Agriculture Platform</h4>
        </div>
        <div className="loginCard">
          <h1 className="heading">Register</h1>
          <form>
            <div className="mb-3 my-2">
              <label
                htmlFor="fullName"
                className="form-label  text-green-bold "
              >
                Name
              </label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="mb-3 my-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label text-green-bold"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 my-2">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label text-green-bold"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="exampleInputPassword1"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 my-2">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label text-green-bold"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="exampleInputPassword1"
                placeholder="*******"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-color btn-hover my-3"
              onClick={RegisterUser}
            >
              Submit
            </button>
          </form>
          <Link className="my-3 link-text " to="/login">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
