import styles from "./AskQuestionEdit.module.css";
import { useLocation } from "react-router-dom";
import useInput from "../../hooks/useInput";
import Input from "../../components/Ask/Form/Input.jsx";
import TextEditor from "../../components/Ask/Form/TextEditor.jsx";
import AskForm from "../../components/Ask/AskForm/AskForm.jsx";

export default function AskQuestionEdit() {
  const { state: question } = useLocation();
  const [titleValue] = useInput(question.title);
  const [bodyValue] = useInput(question.body, true);
  // const [tagValue] = useInput(question.hashtags);

  const handleSubmit = () => {
    console.log("patch");
  };

  return (
    <section className={styles.section}>
      {/* 왼쪽 nav bar */}
      <div className={styles.mainbar}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="title"
            value={titleValue}
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            edit={true}
          />
          <TextEditor type="body" value={bodyValue} edit={true} />
          <div>미리보기</div>
          <Input
            type="tags"
            // value={tagValue}
            placeholder="e.g. (.net json vba)"
            edit={true}
          />
          <div className={styles.btnWrap}>
            <button type="submit" className="btn btnPrimary">
              Review your question
            </button>
            <button type="button" className="btn btnNormal">
              Discard draft
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
