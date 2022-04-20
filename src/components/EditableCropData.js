import React from "react";
import "../css/editableCropData.css";
const EditableCropData = ({
  editFormData,
  handleUpdateCropDataClick,
  setSlotsAvailable,
  setMinimumPrice,
  slotsAvailable,
  minimumPrice,
  cropName,
  handleCancelClick,
  element,
}) => {
  return (
    <tr>
      <td className="text-brown">{element.cropName}</td>
      <td>
        <input
          className="editableInput"
          type="text"
          required="required"
          placeholder="Enter an minimumPrice"
          name="minimumPrice"
          value={minimumPrice}
          onChange={(e) => setMinimumPrice(e.target.value)}
        ></input>
      </td>
      <td>
        <input
          className="editableInput"
          type="number"
          required="required"
          placeholder="Enter an slots Available..."
          name="slotsAvilable"
          value={slotsAvailable}
          onChange={(e) => setSlotsAvailable(e.target.value)}
        ></input>
      </td>
      <td>
        <button
          className="table-btn"
          type="button"
          onClick={() => handleUpdateCropDataClick(element)}
        >
          Update
        </button>

        <button
          className="table-btn"
          type="button"
          onClick={() => handleCancelClick()}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableCropData;
