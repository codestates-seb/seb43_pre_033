import styles from "./Post.module.css";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { RxCounterClockwiseClock } from "react-icons/rx";
// import axios from "axios";

function Post({ data, QA }) {
  const edited = day(new Date(data.modifiedAt));
  const create = day(new Date(data.createdAt));

  function day(date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${month} ${day}, ${year} at ${hour}:${minute}`;
  }

  // const baseUrl = "base";
  // const url =
  //   QA === "Q"
  //     ? baseUrl + "/question/" + data.id
  //     : baseUrl + "/answer/" + data.id;

  // function like() {
  //   axios.post(url + "/likes", {
  //     data: "",
  //     headers: {
  //       Authorization: "token",
  //     },
  //   });
  // }

  return (
    <div className={styles.post}>
      <div className={styles.vote}>
        <AiFillCaretUp className={styles.up} />
        <div>{data.vote}</div>
        <AiFillCaretDown className={styles.down} />
        <FaBookmark className={styles.checkMark} />
        <FaRegBookmark className={styles.mark} />
        {QA === "A" && data.accepted ? (
          <ImCheckmark className={styles.checkin} />
        ) : null}
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
          <div className={styles.edtied}>edited {edited}</div>
          <div className={styles.profile}>
            <div className={styles.create}>
              {QA === "A" ? "answered " + create : "aked " + create}
            </div>
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
