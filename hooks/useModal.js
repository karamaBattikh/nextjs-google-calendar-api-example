import { useState } from "react";

const useModal = (initialMode = false, initialContent = "") => {
  const [isShowing, setIsShowing] = useState(initialMode);
  const [modalContent, setModalContent] = useState(initialContent);

  const handleModalContent = (content = false) => {
    setIsShowing(!isShowing);
    if (content) {
      setModalContent(content);
    }
  };

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    toggle,
    modalContent,
    handleModalContent,
  };
};

export default useModal;
