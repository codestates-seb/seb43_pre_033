import styles from "./AskForm.module.css";
import TextEditor from "../Form/TextEditor.jsx";
import Input from "../Form/Input.jsx";
import Dialog from "../Dialog/Dialog.jsx";
import useModal from "../../../hooks/useMdoal";
import useInput from "../../../hooks/useInput";
import { postQuestion } from "../../../api/questionApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AskForm() {
  const [modal, openModal, closeModal] = useModal(false);
  const [titleValue, titleReset] = useInput("");
  const [tagValue, tagReset] = useInput("");
  const [bodyValue, bodyReset] = useInput("", true);
  const [hashtags, setHashtags] = useState(tagValue.value);
  const navigate = useNavigate();
  const handleSubmit = () => {
    const payload = {
      title: titleValue.value,
      body: bodyValue.value,
      tags: hashtags,
    };
    postQuestion(payload, "/question");
    navigate("/question");
  };

  return (
    <>
      <form className={styles.form}>
        <Input
          type="title"
          value={titleValue}
          para="Be specific and imagine you’re asking a question to another person."
          placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
        />
        <TextEditor
          type="What are the details of your problem?"
          value={bodyValue}
          para="Introduce the problem and expand on what you put in the title. Minimum
          20 characters."
        />
        <Input
          type="tags"
          value={tagValue}
          tagReset={tagReset}
          para="Add up to 5 tags to describe what your question is about. Start typing to see suggestions."
          placeholder="e.g. (.net json vba)"
          hashtags={hashtags}
          setHashtags={setHashtags}
        />
        <div className={styles.btnWrap}>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btnPrimary">
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
          setHashtags={setHashtags}
        />
      )}
    </>
  );
}
