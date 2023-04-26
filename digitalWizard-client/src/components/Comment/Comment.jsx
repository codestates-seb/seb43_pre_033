import { useState } from "react";
import styles from "./Comment.module.css";
import { GrFormClose } from "react-icons/gr";

export default function Comment({ id }) {
  const [alert, setAlert] = useState(false);
  // const [clickId, setClickId] = useState(null);

  return (
    <div className={styles.comment}>
      <button onClick={() => setAlert(true)}>Add a comment</button>
      {alert && (
        <div data-id={id} className={styles.alertBox}>
          <p className={styles.ment}>
            You must have <span className={styles.underline}>50 reputaion</span>{" "}
            to comment
          </p>
          <button className={styles.btnClose} onClick={() => setAlert(false)}>
            <GrFormClose className={styles.icon} />
          </button>
        </div>
      )}
    </div>
  );
}
