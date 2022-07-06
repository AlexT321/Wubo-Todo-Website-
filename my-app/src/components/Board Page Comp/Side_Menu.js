/* eslint-disable react/jsx-pascal-case */
import Close_Menu_Button from "./Close_Menu_Button";
import Home_Button from "./Home_Button";
import Add_Board_Button from "./Add_Board_Button";
import Menu_Boards from "./Menu_Boards";
import {useContext } from "react";
import {Board_Id_Context} from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";

const Side_Menu = ({ Side_Menu_Visibility, Set_Side_Menu_Visibility }) => {
  const board_id = useContext(Board_Id_Context);


  if (board_id.multiple_board_info.length === 0 || board_id.single_board_info.length === 0) {
    return <div id="name-of-board">Loading...</div>;
  }

  return (
    <div id="menu-overlay" style={{ visibility: Side_Menu_Visibility }}>
      <div id="menu-header">
        <div id="menu-board-name">{board_id.single_board_info[0].name}</div>
        <Close_Menu_Button
          Set_Side_Menu_Visibility={Set_Side_Menu_Visibility}
        />
      </div>
      <Home_Button />
      <div id="menu-header2">
        <div id="your-boards">Your Boards</div>
        <Add_Board_Button />
      </div>
      <div id="boards-container">
        {board_id.multiple_board_info.map((board, index) => (
          <Menu_Boards key={index} board_name={board.name}/>
        ))}
      </div>
    </div>
  );
};

export default Side_Menu;
