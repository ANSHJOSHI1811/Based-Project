import React from 'react';

const InfoModal = ({ instance, isOpen, onClose }) => {
  if (!isOpen || !instance) return null; // Only render modal if open and an instance is selected

  return (
    <div
      className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
    >
      <div className="modal-box bg-white p-6 rounded-lg shadow-lg relative max-w-4xl w-full">
        <div className="flex justify-between items-start">
          {/* Instance name with logo */}
          <div>
            <h3 className="text-lg font-bold flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/873/873120.png"
                alt="Instance Logo"
                className="w-6 h-6 mr-2"
              />
              {instance.name}
            </h3>
          </div>

          {/* Close button */}
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Instance details */}
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            <strong>Location:</strong> {instance.location}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Price:</strong> ${instance.price}
          </p>
          <p className="text-sm mt-2">
            <strong>Description:</strong> {instance.description}
          </p>

          {/* Tags */}
          <div className="mt-4">
            {instance.tags && instance.tags.length > 0 && instance.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop click to close modal */}
      <div
        className="modal-backdrop fixed top-0 left-0 w-full h-full bg-transparent"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default InfoModal;