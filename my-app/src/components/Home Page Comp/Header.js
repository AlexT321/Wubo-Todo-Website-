import {useAuth} from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/context/AuthContext";
import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const {currentUser, logout} = useAuth();
  const [profile_vis, set_profile_vis] = useState("hidden");
  const [error, setError] = useState("");

  const profile_button_ref = useRef();
  const profile_overlay_ref = useRef();

  const show_profile_overlay = () => {
    if (profile_vis === "hidden") {
      set_profile_vis("visible");
    } else {
      set_profile_vis("hidden");
    }
  }

  const handleClickOutside = (e) => {
    if (profile_overlay_ref.current && !profile_overlay_ref.current.contains(e.target) && !profile_button_ref.current.contains(e.target)) {
      set_profile_vis("hidden");
    }
    
  };
  document.addEventListener("click", handleClickOutside);

  const log_out = async() => {
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <div id="header">
      <div id="logo-container">
        <div id="logo"></div>
        <div id="name">Wubo</div>
      </div>
      <div id="profile-container">
        <div id="profile-pic" onClick={show_profile_overlay} ref={profile_button_ref}></div>
        <div id="home-profile-overlay" style={{visibility: profile_vis}} ref={profile_overlay_ref}>
          <div id="profile-header">
            <div id="profile-picture"></div>
            <div id="profile-name">{currentUser.email}</div>
          </div>
          <div id="log-out" onClick={log_out}>Log out</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
