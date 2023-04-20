import { useState } from "react";
import styles from "./Filters.module.css";
import { MdArrowDropDown, MdFilterList } from "react-icons/md";

export default function Filters({ size }) {
  const sorted = ["Newest", "Active", "Bountied", "Unanswered"];
  const [selected, setSelected] = useState("Newest");
  const [filter, setFilter] = useState(false);

  return (
    <>
      <div className={styles.filters}>
        <span className={styles.size}>{size} questions</span>
        <div className={styles.btnGroup}>
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
            <button className={styles.sorted}>
              More <MdArrowDropDown />
            </button>
          </div>
          <button
            className={`btnSub ${styles.btnFilter} ${
              filter && styles.selected
            }`}
            onClick={() => setFilter(prev => !prev)}>
            <MdFilterList />
            Filter
          </button>
        </div>
      </div>

      {filter && (
        <form className={styles.dropFilter}>
          <div className={styles.filterWrap}>
            {filterList.map(filter => (
              <fieldset className={styles.fieldset} key={filter.legend}>
                <legend className={styles.legend}>{filter.legend}</legend>
                <ul>
                  {filter.item.map((list, i) => (
                    <li className={styles.list} key={filter.legend + i}>
                      <input
                        id={list}
                        type={filter.type}
                        name={filter}
                        value={list}
                      />
                      <label htmlFor={list}>{list}</label>
                    </li>
                  ))}
                  {filter.legend === "Tagged with" && (
                    <input
                      className={styles.inputTag}
                      type="text"
                      placeholder="e.g. javascript or python"
                    />
                  )}
                </ul>
              </fieldset>
            ))}
          </div>
          <div className={styles.btnWrap}>
            <button className="btn btnPrimary">Apply filter</button>
            <button className="btn btnSub">Save custom filter</button>
            <button
              onClick={() => setFilter(prev => !prev)}
              className={styles.btnCancle}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export const filterList = [
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
  {
    legend: "Tagged with",
    type: "radio",
    item: ["My watched tags", "The following tags:"],
  },
];
