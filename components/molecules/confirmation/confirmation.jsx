import { useContext, useEffect } from "react";
import { ModalContext } from "contexts/modal";
import Button from "components/atoms/button";
import { LOADING, IDLE, SUCCESS } from "utils/constants";
import styles from "./confirmation.module.scss";

const Confirmation = ({ mutation, dataId, title }) => {
  const { toggle } = useContext(ModalContext);

  const { mutate, status } = mutation();

  const handleMutate = async () => {
    await mutate(dataId);
  };

  useEffect(() => {
    if (status === SUCCESS) {
      toggle(false);
    }
    return () => {};
  }, [status, toggle]);

  return (
    <div className={styles.confirmation}>
      <h4>{title}</h4>
      <div className={styles.confirmationButton}>
        {status === IDLE && (
          <>
            <Button
              color="black"
              bgColor="cornflowerblue"
              handleClick={handleMutate}
            >
              OUI
            </Button>
            <Button
              color="black"
              bgColor="cornflowerblue"
              handleClick={() => toggle(false)}
            >
              NON
            </Button>
          </>
        )}
        {status === LOADING && <h5>Loading...</h5>}
      </div>
    </div>
  );
};

export default Confirmation;
