import styles from "./Post.module.css";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { RxCounterClockwiseClock } from "react-icons/rx";

function Post() {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.vote}>
          <AiFillCaretUp />
          <div>1</div>
          <AiFillCaretDown className={styles.down} />
          <FaBookmark />
          <FaRegBookmark />
          <ImCheckmark />
          <RxCounterClockwiseClock />
        </div>
        <div className={styles.detail}>질문내용</div>
      </div>
      <div className={styles.bottom}>
        <div>share Edit Follow</div>
        <div>edited</div>
        <div className={styles.profile}>작성자</div>
      </div>
    </>
  );
}

export default Post;
