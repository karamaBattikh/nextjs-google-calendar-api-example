import styles from "./color.module.scss";

const Color = ({ children, name, inputRef, color, handleClick }) => (
  <button
    type="button"
    name={name}
    ref={inputRef}
    className={styles.color}
    style={{ backgroundColor: color }}
    onClick={handleClick}
  >
    {children}
  </button>
);

export default Color;
