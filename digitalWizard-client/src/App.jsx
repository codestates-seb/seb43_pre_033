import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
// import QuestionDetail from "./pages/QuestionDetail/QuestionDetail.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/question" />
        <Route path="/question/ask" />
        <Route path="/question/:questionId" />
        <Route path="/question/:questionId/questionEdit" />
        <Route path="/question/:questionId/answerEdit/:answerId" />
        <Route path="/signup" />
        <Route path="/login" />
      </Routes>
    </div>
  );
}

export default App;
