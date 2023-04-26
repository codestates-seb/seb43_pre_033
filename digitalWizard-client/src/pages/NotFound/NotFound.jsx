import styles from "./NotFound.module.css";
import errorImg from "../../images/errorImg.svg";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <section className={styles.wrap}>
        <div className={styles.flexBox}>
          <img className={styles.img} src={errorImg} alt="Not Found" />
          <div className={styles.textWrap}>
            <h2 className={styles.headline}>Page not found</h2>
            <p className={styles.para}>
              We&apos;re sorry, we couldn&apos;t find the page you requested.
            </p>
            <ul className={styles.linkBox}>
              <li>
                Try searching for <a href="/question">similar questions</a>
              </li>
              <li>
                Browse our <a href="/question">recent questions</a>
              </li>
              <li>
                Browse our <a href="/">main</a>
              </li>
              <li>
                If you feel something is missing that should be here,{" "}
                <a href="https://github.com/codestates-seb/seb43_pre_033">
                  contact us.
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
