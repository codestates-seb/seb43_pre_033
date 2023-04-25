import { AiOutlineClose } from "react-icons/ai";
import styles from "./Dialog.module.css";
import { useNavigate } from "react-router-dom";
import { useIsLoginStore } from "../../../stores/loginStore";

export default function Dialog({
  titleReset,
  tagReset,
  bodyReset,
  closeModal,
  setHashtags,
  head = "Discard question",
  body = " Are you sure you want to discard this question? This cannot be undone.",
  click = "Discard question",
}) {
  const navigate = useNavigate();
  const { setIsLogin } = useIsLoginStore(state => state);
  const handleReset = e => {
    titleReset && titleReset();
    tagReset && tagReset();
    bodyReset && bodyReset();
    setHashtags && setHashtags([]);
    closeModal();

    // log out
    if (e.target.textContent === "Log out") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLogin(false);
      navigate("/");
    }
  };

  const handleModal = e => e.target.classList.contains("close") && closeModal();

  return (
    <div className={`close ${styles.modal}`} onClick={handleModal} role="none">
      <div className={styles.modalContent}>
        <button className={styles.btnClose} onClick={closeModal}>
          <AiOutlineClose />
        </button>
        <dl className={styles.modalMsg}>
          <dt className={styles.msgHead}>{head}</dt>
          <dd className={styles.msgBody}>{body}</dd>
        </dl>
        <div>
          <button className="btn btnDanger" onClick={handleReset}>
            {click}
          </button>
          <button className="btn btnNormal" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
