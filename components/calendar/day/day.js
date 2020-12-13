import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./day.module.scss";

const activeDayClass = {
  active: "day-active",
};

const colorDay = {
  inMonth: "day-in-month",
  outMonth: "day-out-month",
};

const Day = ({ day, onClick, activeDay, dayOfMonth, weekend }) => {
  const classNames = clsx(
    styles.day,
    dayOfMonth && styles?.[colorDay?.["inMonth"]],
    activeDay && !weekend && styles?.[activeDayClass?.["active"]],
    (weekend || !dayOfMonth) && styles?.[colorDay?.["outMonth"]]
  );
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames}
      disabled={weekend}
    >
      {day}
    </button>
  );
};
export default Day;

Day.propTypes = {
  day: PropTypes.number,
  onClick: PropTypes.func,
  activeDay: PropTypes.bool,
  dayOfMonth: PropTypes.bool,
  weekend: PropTypes.bool,
};
