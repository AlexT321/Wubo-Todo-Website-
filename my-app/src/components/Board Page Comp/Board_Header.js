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
