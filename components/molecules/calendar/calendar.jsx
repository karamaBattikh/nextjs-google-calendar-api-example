import { getMonth, getYear } from "date-fns";
import styles from "./calendar.module.scss";
import Week from "./week";
import { MONTHLIST } from "utils/constants";

function Calendar({ setDayClick, dayClick }) {
  const month = getMonth(new Date());
  const year = getYear(new Date());

  return (
    <div className={styles.wrapper}>
      <div className={styles.calendarMonth}>
        <h4>
          {MONTHLIST[month]}, {year}
        </h4>
      </div>

      <Week
        month={month}
        year={year}
        setDayClick={setDayClick}
        dayClick={dayClick}
      />
    </div>
  );
}

export default Calendar;
