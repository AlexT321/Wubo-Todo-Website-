import { useNavigate } from "react-router-dom";
import { useAuth } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/context/AuthContext";
import { useRef, useState, useContext } from "react";
import { User_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";

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
      <div id="email-container">
        <div id="email-title">Email:</div>
        <input id="email-input" type="text" ref={emailRef} />
      </div>
      <div id="password-container">
        <div id="password-title">Password:</div>
        <input id="password-input" type="password" ref={passwordRef} />
      </div>
      <button id="login-button" disabled={loading}>
        login
      </button>
      <div id="forgot-password-container" onClick={go_to_forgot_password_page}>
        Forgot Password?
      </div>
      <div id="create-account-container" onClick={go_to_sign_up_page}>
        Create your account
      </div>
    </form>
  );
};

export default Login;
