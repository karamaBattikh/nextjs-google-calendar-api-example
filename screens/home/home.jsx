import { useState } from "react";
import Calendar from "components/molecules/calendar";
import styles from "./home.module.scss";
import { useCalendars } from "services/calendar";

const Home = () => {
  const [dayClick, setDayClick] = useState(new Date());

  const {
    data: calendarList,
    isLoading,
    isIdle,
    isError,
    error,
  } = useCalendars();

  return (
    <div className={styles.container}>
      <div className={styles.smCalendar}>
        <Calendar setDayClick={setDayClick} dayClick={dayClick} />
        <div>
          <div>
            <h5>Calendar List:</h5>
            <button>+</button>
          </div>
          {isLoading && <h3>Loading...</h3>}
          {isError && <h3>Error: {error}...</h3>}

          {calendarList &&
            calendarList.map((calendar, index) => (
              <div key={`calendar-${index}`}>
                <input type="checkbox" /> {calendar.summary}
              </div>
            ))}
        </div>
      </div>
      <div className={styles.lgCalendar}>
        <Calendar setDayClick={setDayClick} dayClick={dayClick} />
      </div>
    </div>
  );
};

export default Home;
