import styles from "./Member.module.css";
import PropTypes from "prop-types";
import { GoMarkGithub } from "react-icons/go";

// devRole, name, github을 props로 받아와서 출력하는 Member 컴포넌트를 선언합니다.
export default function Member({ devRole, name, github }) {
  // devRole, name, github props의 타입을 검사합니다.
  Member.propTypes = {
    devRole: PropTypes.string, // devRole props는 문자열(string) 타입입니다.
    name: PropTypes.string, // name props는 문자열(string) 타입입니다.
    github: PropTypes.string, // github props는 문자열(string) 타입입니다.
  };
  return (
    <div className={styles.imageGithub}>
      <div className={styles.imgGit}>
        <GoMarkGithub width="40" height="40" />
      </div>
      <div className={styles.roleContainer}>
        <a
          className={styles.github}
          href={github}
          target="_blank"
          rel="noreferrer">
          {name}
        </a>
        <div className={styles.devRole}>{devRole}</div>
      </div>
    </div>
  );
}
