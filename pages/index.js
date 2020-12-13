import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import Calendar from "components/calendar";
import FormEvent from "components/form";

export default function Home() {
  const [dayClick, setDayClick] = useState(new Date());
  return (
    <div className={styles.container}>
      <Calendar setDayClick={setDayClick} dayClick={dayClick} />
      <FormEvent day={dayClick} />
    </div>
  );
}
