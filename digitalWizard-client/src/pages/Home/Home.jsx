import styles from "./Home.module.css";
import HomePage from "../../images/Home.png";

function Home() {
  return (
    <>
      <img className={styles.img} src={HomePage} alt="HomePage" />
    </>
  );
}

export default Home;
