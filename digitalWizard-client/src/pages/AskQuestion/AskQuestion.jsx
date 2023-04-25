import styles from "./AskQuestion.module.css";
import AskForm from "../../components/Ask/AskForm/AskForm.jsx";

export default function AskQuestion() {
  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>Ask a public question</h2>
        </div>
        <div className={styles.tipBox}>
          <h3 className={styles.tipTitle}>Writing a good question</h3>
          <p className={styles.tip}>
            You’re ready to <a href="#!">ask</a> a{" "}
            <a href="#!">programming-related question</a>
            and this form will help guide you through the process.
          </p>
          <p className={styles.tip}>
            Looking to ask a non-programming question? See{" "}
            <a href="#!">the topics here</a> to find a relevant site.
          </p>
          <h4 className={styles.stepTitle}>Steps</h4>
          <ul className={styles.steps}>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>
              Add “tags” which help surface your question to members of the
              community.
            </li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <AskForm />
      </section>
    </main>
  );
}
