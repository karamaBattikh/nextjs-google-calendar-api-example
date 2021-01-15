import { useState } from "react";
import Calendar from "components/molecules/calendar";
import styles from "./home.module.scss";

const Home = () => {
  const [dayClick, setDayClick] = useState(new Date());

  return (
    <div className={styles.container}>
      <div className={styles.smCalendar}>
        <Calendar setDayClick={setDayClick} dayClick={dayClick} />
      </div>
      <div className={styles.lgCalendar}>
        <Calendar setDayClick={setDayClick} dayClick={dayClick} />
      </div>
    </div>
  );
};

export default Home;
