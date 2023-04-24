import { Link, useLocation } from "react-router-dom";
import styles from "./SidebarL.module.css";
import { ImEarth } from "react-icons/im";
import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

function SidebarL() {
  const [tap, setTap] = useState(0);
  const [hide, setHide] = useState(false); // url에 따른 메뉴 숨김
  const location = useLocation();
  const path = location.pathname;
  const [modal, setModal] = useState(false); // 메뉴 열고닫기

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

  return (
    <>
      <RxHamburgerMenu
        className={hide ? styles.menuIcon : styles.menuIconBlock}
        onClick={() => setModal(!modal)}
      />
      <div
        className={
          hide
            ? modal
              ? styles.sidebarHide
              : styles.sidebarHideNone
            : modal
            ? styles.sidebar
            : styles.sidebarNone
        }>
        <ul className={styles.ul}>
          <li
            className={tap === 0 ? styles.select : styles.link}
            onClick={() => {
              setTap(0);
              setModal(!modal);
            }}
            role="none">
            <Link to="/">Home</Link>
          </li>
          <li>PUBLIC</li>
          <li
            className={tap === 1 ? styles.select : styles.link}
            onClick={() => {
              setTap(1);
              setModal(!modal);
            }}
            role="none">
            <Link to="/question" className={styles.iconLink}>
              <ImEarth className={styles.icon} />
              Questions
            </Link>
          </li>
          <li
            className={tap === 2 ? styles.select : styles.link}
            onClick={() => setTap(2)}
            role="none">
            <Link>Tags</Link>
          </li>
          <li
            className={tap === 3 ? styles.select : styles.link}
            onClick={() => setTap(3)}
            role="none">
            <Link>Users</Link>
          </li>
          <li
            className={tap === 4 ? styles.select : styles.link}
            onClick={() => setTap(4)}
            role="none">
            <Link>Companies</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SidebarL;
