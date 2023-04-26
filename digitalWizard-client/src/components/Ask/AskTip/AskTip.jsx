import spotPencil from "../../../images/spotPencil.svg";
import styles from "./AskTip.module.css";

export default function AskTip({ type }) {
  return (
    <aside className={styles.tipBox}>
      {text.map(
        (el, i) =>
          el.type === type && (
            <div key={i} className={styles.wrap}>
              <div className={styles.title}>{el.title}</div>
              <div className={styles.body}>
                <div className={styles.img}>
                  <img src={spotPencil} alt="pencil icon" />
                </div>
                <div>
                  {el.body.p.map((p, i) => (
                    <p className={styles.text} key={i}>
                      {p}
                    </p>
                  ))}
                  {el.body.a && (
                    <a className={styles.link} href="#!">
                      {el.body.a}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
      )}
    </aside>
  );
}

export const text = [
  {
    type: "title",
    title: "Writing a good title",
    body: {
      p: [
        "Your title should summarize the problem.",
        "You might find that you have a better idea of your title after writing out the rest of the question.",
      ],
    },
  },
  {
    type: "What are the details of your problem?",
    title: "Introduce the problem",
    body: {
      p: [
        "Explain how you encountered the problem you’re trying to solve, and any difficulties that have prevented you from solving it yourself.",
      ],
    },
  },
  {
    type: "tags",
    title: "Adding tags",
    body: {
      p: [
        "Tags help ensure that your question will get attention from the right people.",
        "Tag things in more than one way so people can find them more easily. Add tags for product lines, projects, teams, and the specific technologies or languages used.",
      ],
      a: "Learn more about tagging",
    },
  },
];
