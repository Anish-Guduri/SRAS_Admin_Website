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

export default function CropContent({ setIsAddCrop, fetchCropData }) {
  const [crop, setCrop] = useState("");
  const [email, setEmail] = useState("");
  const [market, setMarket] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [minimumPrice, setminimumPrice] = useState(0);
  const [slotsAvailable, setSlotsAvailable] = useState(0);
  const [date, setDate] = useState("");
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isCropEditEnabled, setIsCropEditEnabled] = useState(true);

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setEmail(user.email);
      }
    });
    fetchUserData();
    if (crop === "") {
      setIsCropEditEnabled(false);
      setIsEditEnabled(false);
    }
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
  const handleSave = async () => {
    try {
      const marketRef = doc(db, "marketAdmin", email, "crops", crop);
      await setDoc(
        marketRef,
        {
          cropName: crop,
          minimumPrice: minimumPrice,
          slotsAvilable: slotsAvailable,
          email: email,
          marketName: market,
          state: state,
          district: district,
        },
        { merge: true }
      );
      console.log("Document written with ID: ");
      alert("Data saved successfully");
      setIsCropEditEnabled(true);
      setIsEditEnabled(true);
      fetchCropData();
      setIsAddCrop(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Please enter valid Data  " + e);
    }
  };
  const handleCancel = () => {
    setIsAddCrop(false);
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
            disabled={isCropEditEnabled}
            placeholder="Enter crop name"
            onChange={(e) => setCrop(e.target.value)}
          />
          <h6>Minimum Price Offered</h6>
          <input
            // type="number"
            className="input"
            value={minimumPrice}
            onChange={(e) => {
              const re = /^[0-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setminimumPrice(e.target.value);
              }
            }}
            disabled={isEditEnabled}
            style={{ marginRight: 0 }}
          />
          <h6>Rs.</h6>
        </div>
        <div className="d-flex">
          <h6>Date</h6>
          <input
            className="input"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={isEditEnabled}
            style={{ marginRight: 0 }}
          />
          <h6>Slots Available</h6>
          <input
            // type="number"
            className="input"
            value={slotsAvailable}
            disabled={isEditEnabled}
            onChange={(e) => {
              const re = /^[0-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setSlotsAvailable(e.target.value);
              }
            }}
          />
        </div>
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
            handleCancel();
          }}
        >
          Cancel
        </button>
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
