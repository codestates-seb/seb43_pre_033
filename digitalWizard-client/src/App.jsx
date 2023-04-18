import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
// import QuestionDetail from "./pages/QuestionDetail/QuestionDetail.jsx";
import AskQuestion from "./pages/AskQuestion/AskQuestion.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/question" />
        <Route path="/question/ask" element={<AskQuestion />} />
        <Route path="/question/:questionId" />
        <Route path="/question/:questionId/questionEdit" />
        <Route path="/question/:questionId/answerEdit/:answerId" />
        <Route path="/users/signup" />
        <Route path="/users/login" />
      </Routes>
    </div>
  );
}

export default App;
