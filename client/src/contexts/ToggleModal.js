import React, { useState } from "react";

export const ToggleModalContext = React.createContext(false);

function ToggleModal({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <ToggleModalContext.Provider value={{ isModalOpen, toggleModal }}>
      {children}
    </ToggleModalContext.Provider>
  );
}

export default ToggleModal;
