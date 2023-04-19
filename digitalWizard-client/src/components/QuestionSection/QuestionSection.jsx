import Filters from "../Filters/Filters.jsx";
import Headline from "../Headline/Headline.jsx";
import styles from "./QuestionSection.module.css";

export default function QuestionSection() {
  return (
    <section>
      <div className={styles.mainbar}>
        <Headline h2={"All Questions"} />
        <Filters />
      </div>
      {/* 오른쪽 사이드바 aside compo */}
    </section>
  );
}
