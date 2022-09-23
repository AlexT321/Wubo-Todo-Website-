import { useNavigate } from "react-router-dom";

const Main_Header = () => {
  const navigate = useNavigate();
  const go_to_boards_button = () => {
    navigate("/home");
  }
  return (
    <div id="header">
      <div id="logo-container">
        <div id="logo">
        <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="https://vecta.io/nano"
            id="logo-home"
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

        </div>
        <div id="name">Wubo</div>
      </div>
      <button id="go_home" onClick={go_to_boards_button}>Go to your boards -{">"}</button>
    </div>
  );
};

export default Main_Header;
