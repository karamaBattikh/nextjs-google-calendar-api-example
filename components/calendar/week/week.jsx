import {
  addDays,
  getDate,
  isSameDay,
  isSameMonth,
  isWeekend,
  startOfWeek,
} from "date-fns";
import PropTypes from "prop-types";
import { DAYLIST } from "utils/constants";

import Day from "../day";
import styles from "./week.module.scss";

const getDayOfWeek = (month, year) => {
  const rows = Array.from(Array(6).keys());
  const columns = Array.from(Array(7).keys());

  const date = new Date(year, month);
  let currentDate = startOfWeek(date, { weekStartsOn: 1 });

  return rows?.reduce((row) => {
    row.push(
      columns?.reduce((column) => {
        column.push(currentDate);
        currentDate = addDays(currentDate, 1);
        return column;
      }, [])
    );
    return row;
  }, []);
};

const Week = ({ month, year, setDayClick, dayClick }) => {
  const dayOfWeek = getDayOfWeek(month, year);

  return (
    <div className={styles.calendarWeek}>
      {DAYLIST?.map((day, index) => (
        <h5 key={`week-${index}`}>{day}</h5>
      ))}

      {dayOfWeek?.map((week) =>
        week?.map((day, index) => (
          <Day
            key={`day-item-${index}`}
            day={getDate(new Date(day))}
            onClick={() => {
              setDayClick(day);
            }}
            weekend={isWeekend(new Date(day))}
            activeDay={isSameDay(day, dayClick)}
            dayOfMonth={isSameMonth(new Date(day), new Date(year, month))}
          />
        ))
      )}
    </div>
  );
};

export default Week;

Week.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  dayClick: PropTypes.instanceOf(Date),
  setDayClick: PropTypes.func,
};
