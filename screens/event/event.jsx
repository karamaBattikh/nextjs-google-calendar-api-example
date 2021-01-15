import { useState } from "react";
import Calendar from "components/calendar";
import FormEvent from "components/formEvent";
import styles from "./event.module.scss";

export default function Event() {
  const [dayClick, setDayClick] = useState(new Date());

  return (
    <div className={styles.container}>
      <div className={styles.smCalendar}>
        <Calendar setDayClick={setDayClick} dayClick={dayClick} size="small" />
      </div>
      <div className={styles.lgCalendar}>
        <Calendar setDayClick={setDayClick} dayClick={dayClick} size="large" />
      </div>
      {/* <FormEvent day={dayClick} /> */}
    </div>
  );
}
