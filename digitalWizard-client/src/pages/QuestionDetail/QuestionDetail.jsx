import { useLocation } from "react-router-dom";
import styles from "./QuestionDetail.module.css";
import Headline from "../../components/Headline/Headline.jsx";
import { formatAgo } from "../../hooks/formatDate";
import Post from "../../components/Post/Post.jsx";
import Answer from "../../components/answer/answer.jsx";
import useScrollTop from "../../hooks/useScrollTop";
import SidebarR from "../../components/Sidebar/SidebarR/SidebarR.jsx";

export default function QuestionDetail() {
  useScrollTop();
  const {
    state: { post },
  } = useLocation();

  return (
    <section className={`${styles.mainbar} section`}>
      <div className={styles.titleWrap}>
        <Headline position="detail" h2={post.title} />
        <ul className={styles.summary}>
          <li>
            Asked
            <span className={styles.bold}>{formatAgo(post.createdAt)}</span>
          </li>
          <li>
            Modified
            <span className={styles.bold}>{formatAgo(post.modifiedAt)}</span>
          </li>
          <li>
            Viewed<span className={styles.bold}>{post.view} times</span>
          </li>
        </ul>
      </div>
      <div className={styles.flexBox}>
        <div className={styles.bodyWrap}>
          <Post data={post} QA={"Q"} />
          <Answer id={post.questionId} qemail={post.member.email} />
        </div>
        <SidebarR />
      </div>
    </section>
  );
}
