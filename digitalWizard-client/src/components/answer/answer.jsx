import Post from "../Post/Post.jsx";
import styles from "./answer.module.css";

function Answer() {
  return (
    <div className={styles.answer}>
      <div className={styles.header}>
        <h2 className={styles.total}>2 Asnwers</h2>
        <div>sort</div>
      </div>
      <Post />
    </div>
  );
}

export default Answer;
