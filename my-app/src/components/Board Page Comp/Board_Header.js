/* eslint-disable react/jsx-pascal-case */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Board_Header = ({ load_board_data }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  useEffect(() => {
    load_board_data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="Board-header">
      <div id="logo-container-2">
        <div id="logo-2" onClick={onClick}></div>
        <div id="logo-name-2" onClick={onClick}>
          Wubo
        </div>
      </div>
      <div id="profile-container-2">
        <div id="profile-pic-2"></div>
      </div>
    </div>
  );
};

export default Board_Header;
