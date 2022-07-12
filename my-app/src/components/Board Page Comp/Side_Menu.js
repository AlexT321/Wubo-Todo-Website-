/* eslint-disable react/jsx-pascal-case */
import Close_Menu_Button from "./Close_Menu_Button";
import Home_Button from "./Home_Button";
import Add_Board_Button from "./Add_Board_Button";
import Menu_Boards from "./Menu_Boards";
import { useContext, useState, useRef } from "react";
import { Board_Id_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";

const Side_Menu = ({
  Side_Menu_Visibility,
  Set_Side_Menu_Visibility,
  create_board,
  set_move_content_to_right,
}) => {
  const board_id = useContext(Board_Id_Context);
  const [add_board_visibility, set_add_board_visibility] = useState("hidden");
  const add_board_ref = useRef(null);
  const add_board_button_ref = useRef(null);

  const handleClickOutside = (e) => {
    if (add_board_ref.current && !add_board_ref.current.contains(e.target) && !add_board_button_ref.current.contains(e.target)) {
      set_add_board_visibility("hidden");
    }
  };

  document.addEventListener("click", handleClickOutside);

  const added_board = (e) => {
    if (e.key === "Enter") {
      create_board({ name: e.target.value, choosen: false });
      board_id.multiple_board_info.push({ name: e.target.value, choosen: false });
      add_board_ref.current.value = "";
      set_add_board_visibility("hidden");
    }
  }
  

  if (
    board_id.multiple_board_info.length === 0 ||
    board_id.single_board_info.length === 0
  ) {
    return <div id="menu-overlay">Loading...</div>;
  }

  return (
    <div id="menu-overlay" style={{ visibility: Side_Menu_Visibility }}>
      <div id="menu-header">
        <div id="menu-board-name">{board_id.single_board_info[0].name}</div>
        <Close_Menu_Button
          Set_Side_Menu_Visibility={Set_Side_Menu_Visibility}
          set_add_board_visibility={set_add_board_visibility}
          set_move_content_to_right={set_move_content_to_right}
        />
      </div>
      <Home_Button />
      <div id="menu-header2">
        <div id="your-boards">Your Boards</div>
        <Add_Board_Button
          ref={add_board_button_ref}
          set_add_board_visibility={set_add_board_visibility}
          add_board_ref={add_board_ref}
        />
      </div>
      <div id="boards-container">
        {board_id.multiple_board_info.map((board, index) => (
          <Menu_Boards key={index} board_name={board.name} />
        ))}
        <input
          id="add-board"
          type="text"
          placeholder="Add Board"
          style={{ visibility: add_board_visibility }}
          ref={add_board_ref}
          onKeyDown={added_board}
        />
      </div>
    </div>
  );
};

export default Side_Menu;
