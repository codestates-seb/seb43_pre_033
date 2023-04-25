import styles from "./QuestionSection.module.css";
import Headline from "../../components/Headline/Headline.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuestion } from "../../api/questionApi";
import { RiFolderWarningLine } from "react-icons/ri";
import QuestionList from "../../components/QeustionList/QuestionList.jsx";
import SidebarR from "../../components/Sidebar/SidebarR/SidebarR.jsx";
import Pagination from "../../common/Pagination/Pagination.jsx";

export default function SearchPage({ pageNum, setPageNum }) {
  const sorted = ["Relevance", "Newest", "More"];
  const { keyword } = useParams();
  const [isEmpty, setisEmpty] = useState(true);
  const [questions, setQuestions] = useState(null);

  const [totalPage, setTotalPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (keyword.trim() !== "") {
      getQuestion(
        `/question/search?keyword=${keyword}&page=${pageNum}&size=10`
      ).then(data => {
        setisEmpty(data.result.empty);
        setQuestions(data.result.content);
        setPageNum(data.result.pageable.pageNumber);
        setTotalPage(data.result.totalPages);
        setTotal(data.result.totalElements);
      });
    }
  }, [keyword, pageNum]);

  return (
    <section className="section">
      <div className={styles.mainbar}>
        <div className={styles.titleWrap}>
          <Headline h2={"Search Results"} />
          <ul className={styles.searchInfo}>
            <li>
              Results for <strong>{keyword}</strong>
            </li>
            <li>
              Search options not <strong>deleted</strong>
            </li>
          </ul>
          <div className={styles.flexBox}>
            <p>{total} results</p>
            <Filters sorted={sorted} />
          </div>
        </div>
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
