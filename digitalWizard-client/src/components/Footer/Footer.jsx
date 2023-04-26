// github 링크

import Member from "./Member.jsx";
import styles from "./Footer.module.css";

function Banner() {
  return (
    <div className={styles.bannerContainer}>
      <a
        className={styles.gitAddress}
        href="https://github.com/codestates-seb/seb43_pre_033"
        target="_blank"
        rel="noreferrer">
        <span className={styles.titleOne}>Team GitHub</span>
        <span className={styles.titleTwo}>
          Codestates Front-End & Back-End Bootcamp 43th
        </span>
        <div className={styles.textCenter}>
          <span className={styles.textOne}>Pre-Project</span>
          <span className={styles.textTwo}>seb43_pre_033</span>

          <span className={styles.textThree}>디지털마법사</span>
        </div>
      </a>
    </div>
  );
}

export default function Footer() {
  const teamMember = [
    {
      devRole: "Front-End",
      name: "유채원",
      github: "https://github.com/ychae1997",
    },
    {
      devRole: "Front-End",
      name: "원영은",
      github: "https://github.com/lulu242",
    },
    {
      devRole: "Front-End",
      name: "이혜나",
      github: "https://github.com/hazellee0914",
    },
    {
      devRole: "Front-End",
      name: "차재현",
      github: "https://github.com/CHA710617",
    },
    {
      devRole: "Back-End",
      name: "위원종",
      github: "https://github.com/wish9",
    },
    {
      devRole: "Back-End",
      name: "김석현",
      github: "https://github.com/Gonue",
    },
    {
      devRole: "Back-End",
      name: "조현민",
      github: "https://github.com/jhm6650",
    },
  ];
  return (
    <footer className={styles.footer}>
      <Banner />
      {/* <div className={styles.bannerTag}>
        https://github.com/codestates-seb/seb43_pre_033
      </div> */}
      <div className={styles.textCenter}>
        {teamMember.map((member, index) => {
          return (
            <Member
              key={index}
              devRole={member.devRole}
              name={member.name}
              github={member.github}
            />
          );
        })}
      </div>
    </footer>
  );
}
