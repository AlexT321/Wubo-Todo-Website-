/* eslint-disable react/jsx-pascal-case */
import Website_logo from "./logo";
import Logo_Name from "./logo_name";
import Profile_Pic from "./profile_pic";

const Header = ({logo_name}) => {
  return (
    <div id="header">
      <div id="logo-container">
        <Website_logo />
        <Logo_Name logo_clicked={logo_name} />
      </div>
      <div id="profile-container">
        <Profile_Pic />
      </div>
    </div>
  );
};

export default Header;
