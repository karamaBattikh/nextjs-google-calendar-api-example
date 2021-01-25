import clsx from "clsx";
import { getMonth, getYear } from "date-fns";
import { useEvents } from "services/event";
import { MONTHLIST } from "utils/constants";

import styles from "./calendar.module.scss";
import Week from "./week";

function Calendar({ setDayClick, dayClick, className }) {
  const classNames = clsx(styles.wrapper, className && className);

  const { data: eventList, isLoading, isError, error } = useEvents(dayClick);
  // console.log("calendar.jsx ~ eventList", eventList);

  const month = getMonth(new Date());
  const year = getYear(new Date());

  return (
    <div className={classNames}>
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
