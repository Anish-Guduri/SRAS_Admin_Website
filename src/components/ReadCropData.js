import React from "react";

export default function ReadCropData({ element, handleEditClick }) {
  return (
    <tr>
      <td className="text-brown">{element.cropName}</td>
      <td className="text-brown">{element.minimumPrice}</td>
      <td className="text-brown">{element.cropName}</td>
      <td className="text-brown">{element.slotsAvilable}</td>
      <td>
        <button
          className="table-btn"
          type="button"
          onClick={() => handleEditClick(element)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}
