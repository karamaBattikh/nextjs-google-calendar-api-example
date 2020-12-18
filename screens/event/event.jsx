import { useState } from "react";
import Calendar from "components/calendar";
import FormEvent from "components/formEvent";
import styles from "./event.module.scss";

export default function Event() {
  const [dayClick, setDayClick] = useState(new Date());

  return (
    <div className={styles.container}>
      <Calendar setDayClick={setDayClick} dayClick={dayClick} />
      <FormEvent day={dayClick} />
    </div>
  );
}
