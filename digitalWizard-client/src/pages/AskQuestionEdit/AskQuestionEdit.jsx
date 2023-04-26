import styles from "./AskQuestionEdit.module.css";
import { Form, useLocation, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import Input from "../../components/Ask/Form/Input.jsx";
import TextEditor from "../../components/Ask/Form/TextEditor.jsx";
import { useState } from "react";
import SidebarR from "../../components/Sidebar/SidebarR/SidebarR.jsx";
import { getQuestion, postQuestion } from "../../api/questionApi";
import Preview from "../../components/Preview/Preview.jsx";

export default function AskQuestionEdit() {
  const { state: question } = useLocation();
  const [titleValue] = useInput(question.title);
  const [bodyValue] = useInput(question.body, true);
  const [tagValue, tagReset] = useInput("");
  const [hashtags, setHashtags] = useState(question.hashtags);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = {
      title: titleValue.value,
      body: bodyValue.value,
      tags: hashtags,
    };
    postQuestion(payload, `/question/${question.questionId}`, "patch");
    getQuestion(`/question?size=20&page=0`);
    navigate(`/question`);
  };

  return (
    <section className="section">
      <div className={styles.mainbar}>
        <dl className={styles.info}>
          <dt>
            Your edit will be placed in a queue until it is peer reviewed.
          </dt>
          <dd>
            We welcome edits that make the post easier to understand and more
            valuable for readers. Because community members review edits, please
            try to make the post substantially better than how you found it, for
            example, by fixing grammar or adding additional resources and
            hyperlinks.
          </dd>
        </dl>
        <form className={styles.form}>
          <Input
            type="title"
            value={titleValue}
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            edit={true}
          />
          <TextEditor type="body" value={bodyValue} edit={true} />
          <Input
            type="tags"
            value={tagValue}
            tagReset={tagReset}
            placeholder="e.g. (.net json vba)"
            edit={true}
            hashtags={hashtags}
            setHashtags={setHashtags}
          />
          <Preview body={bodyValue.value} />
          <div className={styles.btnWrap}>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btnPrimary">
              Save edits
            </button>
            <button
              onClick={() => navigate(-1)}
              type="button"
              className={`${styles.blue} btn btnNormal`}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <SidebarR />
    </section>
  );
}
