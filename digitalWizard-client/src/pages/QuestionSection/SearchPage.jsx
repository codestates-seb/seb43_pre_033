import styles from "./QuestionSection.module.css";
import Headline from "../../components/Headline/Headline.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import QuestionList from "../../components/QeustionList/QuestionList.jsx";
import Pagination from "../../common/Pagination/Pagination.jsx";
import SidebarR from "../../components/Sidebar/SidebarR/SidebarR.jsx";
import { RiFolderWarningLine } from "react-icons/ri";

export default function SearchPage({
  isEmpty,
  questions,
  pageNum,
  setPageNum,
  totalPage,
}) {
  return (
    <section className="section">
      <div className={styles.mainbar}>
        <div className={styles.titleWrap}>
          <Headline h2={"Search Results"} />
          <div>
            <p>Results for react</p>
            <p>Search options not deleted</p>
          </div>
          <Filters />
        </div>
      </div>
    </section>
  );
}
