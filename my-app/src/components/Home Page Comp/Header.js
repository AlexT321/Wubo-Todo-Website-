import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User_Context } from "../../App";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [profile_vis, set_profile_vis] = useState("hidden");
  const [error, setError] = useState("");

  const profile_button_ref = useRef();
  const profile_overlay_ref = useRef();

  const [profile_img, set_profile_img] = useState("");

  const User = useContext(User_Context);

  const go_to_main_page = () => {
    navigate("/");
  };

  const show_profile_overlay = () => {
    if (profile_vis === "hidden") {
      set_profile_vis("visible");
    } else {
      set_profile_vis("hidden");
    }
  };

  const handleClickOutside = (e) => {
    if (
      profile_overlay_ref.current &&
      !profile_overlay_ref.current.contains(e.target) &&
      !profile_button_ref.current.contains(e.target)
    ) {
      set_profile_vis("hidden");
    }
  };
  document.addEventListener("click", handleClickOutside);

  const log_out = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  useEffect(() => {
    set_profile_img(currentUser.email.charAt(0).toUpperCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="header">
      <div id="logo-container">
        <div id="logo" onClick={go_to_main_page}>
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
        <div id="name" onClick={go_to_main_page}>
          Wubo
        </div>
      </div>
      <div id="profile-container">
        <div
          id="profile-pic"
          onClick={show_profile_overlay}
          ref={profile_button_ref}
        >
          {profile_img}
        </div>
        <div
          id="home-profile-overlay"
          style={{ visibility: profile_vis }}
          ref={profile_overlay_ref}
        >
          <div id="profile-header">
            <div id="profile-picture"></div>
            <div id="profile-name">{currentUser.email}</div>
          </div>
          <div id="log-out" onClick={log_out}>
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
