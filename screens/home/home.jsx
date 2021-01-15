import Link from "next/link";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.content}>
      <Link href="/event">
        <a>create new Event</a>
      </Link>

      <Link href="/calendar">
        <a>create new Calendar</a>
      </Link>
    </div>
  );
};

export default Home;
