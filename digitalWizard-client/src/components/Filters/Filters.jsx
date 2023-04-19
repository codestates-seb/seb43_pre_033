import styles from "./Filters.module.css";
import { MdArrowDropDown } from "react-icons/md";

export default function Filters() {
  const size = 23652257;
  const filterList = [
    {
      legend: "Filter by",
      type: "checkbox",
      item: ["No answers", "No accepted answer", "Has bounty"],
    },
    {
      legend: "Sorted by",
      type: "radio",
      item: [
        "Newest",
        "Recent activity",
        "Highest score",
        "Most frequent",
        "Bounty ending soon",
      ],
    },
  ];
  return (
    <>
      <div className={styles.filters}>
        <span className={styles.size}>{size.toLocaleString()} questions</span>
        <div className={styles.sortedWrap}>
          <button className={styles.sorted}>Newest</button>
          <button className={styles.sorted}>Active</button>
          <button className={styles.sorted}>
            Bountied <span className={styles.tag}>230</span>
          </button>
          <button className={styles.sorted}>Unanswered</button>
          <button className={styles.sorted}>
            More <MdArrowDropDown />
          </button>
        </div>
        <button className={styles.btnFilter}></button>
      </div>
      <div className={styles.dropFilter}>
        <fieldset>
          <legend>Filter by</legend>
          <ul>
            <li></li>
          </ul>
        </fieldset>
      </div>
    </>
  );
}
