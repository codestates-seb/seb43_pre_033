import styles from "./Header.module.css";
import { HiOutlineSearch } from "react-icons/hi";
import { BsFillInboxFill } from "react-icons/bs";
import { AiTwotoneTrophy, AiFillQuestionCircle } from "react-icons/ai";
import { FaStackExchange } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useIsLoginStore } from "../../stores/loginStore";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = ({ onSearch, search }) => {
  const { isLogin } = useIsLoginStore(state => state);
  const dummyImg =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <RxHamburgerMenu className={styles.menuIcon} />
        <div className={styles.logoWrap}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="logo" className={styles.logoImg}></img>
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
        <form className={styles.searchBar}>
          <HiOutlineSearch className={styles.searchIco} />
          <input
            {...search}
            className={styles.search}
            placeholder="Search..."
            onKeyDown={e => onSearch(e)}
          />
        </form>
        {isLogin ? (
          <div className={styles.loginBox}>
            <button className={styles.profile}>
              <img className={styles.img} src={dummyImg} alt="dummy img" />
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
            <button className={styles.icon}>
              <FaStackExchange />
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
  );
};

export default Header;
