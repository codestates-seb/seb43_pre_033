import Filters from "../../components/Filters/Filters.jsx";
import Headline from "../../components/Headline/Headline.jsx";
import styles from "./QuestionSection.module.css";
import QuestionList from "../../components/QeustionList/QuestionList.jsx";
import { useEffect, useState } from "react";
import { getQuestion } from "../../api/questionApi.js";
import { RiFolderWarningLine } from "react-icons/ri";
import SidebarR from "../../components/Sidebar/SidebarR/SidebarR.jsx";
import Pagination from "../../common/Pagination/Pagination.jsx";

export default function QuestionSection() {
  const [isEmpty, setisEmpty] = useState(true);
  const [questions, setQuestions] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const sorted = ["Interestion", "Bountied", "Hot", "Week", "Month"];

  useEffect(() => {
    getQuestion(`/question?size=20&page=${pageNum}`).then(data => {
      setisEmpty(data.result.empty);
      setQuestions(data.result.content);
      setPageNum(data.result.pageable.pageNumber);
      setTotalPage(data.result.totalPages);
    });
  }, [pageNum]);

  return (
    <section className="section">
      <div className={styles.mainbar}>
        <div className={styles.titleWrap}>
          <Headline h2={"Top Questions"} />
          <Filters sorted={sorted} />
        </div>
        {/* result.empty 여부로 변경하기 */}
        {!isEmpty ? (
          <div className={styles.questionsWrap}>
            <QuestionList questions={questions} />
            <Pagination
              pageNum={pageNum}
              setPageNum={setPageNum}
              totalPage={totalPage}
            />
          </div>
        ) : (
          <div className={styles.empty}>
            <RiFolderWarningLine className={styles.emptyIco} />
            <p className={styles.emptyMent}>질문 목록이 없습니다.</p>
          </div>
        )}
      </div>
      <SidebarR />
    </section>
  );
}
