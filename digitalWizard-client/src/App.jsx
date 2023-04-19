import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Signup from "./pages/Signup/Signup.jsx";
// import QuestionDetail from "./pages/QuestionDetail/QuestionDetail.jsx";
import AskQuestion from "./pages/AskQuestion/AskQuestion.jsx";
import QuestionSection from "./components/QuestionSection/QuestionSection.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/question" element={<QuestionSection />} />
        <Route path="/question/ask" element={<AskQuestion />} />
        <Route path="/question/:questionId" />
        <Route path="/question/:questionId/questionEdit" />
        <Route path="/question/:questionId/answerEdit/:answerId" />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/login" />
      </Routes>
    </div>
  );
}

export default App;
