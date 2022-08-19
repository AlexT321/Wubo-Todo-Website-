import { useNavigate } from "react-router-dom";
import {useAuth} from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/context/AuthContext";
import {useRef, useState} from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const {resetPassword} = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      console.log(error);
      setError("Failed to Login");
    }
    setLoading(false);
    
  }

  const go_to_sign_up_page = () => {
    navigate("/sign-up");
  };

  const go_to_login_page = () => {
    navigate("/login");
  }

  return (
    <form id="main-login-container" onSubmit={handleSubmit}>
    <h1 id="login-title">Password Reset</h1>
    {error && <div id="fail-to-login">{error}</div>}
    {message && <div id="fail-to-login">{message}</div>}
    <div id="email-container">
      <div id="email-title">Email:</div>
      <input id="email-input" type="text" ref={emailRef} />
    </div>
    <button id="reset-password-button" disabled={loading}>Reset Password</button>
    <div id="return-to-login-container" onClick={go_to_login_page}>Login</div>
    <div id="create-account-container" onClick={go_to_sign_up_page}>
      Create your account
    </div>
  </form>
  )
}

export default ForgotPassword