import { useState } from "react";
import AskTip from "../AskTip/AskTip.jsx";
import styles from "./Form.module.css";
import { GrFormClose } from "react-icons/gr";

export default function Input({
  type,
  value,
  tagReset,
  para,
  placeholder,
  edit = false,
  hashtags,
  setHashtags,
}) {
  const [focus, setFocus] = useState(false);

  const handleKeyUp = e => {
    if (type === "tags" && e.key === "Enter" && value.value.trim() !== "") {
      const newHashtags = type === "tags" && [...hashtags, value.value.trim()];
      setHashtags(newHashtags);
      tagReset();
      e.preventDefault();
    }
  };

  return (
    <div className={styles.inputWrap}>
      {!edit && focus && <AskTip type={type} />}
      <div className={edit ? styles.editBox : styles.inputBox}>
        <label className={styles.title} htmlFor={type}>
          {type}
        </label>
        <p className={styles.para}>{para}</p>
        <div className={styles.position}>
          <div className={styles.hashTags}>
            {hashtags &&
              hashtags.map((tag, i) => (
                <span key={i} className={`${styles.tag} btnSub tag`}>
                  {tag}
                  <button
                    className={styles.btnDel}
                    type="button"
                    onClick={() =>
                      setHashtags(hashtags.filter(el => el !== tag))
                    }>
                    <GrFormClose className={styles.delIcon} />
                  </button>
                </span>
              ))}
          </div>
          <input
            {...value}
            onKeyUp={handleKeyUp}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={styles.input}
            type="text"
            id={type}
            placeholder={hashtags ? "" : placeholder}
            required={type === "title"}
          />
        </div>
      </div>
    </div>
  );
}
