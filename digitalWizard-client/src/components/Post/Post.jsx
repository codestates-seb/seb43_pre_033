import styles from "./Post.module.css";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { RxCounterClockwiseClock } from "react-icons/rx";
// import { useState } from "react";

function Post({ data }) {
  // const [day, setDay] = useState(null);
  return (
    <div className={styles.post}>
      <div className={styles.vote}>
        <AiFillCaretUp className={styles.up} />
        <div>{data.vote}</div>
        <AiFillCaretDown className={styles.down} />
        <FaBookmark className={styles.checkMark} />
        <FaRegBookmark className={styles.mark} />
        <ImCheckmark className={styles.check} />
        <RxCounterClockwiseClock className={styles.clock} />
      </div>
      <div className={styles.detail}>
        <div className={styles.content}>{data.body}</div>
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
                src={data.member.profileImage}
                alt="아바타이미지"
                className={styles.img}
              />
              <div className={styles.userDetail}>
                <div className={styles.name}>{data.member.memberNickName}</div>
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
