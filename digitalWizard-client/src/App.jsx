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
import SidebarL from "./components/Sidebar/SidebarL/SidebarL.jsx";
import { useState } from "react";
import styles from "./App.module.css";
import Home from "./pages/Home/Home.jsx";

function App() {
  const [search, searchReset] = useInput("");
  const navigate = useNavigate();

  const handleSearch = e => {
    if (e.key === "Enter") {
      navigate(`/question/search?keyworkd=${search.value}`);
      // getQuestion(`/question/search?keyword=${search.value}&page=0&size=10`);
    }
  };

  const [modal, setModal] = useState(false); // 메뉴 열고닫기
  const [hide, setHide] = useState(false); // url에 따른 메뉴 숨김

  return (
    <div className="App">
      <Header
        onSearch={handleSearch}
        search={search}
        modal={modal}
        setModal={setModal}
        hide={hide}
        setHide={setHide}
      />
      <div className={styles.flex}>
        <nav
          className={
            hide
              ? modal
                ? styles.sidebarHide
                : styles.sidebarHideNone
              : modal
              ? styles.sidebar
              : styles.sidebarNone
          }>
          <SidebarL modal={modal} setModal={setModal} />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
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
    </div>
  );
}

export default App;
