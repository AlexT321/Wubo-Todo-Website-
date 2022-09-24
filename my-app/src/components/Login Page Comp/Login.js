import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRef, useState, useContext } from "react";
import { User_Context } from "../../App";

const Login = () => {
  const navigate = useNavigate();
  const User = useContext(User_Context);

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      const result = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      User.set_user_id(result.user.uid);

      navigate("/home");
    } catch (error) {
      console.log(error);
      setError("Failed to Login");
    }
  }

  const go_to_sign_up_page = () => {
    navigate("/sign-up");
  };

  const go_to_forgot_password_page = () => {
    navigate("/forgot-password");
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

      <h1 id="login-title">Login</h1>
      {error && <div id="fail-to-login">{error}</div>}
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
      <button className="login-buttons" id="login-button" disabled={loading}>
        login
      </button>
      <div
        className="login-texts"
        id="forgot-password-container"
        onClick={go_to_forgot_password_page}
      >
        Forgot Password?
      </div>
      <div
        className="login-texts"
        id="create-account-container"
        onClick={go_to_sign_up_page}
      >
        Create your account
      </div>
    </form>
  );
};

export default Login;
