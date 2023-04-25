import styles from "./Header.module.css";
import { HiOutlineSearch } from "react-icons/hi";
import { BsFillInboxFill } from "react-icons/bs";
import { AiTwotoneTrophy, AiFillQuestionCircle } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import logo2 from "../../images/logo2.png";
import { useIsLoginStore, useLoginInfoStore } from "../../stores/loginStore";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import Dialog from "../Ask/Dialog/Dialog.jsx";
import useModal from "../../hooks/useMdoal";
import { getQuestion } from "../../api/questionApi";

const Header = ({ onSearch, search, modal, setModal, hide, setHide }) => {
  const { isLogin } = useIsLoginStore(state => state);
  const { email } = useLoginInfoStore(state => state).loginInfo;
  // const [user, setUser] = useState();
  const profileImage =
    "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80";

  // useEffect(() => {
  //   getQuestion("members?page=1&size=9999").then(res => {
  //     const data = res.data.filter(el => el.email === email);
  //     setUser(...data);
  //     setProfileImage(user.profileImage);
  //   });
  // }, [isLogin]);
  // user Profile Img

  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    switch (path) {
      case "/users/login":
        setHide(true);
        break;
      case "/users/signup":
        setHide(true);
        break;
      case "/question/ask":
        setHide(true);
        break;
      default:
        setHide(false);
    }
    setModal(false);
  }, [path]);

  const handleSearch = e => onSearch(e);
  const [logout, openModal, closeModal] = useModal(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <RxHamburgerMenu
            className={hide ? styles.menuIcon : styles.menuIconBlock}
            onClick={() => setModal(!modal)}
          />
          <div className={styles.logoWrap}>
            <Link to="/" className={styles.logo}>
              <img src={logo} alt="logo" className={styles.logoImg}></img>
              <img src={logo2} alt="logo2" className={styles.logoImg2}></img>
            </Link>
            <ul className={`${styles.menuList} ${isLogin && styles.login}`}>
              <li className={styles.menu}>
                <Link className={styles.none} to="#">
                  About
                </Link>
              </li>
              <li className={styles.menu}>
                <Link className={styles.link} to="/question">
                  Products
                </Link>
              </li>
              <li className={styles.menu}>
                <Link className={styles.none} to="#">
                  For Teams
                </Link>
              </li>
            </ul>
          </div>
          <form className={styles.searchBar} onSubmit={handleSearch}>
            <HiOutlineSearch className={styles.searchIco} />
            <input
              type="text"
              {...search}
              className={styles.search}
              placeholder="Search..."
            />
            <button type="submit" className={styles.btnSubmit}>
              검색
            </button>
          </form>
          {isLogin ? (
            <div className={styles.loginBox}>
              <button className={styles.profile}>
                <img
                  className={styles.img}
                  src={profileImage}
                  alt="user profile"
                />
              </button>
              <button className={styles.icon}>
                <BsFillInboxFill />
              </button>
              <button className={styles.icon}>
                <AiTwotoneTrophy />
              </button>
              <button className={styles.icon}>
                <AiFillQuestionCircle />
              </button>
              <button className={styles.icon} onClick={() => openModal()}>
                <RiLogoutCircleRLine />
              </button>
            </div>
          ) : (
            <ul className={styles.menubar}>
              <li className={styles.list}>
                <Link className="btnSub" to="/users/login">
                  Log in
                </Link>
              </li>
              <li className={styles.list}>
                <Link className="btnPrimary" to="/users/signup">
                  Sign up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </header>
      {logout && (
        <Dialog
          head="Log out?"
          body="Clicking “Log out” will log you out of the following domains on this device"
          click="Log out"
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Header;
