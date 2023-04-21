import styles from "./SidebarR.module.css";
import { HiPencil } from "react-icons/hi";
import { RxChatBubble } from "react-icons/rx";
import logo from "../../../images/miniLogo.svg";

function SidebarR() {
  return (
    <div className={styles.sidebarR}>
      <div className={styles.shadow}>
        <p className={styles.memoTitle}>The Overflow Blog</p>
        <div className={styles.memo}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <HiPencil className={styles.pencil} />
              <a href="https://stackoverflow.blog/2023/04/18/we-bought-a-university-how-one-coding-school-doubled-down-on-brick-and-mortar-ep-555/?cb=1&_ga=2.110511942.2104940181.1681287052-1437141097.1675821070">
                We bought a university: how one coding school doubled down on
                brick and...
              </a>
            </li>
            <li className={styles.li}>
              <HiPencil className={styles.pencil} />
              <a href="https://stackoverflow.blog/2023/04/19/ops-teams-are-pets-not-cattle/?cb=1&_ga=2.151859066.2104940181.1681287052-1437141097.1675821070">
                Ops teams are pets, not cattle (Ep. 562){" "}
                <em className={styles.em}>sponsored post</em>
              </a>
            </li>
          </ul>
        </div>
        <p className={styles.memoTitle}>Featured on Meta</p>
        <div className={styles.memo}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <RxChatBubble className={styles.chat} />
              <a href="https://meta.stackexchange.com/questions/388030/improving-the-copy-in-the-close-modal-and-post-notices-2023-edition?cb=1">
                Improving the copy in the close modal and post notices - 2023
                edition
              </a>
            </li>
            <li className={styles.li}>
              <RxChatBubble className={styles.chat} />
              <a href="https://meta.stackexchange.com/questions/388401/new-blog-post-from-our-ceo-prashanth-community-is-the-future-of-ai?cb=1">
                New blog post from our CEO Prashanth: Community is the future of
                AI
              </a>
            </li>
            <li className={styles.li}>
              <img src={logo} alt="logo" className={styles.logoImg}></img>
              <a href="https://meta.stackoverflow.com/questions/421831/temporary-policy-chatgpt-is-banned?cb=1">
                Temporary policy: ChatGPT is banned
              </a>
            </li>
            <li className={styles.li}>
              <img src={logo} alt="logo" className={styles.logoImg}></img>
              <a href="https://meta.stackoverflow.com/questions/296710/the-protection-tag-is-being-burninated?cb=1">
                The [protection] tag is being burninated
              </a>
            </li>
            <li className={styles.li}>
              <img src={logo} alt="logo" className={styles.logoImg}></img>
              <a href="https://meta.stackoverflow.com/questions/423798/content-discovery-initiative-april-13-update-related-questions-using-a-machine?cb=1">
                Content Discovery initiative April 13 update: Related questions
                using a...
              </a>
            </li>
            <li className={styles.li}>
              <img src={logo} alt="logo" className={styles.logoImg}></img>
              <a href="https://meta.stackoverflow.com/questions/424290/review-our-technical-responses-for-the-2023-developer-survey?cb=1">
                Review our technical responses for the 2023 Developer Survey
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarR;
