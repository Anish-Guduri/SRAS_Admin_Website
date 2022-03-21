import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/account.css";
import { authentication } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
export default function Account() {
  const [name, setName] = useState("ad");
  const [state, setState] = useState("as");
  const [district, setDistrict] = useState("ads");
  const [market, setMarket] = useState("asdsf");

  useEffect(() => {
    // await setDoc(doc(db, "", "email"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA",
    // });
    // // const cityRef = doc(db, 'cities', 'BJ');
    // // setDoc(cityRef, { capital: true }, { merge: true });
    // try {
    //   const docRef = setDoc(doc(db, "users", user.email), {
    //     email: email,
    //     name: name,
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container my-container">
        <h2 className="heading">Profile</h2>
        <div className="profileContent">
          <div className="d-flex flex-display">
            <h5>Name</h5>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="d-flex flex-display">
            <h5>State</h5>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="d-flex flex-display">
            <h5>District</h5>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <div className="d-flex flex-display">
            <h5>Market Name</h5>
            <input
              type="text"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
            />
          </div>
        </div>
        <div className="display-btn">
          <button
            type="button"
            className="btn btn-color btn-hover my-3"
            // onClick={}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
