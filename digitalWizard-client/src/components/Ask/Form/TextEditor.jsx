import { useState } from "react";
import styles from "./Form.module.css";
import AskTip from "../AskTip/AskTip.jsx";
import Editor from "../../Editor.jsx";

export default function TextEditor({ type, value, para, edit = false }) {
  const [focus, setFocus] = useState(false);

  return (
    <div className={styles.inputWrap}>
      {!edit && focus && <AskTip type={type} />}
      <div className={edit ? styles.editBox : styles.inputBox}>
        <label className={styles.title} htmlFor="body">
          {type}
        </label>
        <p className={styles.para}>{para}</p>
        <Editor value={value} setFocus={setFocus} />
      </div>
    </div>
  );
}
