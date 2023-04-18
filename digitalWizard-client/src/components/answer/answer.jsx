import Post from "../Post/Post.jsx";
import styles from "./answer.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Editor from "../Editor.jsx";
import useInput from "../../hooks/useInput.js";

function Answer() {
  // 실제 url http://localhost:8080/question/1/answers
  // /question/{questionId}/answers
  const [data, setData] = useState([]);
  const [bind, reset] = useInput("", true);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4001/answer")
      .then(res => setData(res.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className={styles.answer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{data.length + " Answers"}</h2>
        <div>sort</div>
      </div>
      {data.map(data => (
        <Post
          className={styles.post}
          key={data.id}
          data={data}
          // 질문은 Q로 수정
          QA={"A"}></Post>
      ))}
      <h2 className={styles.title}>Your Answer</h2>
      <Editor {...bind} setFocus={setFocus} />
      <button className={`btnPrimary btn ${styles.btn}`}>
        Post Your Answer
      </button>
    </div>
  );
}

export default Answer;
