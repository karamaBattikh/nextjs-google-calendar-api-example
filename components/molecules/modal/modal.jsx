import Button from "components/atoms/button";
import { useRef, useContext } from "react";
import { ModalContext } from "contexts/modal";
import useLockBodyScroll from "hooks/useLockBodyScroll";
import useOnClickOutside from "hooks/useOnClickOutside";
import Portal from "utils/portal";
import styles from "./modal.module.scss";

const Modal = ({ children }) => {
  const ref = useRef();

  const { toggle } = useContext(ModalContext);

  useLockBodyScroll();
  useOnClickOutside(ref, () => toggle(false));

  return (
    <Portal selector="modal-root">
      <div className={styles.wrapper}>
        <div className={styles.content} ref={ref}>
          <Button
            className={styles.contentButton}
            appearance="onlyIcon"
            bgColor="white"
            handleClick={toggle}
          >
            <img src="/close.svg" width="15" />
          </Button>
          <div className={styles.contentChildren}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
