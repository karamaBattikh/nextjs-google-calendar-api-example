import { getMonth, getYear } from "date-fns";
import { useState } from "react";

import styles from "./calendar.module.scss";
import Week from "./week";

export const MONTHLIST = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

function Calendar({ setDayClick, dayClick }) {
  // const [dayClick, setDayClick] = useState(new Date());

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
