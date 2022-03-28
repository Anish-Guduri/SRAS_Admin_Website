import React from "react";

export default function ReadCropData({
  element,
  handleEditClick,
  handleDeleteCrop,
}) {
  return (
    <tr>
      <td className="text-brown">{element.cropName}</td>
      <td className="text-brown">{element.minimumPrice}</td>
      <td className="text-brown">{element.cropName}</td>
      <td className="text-brown">{element.slotsAvilable}</td>
      <td className="action-column">
        <button
          className="table-btn"
          type="button"
          onClick={() => handleEditClick(element)}
        >
          Edit
        </button>
        <button
          className="table-btn"
          type="button"
          onClick={() => handleDeleteCrop(element)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
