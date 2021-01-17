import clsx from "clsx";
import styles from "./button.module.scss";

const sizeButton = {
  small: "sm-button",
  large: "lg-button",
};

const appearanceButton = {
  withIcon: "with-icon",
  onlyIcon: "only-icon",
};

const Button = ({
  children,
  type = "button",
  handleClick,
  disabled,
  className,
  color,
  bgColor,
  size,
  appearance,
  center,
}) => {
  const classNames = clsx(
    styles.button,
    className && className,
    size && styles?.[sizeButton?.[size]],
    appearance && styles?.[appearanceButton?.[appearance]]
  );

  return (
    <button
      type={type}
      className={classNames}
      onClick={handleClick}
      disabled={disabled}
      style={{
        backgroundColor: bgColor || "transparent",
        color: color || "white",
        margin: center ? "auto" : "0",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
