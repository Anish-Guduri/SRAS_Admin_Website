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
export default function HomeScreen() {
  // const [crop, setCrop] = useState("");
  const [email, setEmail] = useState("");
  const data = [];
  const [numChildren, setNumChildren] = useState(0);
  const children = [];
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
    console.log(data[0].cropName);
    // setNumChildren(data.length);
    // const onAddChild = () => {
    //   setNumChildren(data.length);
    //   console.log(data.length + "  " + numChildren);
    // };
    for (let i = 0; i < data.length; i += 1) {
      // children.push(<CropContent key={i} />);
      children.push(<h4>Hello {i}</h4>);
      console.log("hello" + data.length);
    }
  };
  // console.log(data.length + "  " + numChildren);

  return (
    <div>
      <Navbar />
      <div className="crop-container">
        {children}
        <div>
          <button
            type="button"
            className="btn btn-color btn-hover my-3"
            // onClick={() => {
            //   onAddChild();
            // }}
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
