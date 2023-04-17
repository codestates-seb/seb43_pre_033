import Vote from "../vote/vote.jsx";
import styles from "./answer.module.css";

function Answer() {
  return (
    <div className={styles.answer}>
      <div className={styles.header}>
        <h2 className={styles.total}>2 Asnwers</h2>
        <div>sort</div>
      </div>
      <div className={styles.content}>
        <Vote className={styles.button}>버튼</Vote>
        <div className={styles.detail}>질문내용</div>
      </div>
      <div className={styles.bottom}>
        <div>share Edit Follow</div>
        <div>edited</div>
        <div className={styles.profile}>작성자</div>
      </div>
    </div>
  );
}

export default Answer;
