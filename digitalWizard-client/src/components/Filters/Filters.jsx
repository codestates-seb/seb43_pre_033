import { useState } from "react";
import styles from "./Filters.module.css";

export default function Filters() {
  const sorted = ["Interestion", "Bountied", "Hot", "Week", "Month"];
  const [selected, setSelected] = useState("Interestion");

  return (
    <div className={styles.filters}>
      <div className={styles.sortedWrap}>
        {sorted.map((btn, i) => (
          <button
            key={i}
            className={`${styles.sorted} ${
              selected === btn && styles.selected
            } `}
            onClick={() => setSelected(btn)}>
            {btn}
            {btn === "Bountied" && <span className={styles.tag}>230</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
