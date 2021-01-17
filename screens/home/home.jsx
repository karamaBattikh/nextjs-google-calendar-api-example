import { useState, useContext } from "react";
import { ModalContext } from "contexts/modal";
import Calendar from "components/molecules/calendar";
import styles from "./home.module.scss";
import { useCalendars } from "services/calendar";
import Button from "components/atoms/button";
import FormCalendar from "components/molecules/formCalendar";

const Home = () => {
  const [dayClick, setDayClick] = useState(new Date());

  const { handleModalContent } = useContext(ModalContext);

  const { data: calendarList, isLoading, isError, error } = useCalendars();

  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <Calendar setDayClick={setDayClick} dayClick={dayClick} />

        <div className={styles.calendarList}>
          <div className={styles.calendarListTitle}>
            <h3>Calendar List:</h3>

            <Button
              appearance="onlyIcon"
              handleClick={() => handleModalContent(<FormCalendar />)}
            >
              <img src="/add.svg" width="15" />
            </Button>
          </div>

          {isLoading && <h3>Loading...</h3>}
          {isError && <h3>Error: {error}...</h3>}

          {calendarList &&
            calendarList.map((calendar, index) => (
              <div
                key={`calendar-${index}`}
                style={{ color: calendar?.backgroundColor }}
              >
                <input type="checkbox" /> {calendar?.summary}
              </div>
            ))}
        </div>
      </div>

      <div className={styles.containerRight}>
        <Calendar setDayClick={setDayClick} dayClick={dayClick} />
      </div>
    </div>
  );
};

export default Home;
