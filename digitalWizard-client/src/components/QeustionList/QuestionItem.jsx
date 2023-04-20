import { formatAgo } from "../../hooks/formatDate";
import styles from "./QuestionItem.module.css";
import { Link } from "react-router-dom";

export default function QuestionItem({ question }) {
  const { id, title, body, vote, view, answerCount, createdAt } = question;
  const { profileImage, memberNickName } = question.member;

  return (
    <li className={styles.question}>
      <div className={styles.summary}>
        <span className={styles.vote}>
          <strong>{vote}</strong> votes
        </span>
        <span className={styles.answers}>
          <strong>{answerCount}</strong> answers
        </span>
        <span className={styles.views}>
          <strong>{view}</strong> views
        </span>
      </div>
      <div className={styles.postWrap}>
        <dl className={styles.post}>
          <dt className={styles.title}>
            <Link to={`/question/${id}`}>{title}</Link>
          </dt>
          <dd className={styles.body}>{body}</dd>
        </dl>
        <div className={styles.summaryBottom}>
          <div className={styles.tags}>
            <button className="btnSub tag">angular</button>
            <button className="btnSub tag">angular</button>
          </div>
          <div className={styles.user}>
            <a className={styles.profile} href="#!">
              <span className={styles.img}>
                <img src={profileImage} alt={memberNickName} />
              </span>

              <p className={styles.name}>{memberNickName}</p>
            </a>
            <strong className={styles.answer}> {answerCount}</strong>
            <span className={styles.date}>asked {formatAgo(createdAt)}</span>
          </div>
        </div>
      </div>
    </li>
  );
}
