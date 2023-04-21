import Filters from "../../components/Filters/Filters.jsx";
import Headline from "../../components/Headline/Headline.jsx";
import styles from "./QuestionSection.module.css";
import QuestionList from "../../components/QeustionList/QuestionList.jsx";
import { useEffect, useState } from "react";
import { getQuestion } from "../../api/questionApi.js";
import { RiFolderWarningLine } from "react-icons/ri";

export default function QuestionSection() {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    getQuestion("/question").then(data => {
      // getQuestion("/question?size=20&page=0").then(data => {
      // setQuestions(data.result.content);
      setQuestions(data);
      console.log(data);
    });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.mainbar}>
        <div className={styles.titleWrap}>
          <Headline h2={"Top Questions"} />
          <Filters />
        </div>
        {questions ? (
          <div className={styles.questionsWrap}>
            <QuestionList questions={questions} />
            {/* pager */}
          </div>
        ) : (
          <div className={styles.empty}>
            <RiFolderWarningLine className={styles.emptyIco} />
            <p className={styles.emptyMent}>질문 목록이 없습니다.</p>
          </div>
        )}
      </div>
      {/* 오른쪽 사이드바 aside compo */}
    </section>
  );
}
