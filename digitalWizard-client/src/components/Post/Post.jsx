import styles from "./Post.module.css";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineClose } from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Comment from "../Comment/Comment.jsx";
import useModal from "../../hooks/useMdoal";

//
function Post({ data, QA }) {
  // 날짜 계산
  const edited = day(new Date(data.modifiedAt));
  const create = day(new Date(data.createdAt));
  const [bookmark, setBookmark] = useState(false);
  const [result, setResult] = useState(data.vote);
  const [modal, openModal, closeModal] = useModal(false);

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

  // 좋아요, 싫어요 함수
  const baseUrl = "base";
  const url =
    QA === "Q"
      ? baseUrl + "/question/" + data.id
      : baseUrl + "/answer/" + data.id;

  function like() {
    axios
      .post(url + "/likes", {
        data: "",
        headers: {
          Authorization: "token",
        },
      })
      .get(url + "/results")
      .then(res => setResult(res.result));
  }

  function hate() {
    axios
      .post(url + "/hates", {
        data: "",
        headers: {
          Authorization: "token",
        },
      })
      .get(url + "/results")
      .then(res => setResult(res.result));
  }

  // 삭제 함수
  const location = useLocation();
  const currentPath = location.pathname;
  const delURL = QA === "Q" ? currentPath : currentPath + "/answers/" + data.id;
  function deletePost() {
    // axios.delete(delURL, {
    //   headers: {
    //     Authorization: "token",
    //   },
    // });

    // json 서버 테스트용
    axios.delete("http://localhost:4001/answer/" + data.id);
  }

  // Edit Routing
  const navigate = useNavigate();
  const handleEdit = () => {
    QA === "Q" &&
      navigate(`/question/${data.id}/questionEdit`, { state: data });
    QA === "A" && navigate(`/question/:questionId/answerEdit/:answerId`);
    // 영은님 나중에 서버 연결되면 경로에 맞게 수정하세요 :)
  };

  return (
    <div className={`${QA === "A" && styles.border} ${styles.postWrap}`}>
      <div className={styles.post}>
        <div className={styles.vote}>
          <AiFillCaretUp className={styles.up} />
          <div>{result}</div>
          <AiFillCaretDown className={styles.down} />
          {bookmark ? (
            <FaBookmark
              onClick={() => setBookmark(prev => !prev)}
              className={styles.checkMark}
            />
          ) : (
            <FaRegBookmark
              onClick={() => setBookmark(prev => !prev)}
              className={styles.mark}
            />
          )}
          {/* // bookmark click event 추가 */}
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
              <div onClick={handleEdit} role="none">
                Edit
              </div>
              <div onClick={openModal} role="none">
                Delete
              </div>
              {QA === "A" && create !== edited && (
                <div className={styles.edtied}>edited {edited}</div>
                // 답변이 수정 되었을 때만 렌더링
              )}
            </div>
            {/* 삭제 확인 모달 */}
            {modal ? (
              <div
                className={`close ${styles.modal}`}
                // onClick={handleModal}
                role="none">
                <div className={styles.modalContent}>
                  <button className={styles.btnClose}>
                    <AiOutlineClose onClick={closeModal} role="none" />
                  </button>
                  <dl className={styles.modalMsg}>
                    <dt className={styles.msgHead}>
                      {QA === "A" ? "Discard Answer" : "Discard Question"}
                    </dt>
                    <dd className={styles.msgBody}>
                      {QA === "A"
                        ? "Are you sure you want to discard this Answer? This cannot be undone."
                        : "Are you sure you want to discard this Question? This cannot be undone."}
                    </dd>
                  </dl>
                  <div>
                    <button
                      className="btn btnDanger"
                      onClick={() => deletePost()}>
                      {QA === "A" ? "Discard Answer" : "Discard Question"}
                    </button>
                    <button className="btn btnNormal" onClick={closeModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            <div className={styles.edtied}>edited {edited}</div>
            {/* 사람프로필 */}
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
                  <div className={styles.name}>
                    {data.member.memberNickName}
                  </div>
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
    </div>
  );
}

export default Post;
