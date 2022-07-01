/* eslint-disable react/jsx-pascal-case */
import Menu_Board_Name from "./Menu_Board_Name";
import Close_Menu_Button from "./Close_Menu_Button";
import Home_Button from "./Home_Button";
import Add_Board_Button from "./Add_Board_Button";
import Menu_Boards from "./Menu_Boards";

const Side_Menu = () => {
  return (
    <div id="menu-overlay">
      <div id="menu-header">
        <Menu_Board_Name />
        <Close_Menu_Button />
      </div>
      <Home_Button />
      <div id="menu-header2">
        <div id="your-boards">Your Boards</div>
        <Add_Board_Button />
      </div>
      <div id="boards-container">
        <Menu_Boards />
      </div>
    </div>
  );
};

export default Side_Menu;
