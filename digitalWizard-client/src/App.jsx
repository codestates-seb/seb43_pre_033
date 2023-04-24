import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import QuestionDetail from "./pages/QuestionDetail/QuestionDetail.jsx";
import AskQuestion from "./pages/AskQuestion/AskQuestion.jsx";
import QuestionSection from "./pages/QuestionSection/QuestionSection.jsx";
import Login from "./pages/Login/Login.jsx";
import AskQuestionEdit from "./pages/AskQuestionEdit/AskQuestionEdit.jsx";
import SearchPage from "./pages/QuestionSection/SearchPage.jsx";
import useInput from "./hooks/useInput.js";

function App() {
  const [search, searchReset] = useInput("");
  const navigate = useNavigate();

  const handleSearch = e => {
    if (e.key === "Enter") {
      navigate(`/question/search?keyworkd=${search.value}`);
      // getQuestion(`/question/search?keyword=${search.value}&page=0&size=10`);
    }
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} search={search} />
      <Routes>
        <Route path="/" />
        <Route path="/question" element={<QuestionSection />} />
        <Route path="/question/search" element={<SearchPage />} />
        <Route path="/question/ask" element={<AskQuestion />} />
        <Route path="/question/:questionId" element={<QuestionDetail />} />
        <Route
          path="/question/:questionId/questionEdit"
          element={<AskQuestionEdit />}
        />
        <Route path="/question/:questionId/answerEdit/:answerId" />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
