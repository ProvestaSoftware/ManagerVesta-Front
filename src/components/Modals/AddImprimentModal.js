import React from 'react';

const AddImprimentModal = ({ isOpen, closeModal }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Create Impriment</h2>
        {/* Add your form for creating "imprements" here */}
        <button onClick={closeModal}>Close Modal</button>
      </div>
    </div>
  );
};

export default AddImprimentModal;
