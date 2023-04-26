import styles from "./Preview.module.css";
import parse from "html-react-parser";

function Preview({ body }) {
  return <div className={styles.preview}>{parse(body)}</div>;
}

export default Preview;
