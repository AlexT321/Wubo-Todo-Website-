/* eslint-disable react/jsx-pascal-case */
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useRef } from "react";
import { User_Context } from "../../App";

import { useAuth } from "../../context/AuthContext";

const Board_Header = ({ load_board_data, set_profile_overlay_vis, profile_vis, profile_ref }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const User = useContext(User_Context);

  const profile_button_ref = useRef();
  

  const onClick = () => {
    navigate("/");
  };

  const show_profile_overlay = () => {
    if (profile_vis === "hidden") {
      set_profile_overlay_vis("visible");
    } else {
      set_profile_overlay_vis("hidden");
    }
  }

  const handleClickOutside = (e) => {
    if (profile_button_ref.current && !profile_button_ref.current.contains(e.target) && !profile_ref.current.contains(e.target)) {
      set_profile_overlay_vis("hidden");
    }
  };
  document.addEventListener("click", handleClickOutside);

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
        <div id="profile-pic-2" onClick={show_profile_overlay} ref={profile_button_ref}></div>
      </div>
    </div>
  );
};

export default Board_Header;
