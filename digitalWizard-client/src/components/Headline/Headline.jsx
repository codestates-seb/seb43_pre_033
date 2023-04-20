import { useNavigate } from "react-router-dom";
import styles from "./Headline.module.css";

export default function Headline({ h2 }) {
  const navigate = useNavigate();
  return (
    <div className={styles.headline}>
      <h2 className={styles.title}>{h2}</h2>
      <button
        onClick={() => navigate("/question/ask")}
        className={"btn btnPrimary"}>
        Ask Question
      </button>
    </div>
  );
}
