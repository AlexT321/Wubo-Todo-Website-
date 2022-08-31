import { useAuth } from "../../context/AuthContext";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const ProfileOverlay = ({profile_vis, profile_ref}) => {
  const {currentUser, logout} = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const log_out = async() => {
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div id="profile-overlay" style={{visibility: profile_vis}} ref={profile_ref}>
      <div id="profile-header">
        <div id="profile-picture"></div>
        <div id="profile-name">{currentUser.email}</div>
      </div>
      <div id="log-out" onClick={log_out}>Log out</div>
    </div>
  );
};

export default ProfileOverlay;
