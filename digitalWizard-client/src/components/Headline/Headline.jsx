import styles from "./Headline.module.css";

export default function Headline({ h2 }) {
  return (
    <div className={styles.headline}>
      <h2 className={styles.title}>{h2}</h2>
      <button className="btn btnPrimary">Ask Question</button>
    </div>
  );
}
