import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./day.module.scss";

const activeDayClass = {
  active: "date-active",
};

const colorDay = {
  inMonth: "day-in-month",
  outMonth: "day-out-month",
};

const Day = ({ day, onClick, activeDay, dayOfMonth, weekend }) => {
  const buttonClassNames = clsx(
    styles.day,
    dayOfMonth && styles?.[colorDay?.["inMonth"]],
    (weekend || !dayOfMonth) && styles?.[colorDay?.["outMonth"]]
  );
  const dateClassNames = clsx(
    styles.date,
    activeDay && !weekend && styles?.[activeDayClass?.["active"]]
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonClassNames}
      disabled={weekend}
    >
      <span className={dateClassNames}>{day}</span>
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
