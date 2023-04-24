import Post from "../Post/Post.jsx";
import styles from "./answer.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Editor from "../Editor.jsx";
import useInput from "../../hooks/useInput.js";
import { useLoginInfoStore } from "../../stores/loginStore.js";

function Answer({ id, qemail }) {
  const [data, setData] = useState([]);
  const [value] = useInput("", true);
  const [focus, setFocus] = useState(false);
  const Authorization = localStorage.getItem("accessToken");
  const { loginInfo } = useLoginInfoStore(state => state);
  const [email, setEmail] = useState(loginInfo.email === qemail);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/question/${id}/answers`)
      .then(res => setData(res.data.result.content))
      .catch(error => console.log(error));
  }, []);

  function answerAdd(data) {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/question/${id}/answers`, {
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization,
          withCredentials: true,
        },
      })
      .catch(error => console.log(error));
  }

  return (
    <div className={styles.answer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{data.length + " Answers"}</h2>
        <div className={styles.sort}>
          <label className={styles.sortLabel} htmlFor="sortAnswer">
            Sorted by:
          </label>
          <select className={styles.sortInput} name="sorted" id="sortAnswer">
            <option value="scoredDesc">Highest score &#40;default&#41;</option>
            <option value="trending">
              Trending &#40;recent votes count more&#41;
            </option>
            <option value="modifiedDesc">
              Date modified &#40;newest first&#41;
            </option>
            <option value="createDesc">
              Date created &#40;oldest first&#41;
            </option>
          </select>
        </div>
        {/* sorted by 추가 */}
      </div>
      {data.map(data => (
        <Post
          className={styles.post}
          key={data.answerId}
          data={data}
          // 질문은 Q로 수정
          QA={"A"}
          email={email}></Post>
      ))}
      <h2 className={styles.title}>Your Answer</h2>
      <Editor value={value} setFocus={setFocus} />
      <button
        className={`btnPrimary btn ${styles.btn}`}
        onClick={() => answerAdd(value.value)}>
        Post Your Answer
      </button>
    </div>
  );
}

export default Answer;
