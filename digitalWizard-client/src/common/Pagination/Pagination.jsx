import styles from "./Pagination.module.css";

export default function Pagination({ pageNum, setPageNum, totalPage }) {
  const pagination = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <div className={styles.pagination}>
      <button
        title="이전 목록"
        className={styles.prev}
        disabled={pageNum === 0}
        onClick={() => setPageNum(prev => prev - 1)}>
        Prev
      </button>
      <div className={styles.pageNumber}>
        {pagination.map((page, i) => (
          <button
            key={page}
            className={`${i === pageNum && styles.active} ${styles.page}`}
            onClick={() => setPageNum(i)}>
            {page}
          </button>
        ))}
      </div>
      <button
        title="다음 목록"
        className={styles.next}
        disabled={totalPage - 1 === pageNum}
        onClick={() => setPageNum(prev => prev + 1)}>
        Next
      </button>
    </div>
  );
}
