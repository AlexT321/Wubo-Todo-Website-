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
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            x="0"
            y="0"
            version="1.1"
            viewBox="0 0 100 100"
          >
            <path
              d="M82.59 21.76v10.51l-65.19.17V21.76c0-2.32 1.72-4.2 3.85-4.2h57.49c2.13 0 3.85 1.88 3.85 4.2z"
              fill="#232c5f"
              stroke="#0f1d39"
              strokeMiterlimit="10"
            />
            <path
              d="M82.59 32.27v45.96c0 2.32-1.72 4.2-3.85 4.2H21.25c-2.12 0-3.85-1.88-3.85-4.2V32.44l65.19-.17z"
              fill="#304a9b"
              stroke="#23386d"
              strokeMiterlimit="10"
            />
            <path
              d="M35.07 73.66h-5.29a3.63 3.63 0 0 1-3.63-3.63V40.4a3.63 3.63 0 0 1 3.63-3.63h5.29a3.63 3.63 0 0 1 3.63 3.63v29.63c0 2-1.62 3.63-3.63 3.63zm17.95-17.85h-5.29a3.63 3.63 0 0 1-3.63-3.63V40.4a3.63 3.63 0 0 1 3.63-3.63h5.29a3.63 3.63 0 0 1 3.63 3.63v11.78a3.617 3.617 0 0 1-3.63 3.63zm18.01 10.36h-5.29a3.63 3.63 0 0 1-3.63-3.63V40.4a3.63 3.63 0 0 1 3.63-3.63h5.29a3.63 3.63 0 0 1 3.63 3.63v22.14c.01 2-1.62 3.63-3.63 3.63z"
              fill="#6f9fd5"
              stroke="#4c71b7"
              strokeMiterlimit="10"
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
