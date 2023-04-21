import styles from "./AskForm.module.css";
import TextEditor from "../Form/TextEditor.jsx";
import Input from "../Form/Input.jsx";
import Dialog from "../Dialog/Dialog.jsx";
import useModal from "../../../hooks/useMdoal";
import useInput from "../../../hooks/useInput";
import { postQuestion } from "../../../api/questionApi";
import { useNavigate } from "react-router-dom";

export default function AskForm() {
  const [modal, openModal, closeModal] = useModal(false);
  const [titleValue, titleReset] = useInput("");
  const [tagValue, tagReset] = useInput("");
  const [bodyValue, bodyReset] = useInput("", true);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // test용 payload
    const payload = {
      title: titleValue.value,
      body: bodyValue.value,
      vote: 0,
      view: 0,
      answerCount: 0,
      createdAt: new Date(),
      modifiedAt: "2023-04-17T14:42:40.279535",
      member: {
        memberId: 1,
        email: "cat@gmail.com",
        profileImage:
          "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
        memberNickName: "김야옹",
      },
    };
    // const payload = {
    //   title: titleValue.value,
    //   body: bodyValue.value,
    // };
    postQuestion(payload, "/question");
    navigate("/question");
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
        <TextEditor
          type="What are the details of your problem?"
          value={bodyValue}
          para="Introduce the problem and expand on what you put in the title. Minimum
          20 characters."
        />
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
