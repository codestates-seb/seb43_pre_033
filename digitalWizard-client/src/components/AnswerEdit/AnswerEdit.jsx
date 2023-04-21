import Editor from "../Editor.jsx";
import styles from "./AnswerEdit.module.css";
import useInput from "../../hooks/useInput.js";
import { useState, useEffect } from "react";
import axios from "axios";

function AnswerEdit() {
  const [focus, setFocus] = useState(false);
  const [dataQ, setDataQ] = useState([]);
  const [dataA, setDataA] = useState([]);
  const [value] = useInput("", true);

  // 실제 url로 변경하고 토큰으로 유저정보도 확인해야함
  useEffect(() => {
    axios
      .get("http://localhost:4001/question/1")
      .then(res => setDataQ(res.data))
      .catch(error => console.log(error));

    axios
      .get("http://localhost:4001/answer/1001")
      .then(res => setDataA(res.data))
      .catch(error => console.log(error));
  }, []);

  console.log(value.value);
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
        <div className={styles.view}>{value.value}</div>
        <h2 className={styles.summary}>Edit Summary</h2>
        <input
          className={styles.input}
          placeholder="briefly explain your changes (corrected spelling, fixed grammar, improved formatting)"></input>
        <button className={`btnPrimary btn ${styles.btn}`}>Save edits</button>
        <button className={`btn ${styles.cancelBt}`}>Cancel</button>
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
