import { createContext } from "react";
import Modal from "components/molecules/modal";
import useModal from "hooks/useModal";

let ModalContext;

const { Provider } = (ModalContext = createContext());

const ModalProvider = ({ children }) => {
  const { isShowing, toggle, modalContent, handleModalContent } = useModal();

  return (
    <Provider value={{ isShowing, toggle, handleModalContent }}>
      {isShowing && <Modal> {modalContent} </Modal>}
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
