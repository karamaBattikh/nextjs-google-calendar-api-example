import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.content}>
      <div>
        <Link href="/event">
          <a>create new Event</a>
        </Link>
      </div>
      <div>
        <Link href="/calendar">
          <a>create new Calendar</a>
        </Link>
      </div>
    </div>
  );
}
