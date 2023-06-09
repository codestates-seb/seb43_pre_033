import Button from "../../common/Button.jsx";
import AboutSignup from "./AboutSignup.jsx";
import styles from "./Signup.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [recaptchaState, setRecaptchaState] = useState({ isVerified: false });

  const recaptchaOnChange = value => {
    console.log("Captcha value: ", value);
    setRecaptchaState({ isVerified: true });
  };

  // 유효성 검사 함수
  const isValidPassword = str => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return regex.test(str);
  };

  const isValidEmail = str => {
    const regex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    return regex.test(str);
  };

  const register = () => {
    if (!username || !email || !password) {
      setErrorMessage("아이디와 비밀번호를 입력하세요");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage("Email 형식에 맞게 입력해주세요");
      return;
    }
    if (!isValidPassword(password)) {
      setErrorMessage(
        "최소 8글자, 문자 1개, 숫자 1개가 들어간 비밀번호를 입력해주세요"
      );
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/members`,
        {
          memberNickName: username,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then(response => {
        console.log(response);
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        localStorage.setItem("token", response.data.jwt);
        navigate("/");
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  };

  const onStop = e => {
    e.preventDefault();
    register();
  };

  // * oauth - google
  const handleRequestSignupGoogle = () => {
    return window.location
      .assign
      // 'https://dev.qushe8r.shop/oauth2/authorization/google'
      ();
  };

  return (
    <div className={styles.signupAuth}>
      <AboutSignup />
      <div className={styles.signupContainer}>
        <div>
          <div className={styles.loginGoolglebtn}>
            <Button
              text="Sign up with Google"
              addStyle={{
                borderColor: "var(--black-750)",
                backgroundColor: "var(--white)",
                color: "var(--black)",
                padding: "10.4px",
                width: "100%",
              }}
              handleClick={handleRequestSignupGoogle}>
              <svg
                aria-hidden="true"
                className={styles.nativeSvgIconGoogle}
                width="18"
                height="18"
                viewBox="0 0 18 18">
                <path
                  fill="#4285F4"
                  d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"></path>
                <path
                  fill="#34A853"
                  d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"></path>
                <path
                  fill="#FBBC05"
                  d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z"></path>
                <path
                  fill="#EA4335"
                  d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"></path>
              </svg>
            </Button>
          </div>
          <div className={styles.signupGiHubbtn}>
            <Button
              text="Sign up with GitHub"
              addStyle={{
                borderColor: "var(--black)",
                backgroundColor: "var(--black)",
                color: "var(--white)",
                padding: "10.4px",
                width: "100%",
              }}>
              <svg
                aria-hidden="true"
                className={styles.svgIconGitHub}
                width="18"
                height="18"
                viewBox="0 0 18 18">
                <path
                  fill="#fff"
                  d="M9 1a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 9 1Z"></path>
              </svg>
            </Button>
          </div>
          <div className={styles.signupFacebookbtn}>
            <Button
              text="Sign up with Facebook"
              addStyle={{
                borderColor: "var(--black-750)",
                backgroundColor: "var(--blue-900)",
                color: "var(--white)",
                padding: "10.4px",
                width: "100%",
              }}>
              <svg
                aria-hidden="true"
                className={styles.svgIconFacebook}
                width="18"
                height="18"
                viewBox="0 0 18 18">
                <path
                  fill="#fff"
                  d="M3 1a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3Zm6.55 16v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h-2.5Z"></path>
              </svg>
            </Button>
          </div>
        </div>
        <div className={styles.signuptextFrom}>
          <div className={styles.fromContainer}>
            <div className={styles.signupBar}>
              <form onSubmit={onStop}>
                <label htmlFor="name" className={styles.label}>
                  Display name
                </label>
                <input
                  type="text"
                  id="name"
                  name="memberNickName"
                  // maxLength={16}
                  onChange={e => setUsername(e.target.value)}
                />

                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <p className={styles.textMessageOne}>
                  Passwords must contain at least eight characters, including at
                  least 1 letter and 1 number.
                </p>
                <div className={styles.recap}>
                  <ReCAPTCHA
                    className={styles.recaptcha}
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={() => recaptchaOnChange()}
                  />
                  {errorMessage ? (
                    <p className={styles.errormessage}>{errorMessage}</p>
                  ) : null}
                </div>

                <div className={styles.up}>
                  <div className={styles.checkbox}>
                    <input
                      style={{ width: "12px" }}
                      type="checkbox"
                      className={styles.checkBoxIcon}
                    />
                    <p className={styles.textMessageTwo}>
                      Opt-in to receive occasional product updates, user
                      research invitations, company announcements, and digests.
                    </p>
                    <svg
                      aria-hidden="true"
                      className={styles.svgIcon}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14">
                      <path d="M7 1C3.74 1 1 3.77 1 7c0 3.26 2.77 6 6 6 3.27 0 6-2.73 6-6s-2.73-6-6-6Zm1.06 9.06c-.02.63-.48 1.02-1.1 1-.57-.02-1.03-.43-1.01-1.06.02-.63.5-1.04 1.08-1.02.6.02 1.05.45 1.03 1.08Zm.73-3.07-.47.3c-.2.15-.36.36-.44.6a3.6 3.6 0 0 0-.08.65c0 .04-.03.14-.16.14h-1.4c-.14 0-.16-.09-.16-.13-.01-.5.11-.99.36-1.42A4.6 4.6 0 0 1 7.7 6.07c.15-.1.21-.21.3-.33.18-.2.28-.47.28-.74.01-.67-.53-1.14-1.18-1.14-.9 0-1.18.7-1.18 1.46H4.2c0-1.17.31-1.92.98-2.36a3.5 3.5 0 0 1 1.83-.44c.88 0 1.58.16 2.2.62.58.42.88 1.02.88 1.82 0 .5-.17.9-.43 1.24-.15.2-.44.47-.86.79h-.01Z"></path>
                    </svg>
                  </div>
                </div>
                <div className={styles.signupbtn}>
                  <Button
                    onClick={() => register()}
                    text="Sign up"
                    addStyle={{
                      width: "320px",
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className={styles.under}>
            <div>
              By clicking “Sign up”, you agree to our terms of service, privacy
              policy and cookie policy
            </div>
          </div>
        </div>
        <div className={styles.underContainer}>
          <div className={styles.underLogin}>
            Already have an account?
            <Link to={"/users/login"} className={styles.contentLogin}>
              Login up
            </Link>
          </div>
          <div className={styles.underSignup}>
            Are you an employer?
            <Link to={"/users/signup"} className={styles.contentSignup}>
              Sign up on Talent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
