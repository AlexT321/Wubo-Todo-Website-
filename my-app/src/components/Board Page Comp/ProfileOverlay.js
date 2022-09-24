import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileOverlay = ({
  profile_vis,
  set_profile_overlay_vis,
  profile_ref,
  profile_animation,
  set_profile_animation,
  profile_content_vis,
}) => {
  const { currentUser, logout } = useAuth();

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const profile_end_animation = () => {
    set_profile_animation("none");
    set_profile_overlay_vis(profile_vis === "hidden" ? "visible" : "hidden");
  };

  const log_out = async () => {
    console.log(error);
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <div
      id="profile-overlay"
      style={{ visibility: profile_vis, animation: profile_animation }}
      onAnimationEnd={profile_end_animation}
      ref={profile_ref}
    >
      <div id="inner-profile-content" style={{visibility: profile_content_vis}}>
        <div id="profile-header">
          <div id="profile-picture"></div>
          <div id="profile-name">{currentUser.email}</div>
        </div>
        <div id="log-out" onClick={log_out}>
          Log out
        </div>
      </div>
    </div>
  );
};

export default ProfileOverlay;
