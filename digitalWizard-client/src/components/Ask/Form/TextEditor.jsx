import { useState } from "react";
import styles from "./Form.module.css";
import AskTip from "../AskTip/AskTip.jsx";
import Editor from "../../Editor.jsx";

export default function TextEditor({ type, value, para, edit = false }) {
  const [focus, setFocus] = useState(false);

  return (
    <div className={styles.inputWrap}>
      {focus && <AskTip type="text" edit={edit} />}
      <div className={`${edit && styles.editVer} ${styles.inputBox}`}>
        <label className={styles.title} htmlFor="body">
          {type}
        </label>
        <p className={styles.para}>{para}</p>
        <Editor value={value} setFocus={setFocus} />
      </div>
    </div>
  );
}
