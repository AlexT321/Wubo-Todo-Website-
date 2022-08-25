import { useNavigate } from "react-router-dom";
import { useAuth } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/context/AuthContext";
import { useRef, useState } from "react";

const Sign_Up = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const comfirmPasswordRef = useRef();

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user_id, set_user_id] = useState("");


  const createUser = async (body) => {
    const result = await fetch(
      "http://localhost:5000/Health-Website/create_user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    // eslint-disable-next-line no-unused-vars
    const data = result.json();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== comfirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      const result = await signup(emailRef.current.value, passwordRef.current.value);
      const user = {
        email: emailRef.current.value,
        user_id: result.user.uid,
        boards: [],
        date: new Date(),
      };
      console.log("success");
      createUser(user);
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
      <h1 id="login-title">Sign up</h1>
      {error && <div id="password-does-not-match">{error}</div>}
      <div id="email-container">
        <div id="email-title">Email:</div>
        <input id="email-input" type="text" ref={emailRef} />
      </div>
      <div id="password-container">
        <div id="password-title">Password:</div>
        <input id="password-input" type="password" ref={passwordRef} />
      </div>
      <div id="confirm-password-container">
        <div id="confirm-password-title">Confirm Password:</div>
        <input
          id="confirm-password-input"
          type="password"
          ref={comfirmPasswordRef}
        />
      </div>
      <button id="sign-up-button" type="submit" disabled={loading}>
        Sign up
      </button>
      <div id="sign-up-go-back" onClick={go_back}>
        Already have an account
      </div>
    </form>
  );
};

export default Sign_Up;
