// eslint-disable-next-line import/no-unresolved
import styles from "./InputBox.module.css";

function InputBox({
  label,
  desc,
  value,
  onChange,
  htmlFor,
  inputId,
  inputName,
  placeholder,
  maxLength,
}) {
  return (
    <div className={styles.boxBorder}>
      <label htmlFor={htmlFor} className={styles.labelTitle}>
        {label}
      </label>
      <label htmlFor={htmlFor} className={styles.description}>
        {desc}
      </label>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        id={inputId}
        name={inputName}
        type="text"
        maxLength={maxLength}
        placeholder={placeholder}></input>
    </div>
  );
}

export default InputBox;
