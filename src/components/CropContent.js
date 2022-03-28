import React, { useState, useEffect } from "react";
import "../css/homeScreen.css";
import { authentication, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getDocFromCache,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import PropTypes from "prop-types";

export default function CropContent({ setIsAddCrop }) {
  const [crop, setCrop] = useState("");
  const [email, setEmail] = useState("");
  const [minimumPrice, setminimumPrice] = useState(0);
  const [slotsAvailable, setSlotsAvailable] = useState(0);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isCropEditEnabled, setIsCropEditEnabled] = useState(true);
  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setEmail(user.email);
      }
    });
    if (crop === "") {
      setIsCropEditEnabled(false);
      setIsEditEnabled(false);
    }
  }, [email]);

  const handleSave = async () => {
    try {
      const marketRef = doc(db, "marketAdmin", email, "crops", crop);
      await setDoc(
        marketRef,
        {
          cropName: crop,
          minimumPrice: minimumPrice,
          slotsAvilable: slotsAvailable,
        },
        { merge: true }
      );
      console.log("Document written with ID: ");
      alert("Data saved successfully");
      setIsCropEditEnabled(true);
      setIsEditEnabled(true);
      setIsAddCrop(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert(e);
    }
  };
  const handleEditEnable = () => {
    alert("hello");
    crop === "" ? setIsCropEditEnabled(false) : setIsCropEditEnabled(true);
    setIsEditEnabled(false);
  };
  return (
    <div>
      <div className=" flex-dispaly">
        <div className="d-flex">
          <h6>Crop</h6>
          <input
            type="text"
            className="input"
            value={crop}
            className="input"
            disabled={isCropEditEnabled}
            placeholder="Enter crop name"
            onChange={(e) => setCrop(e.target.value)}
          />
          <h6>Minimum Price Offered</h6>
          <input
            type="number"
            className="input"
            value={minimumPrice}
            onChange={(e) => setminimumPrice(e.target.value)}
            disabled={isEditEnabled}
            style={{ marginRight: 0 }}
          />
          <h6>Rs.</h6>
          <h6>Slots Available</h6>
          <input
            type="number"
            className="input"
            value={slotsAvailable}
            disabled={isEditEnabled}
            onChange={(e) => setSlotsAvailable(e.target.value)}
          />
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn btn-color btn-hover my-3"
            disabled={isEditEnabled}
            onClick={() => {
              handleSave();
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-color btn-hover my-3"
            onClick={() => {
              handleEditEnable();
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
// CropContent.propTypes = {
//   crop: PropTypes.string.isRequired,
// };
// CropContent.defaultProps = {
//   crop: "Enter your text",
// };
