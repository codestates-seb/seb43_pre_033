import { useState } from "react";
import styles from "./Filters.module.css";

export default function Filters({ sorted }) {
  const [selected, setSelected] = useState(sorted[0]);

  return (
    <div className={styles.filters}>
      <div className={styles.sortedWrap}>
        {sorted &&
          sorted.map((btn, i) => (
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
