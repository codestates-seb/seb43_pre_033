import Post from "../Post/Post.jsx";
import styles from "./answer.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Answer() {
  // 실제 url http://localhost:8080/question/1/answers
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/answer")
      .then(res => setData(res.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className={styles.answer}>
      <div className={styles.header}>
        <h2 className={styles.total}> Answers</h2>
        <div>sort</div>
      </div>
      {data.map(data => (
        <Post key={data.id} data={data}></Post>
      ))}
    </div>
  );
}

export default Answer;
