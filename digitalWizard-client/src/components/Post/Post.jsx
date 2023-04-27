import styles from "./Post.module.css";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineClose } from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useModal from "../../hooks/useMdoal";
import Comment from "../Comment/Comment.jsx";
import { delQuestion, getQuestion, postQuestion } from "../../api/questionApi";

function Post({ data, QA, email }) {
  // 날짜 계산
  const edited = day(new Date(data.modifiedAt));
  const create = day(new Date(data.createdAt));
  const [bookmark, setBookmark] = useState(false);
  const [result, setResult] = useState(data.vote);
  const [likeStyle, setLikeStyle] = useState(false);
  const [hateStyle, setHateStyle] = useState(false);
  const [modal, openModal, closeModal] = useModal(false);
  const Authorization = localStorage.getItem("accessToken");
  const [accept, setAccept] = useState(false);

  const isLogin = () => {
    const email = localStorage.getItem("email");
    return email === data.member.email;
  };

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
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const url =
    QA === "Q"
      ? baseUrl + "/question/" + data.questionId
      : baseUrl + "/answer/" + data.answerId;

  function vote(vote) {
    postQuestion(null, `${url}/${vote}`)
      .then(res => {
        getQuestion(`${url}/results`).then(res => {
          setResult(res.result);
        });
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(res => {
        if (vote === "likes") {
          setLikeStyle(true);
          setHateStyle(false);
        } else {
          setLikeStyle(false);
          setHateStyle(true);
        }
      });
  }

  // 삭제 함수
  const location = useLocation();
  const currentPath = location.pathname;
  const delURL =
    QA === "Q" ? currentPath : currentPath + "/answers/" + data.answerId;
  function deletePost() {
    delQuestion(delURL).then(res => {
      QA === "A" && window.location.reload();
      if (QA === "Q") {
        getQuestion(`/question?size=20&page=0`);
        navigate("/question");
      }
    });
    closeModal();
  }

  // 답변 채택
  function answerAccept() {
    axios
      .patch(baseUrl + delURL + "/accept", {
        headers: {
          Authorization,
          withCredentials: true,
        },
      })
      .then(res => (res.resultCode === "SUCCESS" ? setAccept(true) : null));
  }

  // Edit Routing
  const navigate = useNavigate();
  const handleEdit = () => {
    QA === "Q" &&
      navigate(`/question/${data.id}/questionEdit`, { state: data });
    QA === "A" &&
      navigate(`${currentPath}/answerEdit/${data.answerId}`, { state: data });
    // 영은님 나중에 서버 연결되면 경로에 맞게 수정하세요 :)
  };

  return (
    <>
      <div className={`${QA === "A" && styles.border} ${styles.postWrap}`}>
        <div className={styles.post}>
          <div className={styles.vote}>
            <AiFillCaretUp
              className={`${likeStyle && styles.active} ${styles.up}`}
              onClick={() => vote("likes")}
              role="none"
            />
            <div>{result}</div>
            <AiFillCaretDown
              className={`${hateStyle && styles.active} ${styles.down}`}
              onClick={() => vote("hates")}
              role="none"
            />
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
              // bookmark click event 추가
            )}

            {QA === "A" && (data.accepted || accept) ? (
              <ImCheckmark className={styles.checkin} />
            ) : (
              <ImCheckmark
                className={email ? styles.check : styles.none}
                onClick={answerAccept}
              />
            )}
            <RxCounterClockwiseClock className={styles.clock} />
          </div>
          <div className={styles.detail}>
            <div className={styles.content}>
              {data.imageUrl &&
                data.imageUrl.map((img, i) => (
                  <img
                    className={styles.bodyimg}
                    src={img}
                    key={i}
                    alt={`img${i}`}
                  />
                ))}
              {data.body}
            </div>
            <div className={styles.tags}>
              {data.hashtags &&
                data.hashtags.map((tag, i) => (
                  <button key={i} className="btnSub tag">
                    {tag}
                  </button>
                ))}
            </div>
            <div className={styles.bottom}>
              <div className={styles.share}>
                <div>Share</div>
                {isLogin() && (
                  <>
                    <div onClick={handleEdit} role="none">
                      Edit
                    </div>
                    <div onClick={openModal} role="none">
                      Delete
                    </div>
                  </>
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
              {QA === "A" && create !== edited && (
                <div className={styles.edtied}>edited {edited}</div>
                // 답변이 수정 되었을 때만 렌더링
              )}
              {/* 사람프로필 */}
              <div
                className={`${QA === "Q" && styles.hasBg} ${styles.profile}`}>
                {/* 작성자 프로필 배경색 추가 class */}
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
        <Comment id={data.id} />
        {/* 댓글 컴포넌트 추가, 답변만 border 추가 */}
      </div>
    </>
  );
}

export default Post;
