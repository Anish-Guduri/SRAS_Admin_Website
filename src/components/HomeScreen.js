import React, { useState, useEffect, Fragment } from "react";
import Navbar from "./Navbar";
import CropContent from "./CropContent";
import ReadCropData from "./ReadCropData";
import EditableCropData from "./EditableCropData";
import "../css/homeScreen.css";
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
export default function HomeScreen() {
  // const [crop, setCrop] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState("");
  const [cropName, setCropName] = useState("");
  const [minimumPrice, setMinimumPrice] = useState();
  const [slotsAvailable, setSlotsAvailable] = useState(0);
  const [isAddCrop, setIsAddCrop] = useState(false);
  const cropData = [];

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setEmail(user.email);
      }
    });
    fetchCropData();
  }, [email]);

  const fetchCropData = async () => {
    const docsSnap = await getDocs(
      collection(db, `marketAdmin/${email}/crops`)
    );
    docsSnap.forEach((doc) => {
      // console.log(doc.data());
      cropData.push(doc.data());
    });
    console.log(cropData);
    setData(cropData);
    // console.log(cropData[0].cropName + " " + cropData.length);
  };

  const handleUpdateCropDataClick = (element) => {
    const cropRef = doc(db, "marketAdmin", email, "crops", element.cropName);
    setDoc(
      cropRef,
      {
        minimumPrice: minimumPrice,
        slotsAvilable: slotsAvailable,
      },
      { merge: true }
    );
    setEditData("");
    setSlotsAvailable();

    alert("Data Updated Succesfully");
    fetchCropData();
  };

  const handleEditClick = (element) => {
    setEditData(element.cropName);
    setMinimumPrice(element.minimumPrice);
    setSlotsAvailable(element.slotsAvilable);
  };

  const handleDeleteCrop = async (element) => {
    alert("Delete Clicked Successfully");
    await deleteDoc(doc(db, "marketAdmin", email, "crops", element.cropName));
    fetchCropData();
  };

  const hanldeAddCrop = () => {
    setIsAddCrop(true);
  };

  const handleCancelClick = () => {
    alert("clciked");
    setEditData("");
  };
  return (
    <div>
      <Navbar />
      <div className="crop-container">
        <table className="app-container">
          <thead>
            <tr>
              <th className="text-white">Crop</th>
              <th className="text-white">Minimum Price</th>
              <th className="text-white">Maximum Price</th>
              <th className="text-white">Slots Available</th>
              <th className="text-white action-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <Fragment>
                {editData === element.cropName ? (
                  <EditableCropData
                    element={element}
                    setMinimumPrice={setMinimumPrice}
                    minimumPrice={minimumPrice}
                    slotsAvailable={slotsAvailable}
                    setSlotsAvailable={setSlotsAvailable}
                    handleUpdateCropDataClick={handleUpdateCropDataClick}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadCropData
                    element={element}
                    handleEditClick={handleEditClick}
                    handleDeleteCrop={handleDeleteCrop}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 24 }}></div>
        <div>
          {isAddCrop ? (
            <button
              type="button"
              className="btn btn-color btn-hover my-3"
              onClick={() => {
                hanldeAddCrop();
              }}
            >
              Add crop
            </button>
          ) : (
            <CropContent setIsAddCrop={setIsAddCrop} />
          )}
        </div>
      </div>
    </div>
  );
}
