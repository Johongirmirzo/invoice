import React, { useState } from "react";

export const ToggleEmailModalContext = React.createContext(false);

function ToggleEmailModal({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <ToggleEmailModalContext.Provider value={{ isModalOpen, toggleModal }}>
      {children}
    </ToggleEmailModalContext.Provider>
  );
}

export default ToggleEmailModal;
