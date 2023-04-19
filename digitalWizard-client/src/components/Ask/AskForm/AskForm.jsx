import styles from "./AskForm.module.css";
import TextEditor from "../Form/TextEditor.jsx";
import Input from "../Form/Input.jsx";
import Dialog from "../Dialog/Dialog.jsx";
import useModal from "../../../hooks/useMdoal";
import useInput from "../../../hooks/useInput";
import { postQuestion } from "../../../api/questionApi";

export default function AskForm() {
  const [modal, openModal, closeModal] = useModal(false);
  const [titleValue, titleReset] = useInput("");
  const [tagValue, tagReset] = useInput("");
  const [bodyValue, bodyReset] = useInput("", true);

  const handleSubmit = () => {
    const payload = {
      title: titleValue.value,
      body: bodyValue.value,
    };
    postQuestion(payload);
    // redirect home 추가해야함!!
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="title"
          value={titleValue}
          para="Be specific and imagine you’re asking a question to another person."
          placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
        />
        <TextEditor value={bodyValue} />
        <Input
          type="tags"
          value={tagValue}
          para="Add up to 5 tags to describe what your question is about. Start typing to see suggestions."
          placeholder="e.g. (.net json vba)"
        />
        <div className={styles.btnWrap}>
          <button type="submit" className="btn btnPrimary">
            Review your question
          </button>
          <button
            type="button"
            className="btn btnDangerText"
            onClick={openModal}>
            Discard draft
          </button>
        </div>
      </form>

      {modal && (
        <Dialog
          titleReset={titleReset}
          tagReset={tagReset}
          bodyReset={bodyReset}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
