import React, { useState, useEffect, Fragment } from "react";
import Navbar from "./Navbar";
import { authentication, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
export default function SlotDetails() {
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setEmail(user.email);
      }
    });
    fetchSlotDetails();
    fetchSlotDetails();
    setTimeout(() => {
      fetchSlotDetails();
    }, 5000);
  }, []);
  const fetchSlotDetails = async () => {
    // const docsSnap = await getDocs(
    //   collection(db, `marketAdmin/${email}/detailOfSlots`)
    // );
    // docsSnap.forEach((doc) => {
    //   data.push(doc.data());
    // });
    const querySnapshot = await getDocs(
      collection(db, `marketAdmin/"anishguduri@yahoo.com"/detailOfSlots`)
    );
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());

      setData((currentObject) => [...currentObject, doc.data()]);
      data.push(doc.data());
      console.log(data);
    });
    console.log(data + "Hello");
    setData();
    // console.log(cropData[0].cropName + " " + cropData.length);
  };
  return (
    <div>
      <Navbar />
      SlotDetails{email}
      {/* {data[0].date} */}
      <div></div>
    </div>
  );
}
