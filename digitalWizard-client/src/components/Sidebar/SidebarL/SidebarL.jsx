import { Link } from "react-router-dom";
import styles from "./SidebarL.module.css";
import { ImEarth } from "react-icons/im";
import { useState } from "react";

function SidebarL() {
  const [tap, setTap] = useState(0);
  return (
    <div className={styles.sidebarL}>
      <ul className={styles.ul}>
        <li
          className={tap === 0 ? styles.select : styles.link}
          onClick={() => setTap(0)}
          role="none">
          <Link to="/">Home</Link>
        </li>
        <li>PUBLIC</li>
        <li
          className={tap === 1 ? styles.select : styles.link}
          onClick={() => setTap(1)}
          role="none">
          <Link to="/" className={styles.iconLink}>
            <ImEarth className={styles.icon} />
            Questions
          </Link>
        </li>
        <li
          className={tap === 2 ? styles.select : styles.link}
          onClick={() => setTap(2)}
          role="none">
          <Link>Tags</Link>
        </li>
        <li
          className={tap === 3 ? styles.select : styles.link}
          onClick={() => setTap(3)}
          role="none">
          <Link>Users</Link>
        </li>
        <li
          className={tap === 4 ? styles.select : styles.link}
          onClick={() => setTap(4)}
          role="none">
          <Link>Companies</Link>
        </li>
      </ul>
    </div>
  );
}

export default SidebarL;
