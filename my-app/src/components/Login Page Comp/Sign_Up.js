import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRef, useState } from "react";
import UserService from "../../services/userService";

const Sign_Up = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const comfirmPasswordRef = useRef();

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, set_success] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== comfirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      const result = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      const user = {
        email: emailRef.current.value,
        user_id: result.user.uid,
        boards: [],
        boards_remaining: 6,
        date: new Date(),
      };
      UserService.create_user(user);
      console.log("success");
      set_success("Successfully created an account")
    } catch (error) {
      console.log(error);
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  const go_back = () => {
    navigate("/login");
  };

  return (
    <form id="main-login-container" onSubmit={handleSubmit}>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="https://vecta.io/nano"
        id="logo-login"
      >
        <path
          d="M100 6.5v16.3L0 23V6.5C0 2.9 2.6 0 5.9 0h88.2c3.3 0 5.9 2.9 5.9 6.5z"
          fill="#232c5f"
        />
        <path
          d="M100 22.8v70.8c0 3.6-2.6 6.5-5.9 6.5H5.9c-3.3-.1-5.9-3-5.9-6.6V23l100-.2z"
          fill="#304a9b"
        />
        <path
          d="M29 86.9H17c-2 0-3.6-1.6-3.6-3.6V33.4c0-2 1.6-3.6 3.6-3.6h12c2 0 3.6 1.6 3.6 3.6v49.9c.1 1.9-1.6 3.6-3.6 3.6zm27.6-27.7h-12c-2 0-3.6-1.6-3.6-3.6V33.4c0-2 1.6-3.6 3.6-3.6h12c2 0 3.6 1.6 3.6 3.6v22.2c0 2-1.6 3.6-3.6 3.6zm27.6 16.1h-12c-2 0-3.6-1.6-3.6-3.6V33.4c0-2 1.6-3.6 3.6-3.6h12c2 0 3.6 1.6 3.6 3.6v38.3c0 1.9-1.6 3.6-3.6 3.6z"
          fill="#6f9fd5"
        />
      </svg>

      <h1 id="login-title">Sign up</h1>
      {success && <div id="successfully-made-account">{success}</div>}
      <div className="login-containers" id="email-container">
        <div className="login-input-titles" id="email-title">
          Email:
        </div>
        <input
          className="login-inputs"
          id="email-input"
          type="text"
          ref={emailRef}
        />
      </div>
      <div className="login-containers" id="password-container">
        <div className="login-input-titles" id="password-title">
          Password:
        </div>
        <input
          className="login-inputs"
          id="password-input"
          type="password"
          ref={passwordRef}
        />
      </div>
      {error && <div id="password-does-not-match">Password Does Not Match</div>}
      <div className="login-containers" id="confirm-password-container">
        <div className="login-input-titles" id="confirm-password-title">
          Confirm Password:
        </div>
        <input
          className="login-inputs"
          id="confirm-password-input"
          type="password"
          ref={comfirmPasswordRef}
        />
      </div>
      {error && <div id="password-does-not-match">Password Does Not Match</div>}
      <button
        className="login-buttons"
        id="sign-up-button"
        type="submit"
        disabled={loading}
      >
        Sign up
      </button>
      <div className="login-texts" id="sign-up-go-back" onClick={go_back}>
        Already have an account
      </div>
    </form>
  );
};

export default Sign_Up;
