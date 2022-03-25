import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CropContent from "./CropContent";
import "../css/homeScreen.css";
import { authentication, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
export default function HomeScreen(props) {
  const [crop, setCrop] = useState("");
  const [email, setEmail] = useState("");
  // const [minimumPrice, setminimumPrice] = useState(0);
  // const [slotsAvailable, setSlotsAvailable] = useState(0);

  const data = [];

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setEmail(user.email);
      }
    });

    bookSlot();
  }, [email]);
  const bookSlot = async () => {
    const docsSnap = await getDocs(
      collection(db, `marketAdmin/${email}/crops`)
    );

    docsSnap.forEach((doc) => {
      console.log(doc.data());
      data.push(doc.data());
    });
    console.log(data[0].slotsAvilable);
  };
  const [numChildren, setNumChildren] = useState(data.length);
  const children = [];
  console.log(data.length);
  for (let i = 0; i < numChildren; i += 1) {
    children.push(<CropContent crop={data[i].crop} />);
  }
  const onAddChild = () => {
    setNumChildren(numChildren + 1);
  };
  return (
    <div>
      <Navbar />
      <div className="crop-container">
        {children}
        <div>
          <button
            type="button"
            className="btn btn-color btn-hover my-3"
            onClick={() => {
              onAddChild();
            }}
          >
            Add crop
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-color btn-hover my-3"
            onClick={() => {
              bookSlot();
            }}
          >
            Book Slot
          </button>
        </div>
      </div>
    </div>
  );
}
