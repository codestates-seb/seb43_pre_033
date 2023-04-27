import Editor from "../Editor.jsx";
import styles from "./AnswerEdit.module.css";
import useInput from "../../hooks/useInput.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Preview from "../Preview/Preview.jsx";
import { postQuestion } from "../../api/questionApi.js";

function AnswerEdit() {
  const [focus, setFocus] = useState(false);
  const [dataQ, setDataQ] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const questionId = location.pathname.split("/");
  const body = location.state?.body; //?을 붙이면 location.state 없을때 에러없이 undefined반환
  const [value] = useInput(body, true);
  const Authorization = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/question/${questionId[2]}`)
      .then(res => setDataQ(res.data.result))
      .catch(error => console.log(error));
  }, []);

  function patchAnswer(data) {
    postQuestion(
      data,
      `question/${questionId[2]}/answers/${questionId[4]}`,
      "patch"
    ).then(res => navigate(-1));

    // axios
    //   .patch(
    //     `${process.env.REACT_APP_BASE_URL}/question/${questionId[2]}/answers/${questionId[4]}`,
    //     {
    //       body: data,
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization,
    //         withCredentials: true,
    //       },
    //     }
    //   )
    //   .catch(error => console.log(error));
  }

  return (
    <div className={styles.answerEdit}>
      <div className={styles.content}>
        <div>
          <div className={styles.memo}>
            <p className={styles.memoTitle}>
              Your edit will be placed in a queue until it is peer reviewed.
            </p>
            <p>
              We welcome edits that make the post easier to understand and more
              valuable for readers. Because community members review edits,
              please try to make the post substantially better than how you
              found it, for example, by fixing grammar or adding additional
              resources and hyperlinks.
            </p>
          </div>
          <div>
            <div className={styles.title}>{dataQ.title}</div>
            <div className={styles.body}>{dataQ.body}</div>
          </div>
        </div>
        <h2 className={styles.answer}>Answer</h2>
        <Editor value={value} setFocus={setFocus} />
        <Preview className={styles.view} body={value.value} />
        <h2 className={styles.summary}>Edit Summary</h2>
        <input
          className={styles.input}
          placeholder="briefly explain your changes (corrected spelling, fixed grammar, improved formatting)"></input>
        <button
          className={`btnPrimary btn ${styles.btn}`}
          onClick={() => {
            patchAnswer(value.value);
          }}>
          Save edits
        </button>
        <button
          className={`btn ${styles.cancelBt}`}
          onClick={() => navigate(-1)}>
          Cancel
        </button>
      </div>
      <div className={styles.modal}>
        <div className={styles.shadow}>
          <p className={styles.memoTitle2}>How to Edit</p>
          <div className={styles.memo2}>
            <ul className={styles.ul}>
              <li>Correct minor typos or mistakes</li>
              <li>Clarify meaning without changing it</li>
              <li>Add related resources or links</li>
              <li>Always respect the author’s intent</li>
              <li>Don’t use edits to reply to the author</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerEdit;
