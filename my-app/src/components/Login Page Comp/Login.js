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

      const result = await login(emailRef.current.value, passwordRef.current.value);
      User.set_user_id(result.user.uid);
      
      navigate("/");
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
      <h1 id="login-title">Login</h1>
      {error && <div id="fail-to-login">{error}</div>}
      <div className="login-containers" id="email-container">
        <div className="login-input-titles" id="email-title">Email:</div>
        <input className="login-inputs" id="email-input" type="text" ref={emailRef} />
      </div>
      <div className="login-containers" id="password-container">
        <div className="login-input-titles" id="password-title">Password:</div>
        <input className="login-inputs" id="password-input" type="password" ref={passwordRef} />
      </div>
      <button className="login-buttons" id="login-button" disabled={loading}>
        login
      </button>
      <div className="login-texts" id="forgot-password-container" onClick={go_to_forgot_password_page}>
        Forgot Password?
      </div>
      <div className="login-texts" id="create-account-container" onClick={go_to_sign_up_page}>
        Create your account
      </div>
    </form>
  );
};

export default Login;
