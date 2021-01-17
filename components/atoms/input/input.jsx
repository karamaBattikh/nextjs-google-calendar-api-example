import clsx from "clsx";
import styles from "./input.module.scss";

const Input = ({
  label,
  type = "text",
  name,
  handlechange,
  refInput,
  value,
  id,
  className,
  error,
  errorMessage,
  placeholder = "",
  onKeyPress,
  onBlur,
}) => {
  const classNames = clsx(styles.input, className && className);
  return (
    <div className={classNames}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        type={type}
        name={name}
        value={value}
        ref={refInput}
        onChange={handlechange}
        id={id}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
      />

      {error && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default Input;
