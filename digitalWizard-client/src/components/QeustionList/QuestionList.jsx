import QuestionItem from "./QuestionItem.jsx";

export default function QuestionList({ questions }) {
  return (
    <div>
      {questions &&
        questions.map(q => <QuestionItem question={q} key={q.questionId} />)}
    </div>
  );
}
