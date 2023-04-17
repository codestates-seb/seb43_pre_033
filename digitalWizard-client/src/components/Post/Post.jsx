import styles from "./Post.module.css";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { RxCounterClockwiseClock } from "react-icons/rx";

function Post() {
  return (
    <div className={styles.post}>
      <div className={styles.vote}>
        <AiFillCaretUp className={styles.up} />
        <div>1</div>
        <AiFillCaretDown className={styles.down} />
        <FaBookmark className={styles.checkMark} />
        <FaRegBookmark className={styles.mark} />
        <ImCheckmark className={styles.check} />
        <RxCounterClockwiseClock className={styles.clock} />
      </div>
      <div className={styles.detail}>
        <div className={styles.content}>질문내용</div>
        <div className={styles.bottom}>
          <div className={styles.share}>
            <div>Share</div>
            <div>Edit</div>
            <div>Follow</div>
          </div>
          <div className={styles.edtied}>edited 9 mins ago</div>
          <div className={styles.profile}>
            <div className={styles.create}>answered 31 min ago</div>
            <div className={styles.user}>
              <img
                src="https://avatars.githubusercontent.com/u/120456261?v=4"
                alt="아바타이미지"
                className={styles.img}
              />
              <div className={styles.userDetail}>
                <div className={styles.name}>이름</div>
                <div>
                  <span className={styles.userScore}>1,463</span>
                  <span className={styles.silver}>8</span>
                  <span className={styles.bronze}>8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
