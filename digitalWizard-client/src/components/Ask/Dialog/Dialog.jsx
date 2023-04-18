import { AiOutlineClose } from "react-icons/ai";
import styles from "./Dialog.module.css";

export default function Dialog({
  titleReset,
  tagReset,
  bodyReset,
  closeModal,
}) {
  const handleReset = () => {
    titleReset();
    tagReset();
    bodyReset();
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.btnClose} onClick={closeModal}>
          <AiOutlineClose />
        </button>
        <dl className={styles.modalMsg}>
          <dt className={styles.msgHead}>Discard question</dt>
          <dd className={styles.msgBody}>
            Are you sure you want to discard this question? This cannot be
            undone.
          </dd>
        </dl>
        <div>
          <button className="btn btnDanger" onClick={handleReset}>
            Discard question
          </button>
          <button className="btn btnNormal" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
