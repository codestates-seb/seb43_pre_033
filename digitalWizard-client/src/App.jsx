import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import QuestionDetail from "./pages/QuestionDetail/QuestionDetail.jsx";
import AskQuestion from "./pages/AskQuestion/AskQuestion.jsx";
import QuestionSection from "./pages/QuestionSection/QuestionSection.jsx";
import Login from "./pages/Login/Login.jsx";
import AskQuestionEdit from "./pages/AskQuestionEdit/AskQuestionEdit.jsx";
import SidebarL from "./components/Sidebar/SidebarL/SidebarL.jsx";

function App() {
  const path = /^\/users.*$|^\/question\/ask$/;
  const showSidebar = !path.test(useLocation().pathname);

  return (
    <div className="App">
      <Header />
      <div className={`${showSidebar && "container"}`}>
        {showSidebar && <SidebarL />}
        <Routes>
          <Route path="/" />
          <Route path="/question" element={<QuestionSection />} />
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
    </div>
  );
}

export default App;
