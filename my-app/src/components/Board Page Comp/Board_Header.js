/* eslint-disable react/jsx-pascal-case */
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { User_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";

import { useAuth } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/context/AuthContext";

const Board_Header = ({ load_board_data }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const User = useContext(User_Context);

  const onClick = () => {
    navigate("/");
  };
  useEffect(() => {
    User.set_user_id(currentUser.uid);
    load_board_data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User.user_id]);
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
