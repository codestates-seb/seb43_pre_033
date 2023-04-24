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
      hashtags,
    };

    // json-server
    // const payload = {
    //   title: titleValue.value,
    //   body: bodyValue.value,
    //   vote: 0,
    //   view: 0,
    //   answerCount: 0,
    //   hashtags,
    //   createdAt: new Date(),
    //   modifiedAt: new Date(),
    //   member: {
    //     memberId: 1,
    //     email: "test1@gmail.com",
    //     profileImage:
    //       "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    //     memberNickName: "김야옹",
    //   },
    // };
    // console.log(payload);
    postQuestion(payload, "/question").then(data => console.log(data));
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
