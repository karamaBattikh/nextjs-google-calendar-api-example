import { useState, useContext } from "react";
import { ModalContext } from "contexts/modal";
import Calendar from "components/molecules/calendar";
import styles from "./home.module.scss";
import { useCalendars, useDeleteCalendar } from "services/calendar";
import Button from "components/atoms/button";
import { FormCalendar } from "components/molecules/form";
import Confirmation from "components/molecules/confirmation";

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
                className={styles.calendarItem}
                key={`calendar-${index}`}
                style={{ color: calendar?.backgroundColor }}
              >
                <span>
                  <input type="checkbox" /> {calendar?.summary}
                </span>

                <Button
                  appearance="onlyIcon"
                  bgColor="white"
                  handleClick={() =>
                    handleModalContent(
                      <Confirmation
                        title={`Vous allez supprimer définitivement Calendrier: ${calendar?.summary}`}
                        mutation={useDeleteCalendar}
                        dataId={calendar?.calendarID}
                      />
                    )
                  }
                >
                  <img src="/close.svg" width="15" />
                </Button>
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
