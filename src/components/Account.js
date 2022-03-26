import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import "../css/account.css";
import { authentication, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, getDocFromCache } from "firebase/firestore";
export default function Account() {
  const [name, setName] = useState("--");
  const [state, setState] = useState("--");
  const [district, setDistrict] = useState("--");
  const [market, setMarket] = useState("--");
  const [isEnabled, setIsEnabled] = useState("disabled");
  const [email, setEmail] = useState("");
  const isFirstRender = useRef(true);
  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setEmail(user.email);
        setName(user.displayName);
      }
      fetchUserData();
    });
  }, [email]);
  const fetchUserData = async () => {
    // console.log(email + "hi");
    const docRef = doc(db, "marketAdmin", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data().email);
      setState(docSnap.data().state);
      setDistrict(docSnap.data().district);
      setMarket(docSnap.data().marketName);
      // alert("hi" + docSnap.data().email);
    } else {
      alert("No such document!");
    }
  };
  const handleEdit = async () => {
    try {
      const cityRef = doc(db, "marketAdmin", email);
      await setDoc(
        cityRef,
        {
          name: name,
          state: state,
          district: district,
          marketName: market,
        },
        { merge: true }
      );
      console.log("Document written with ID: ");
      setIsEnabled("disabled");
      alert("Data saved successfully");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert(e);
      setIsEnabled("disabled");
    }
  };
  return (
    <div>
      <Navbar />

      <div className="container my-container">
        <h2 className="heading">Profile</h2>
        <div className="profileContent">
          <div className="d-flex flex-display">
            <h5>Name</h5>
            <input
              className="input"
              type="text"
              value={name}
              disabled={isEnabled}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="d-flex flex-display">
            <h5>Email</h5>
            <input className="input" type="text" value={email} disabled />
          </div>
          <div className="d-flex flex-display">
            <h5>State</h5>
            <input
              className="input"
              type="text"
              value={state}
              disabled={isEnabled}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="d-flex flex-display">
            <h5>District</h5>
            <input
              className="input"
              type="text"
              value={district}
              disabled={isEnabled}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <div className="d-flex flex-display">
            <h5>Market Name</h5>
            <input
              className="input"
              type="text"
              value={market}
              disabled={isEnabled}
              onChange={(e) => setMarket(e.target.value)}
            />
          </div>
        </div>

        <div className="display-btn">
          <button
            type="button"
            className="btn btn-color btn-hover my-3"
            onClick={() => {
              handleEdit();
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-color btn-hover my-3"
            onClick={() => {
              setIsEnabled("");
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
