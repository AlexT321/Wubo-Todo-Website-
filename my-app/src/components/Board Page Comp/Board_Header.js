/* eslint-disable react/jsx-pascal-case */
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useRef, useState } from "react";
import { User_Context } from "../../App";

import { useAuth } from "../../context/AuthContext";

const Board_Header = ({
  set_profile_overlay_vis,
  profile_vis,
  profile_ref,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const User = useContext(User_Context);

  const profile_button_ref = useRef();

  const [profile_img, set_profile_img] = useState("");

  const onClick = () => {
    navigate("/home");
  };

  const show_profile_overlay = () => {
    if (profile_vis === "hidden") {
      set_profile_overlay_vis("visible");
    } else {
      set_profile_overlay_vis("hidden");
    }
  };

  const handleClickOutside = (e) => {
    if (
      profile_button_ref.current &&
      !profile_button_ref.current.contains(e.target) &&
      !profile_ref.current.contains(e.target)
    ) {
      set_profile_overlay_vis("hidden");
    }
  };
  document.addEventListener("click", handleClickOutside);

  useEffect(() => {
    User.set_user_id(currentUser.uid);
    User.load_board_data();
    set_profile_img(currentUser.email.charAt(0).toUpperCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User.user_id]);

  return (
    <div id="Board-header">
      <div id="logo-container-2">
        <div id="logo-2" onClick={onClick}>
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
        <div id="logo-name-2" onClick={onClick}>
          Wubo
        </div>
      </div>
      <div id="profile-container-2">
        <div
          id="profile-pic-2"
          onClick={show_profile_overlay}
          ref={profile_button_ref}
        >
          {profile_img}
        </div>
      </div>
    </div>
  );
};

export default Board_Header;
