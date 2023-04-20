import Filters from "../Filters/Filters.jsx";
import Headline from "../Headline/Headline.jsx";
import styles from "./QuestionSection.module.css";
import QuestionList from "../QeustionList/QuestionList.jsx";
import { useEffect, useState } from "react";
import { getQuestion } from "../../api/questionApi";

export default function QuestionSection() {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    getQuestion("/question").then(data => setQuestions(data));
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.mainbar}>
        <div className={styles.titleWrap}>
          <Headline h2={"All Questions"} />
          <Filters size={questions && questions.length.toLocaleString()} />
        </div>
        <div className={styles.questionsWrap}>
          <QuestionList questions={questions} />
          {/* pager */}
        </div>
      </div>
      {/* 오른쪽 사이드바 aside compo */}
    </section>
  );
}
