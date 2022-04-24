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
  date,
  setDate,
}) => {
  return (
    <tr>
      <td className="text-brown">{element.cropName}</td>
      <td>
        <input
          className="editableInput"
          // type="number"
          required="required"
          placeholder="Enter an minimumPrice"
          name="minimumPrice"
          value={minimumPrice}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value === "" || re.test(e.target.value)) {
              setMinimumPrice(e.target.value);
            }
          }}
        ></input>
      </td>
      <td>
        <input
          className="editableInput"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </td>
      <td>
        <input
          className="editableInput"
          type="number"
          required="required"
          placeholder="Enter an slots Available..."
          name="slotsAvilable"
          value={slotsAvailable}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value === "" || re.test(e.target.value)) {
              setSlotsAvailable(e.target.value);
            }
          }}
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
