import { useState } from "react";
import styles from "./Form.module.css";
import AskTip from "../AskTip/AskTip.jsx";
import Editor from "../../Editor.jsx";

export default function TextEditor({ value }) {
  const [focus, setFocus] = useState(false);

  return (
    <div className={styles.inputWrap}>
      {focus && <AskTip type="text" />}
      <div className={styles.inputBox}>
        <label className={styles.title} htmlFor="body">
          What are the details of your problem?
        </label>
        <p className={styles.para}>
          Introduce the problem and expand on what you put in the title. Minimum
          20 characters.
        </p>
        <Editor value={value} setFocus={setFocus} />
      </div>
    </div>
  );
}
