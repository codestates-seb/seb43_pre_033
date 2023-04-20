import { useNavigate } from "react-router-dom";
import styles from "./Headline.module.css";

export default function Headline({ h2, position }) {
  const navigate = useNavigate();
  return (
    <div className={`${position && styles.detail} ${styles.headline}`}>
      <h2 className={styles.title}>{h2}</h2>
      <button
        onClick={() => navigate("/question/ask")}
        className={"btn btnPrimary"}>
        Ask Question
      </button>
    </div>
  );
}
