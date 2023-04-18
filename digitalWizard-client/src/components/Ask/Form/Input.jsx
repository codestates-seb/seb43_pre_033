import { useState } from "react";
import AskTip from "../AskTip/AskTip.jsx";
import styles from "./Form.module.css";

export default function Input({ type, value, para, placeholder }) {
  const [focus, setFocus] = useState(false);

  return (
    <div className={styles.inputWrap}>
      {focus && <AskTip type={type} />}
      <div className={styles.inputBox}>
        <label className={styles.title} htmlFor={type}>
          {type}
        </label>
        <p className={styles.para}>{para}</p>
        <input
          {...value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={styles.input}
          type="text"
          id={type}
          placeholder={placeholder}
          required={type === "title"}
        />
      </div>
    </div>
  );
}
