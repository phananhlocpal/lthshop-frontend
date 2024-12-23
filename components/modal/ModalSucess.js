import React from "react";
import "@/assets/css/Modal.css";

const ModalSuccess = ({ title, message, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="icon">
          <div className="checkmark"></div>
        </div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="btn" onClick={onClose}>
          Go back to dashboard
        </button>
      </div>
    </div>
  );
};

export default ModalSuccess;
