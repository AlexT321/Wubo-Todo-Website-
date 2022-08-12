/* eslint-disable react/jsx-pascal-case */
import { useNavigate } from "react-router-dom";
import Menu_Boards from "./Menu_Boards";
import { useContext, useState, useRef } from "react";
import { Board_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";

const Side_Menu = ({
  Side_Menu_Visibility,
  Set_Side_Menu_Visibility,
  create_board,
  set_move_content_to_right,
  update_all_choosen_state,
  update_choosen_state,
  load_board_data,
}) => {
  const Board = useContext(Board_Context);
  const navigate = useNavigate();

  const [add_board_visibility, set_add_board_visibility] = useState("hidden");
  
  const add_board_button_ref = useRef(null);
  const add_board_ref = useRef(null);

  
  //close menu button
  const close_menu = () => {
    Set_Side_Menu_Visibility("hidden");
    set_add_board_visibility("hidden");
    set_move_content_to_right("0vh");
  }

  //Home Button
  const go_to_home_page = () => {
    navigate("/");
  }

  //Add Board Button
  const add_board = () => {
    set_add_board_visibility("visible");
    setTimeout(() => {
      add_board_ref.current.focus();
    }, 100);
  };

  //Menu Boards
  const handleClickOutside = (e) => {
    if (
      add_board_ref.current &&
      !add_board_ref.current.contains(e.target) &&
      !add_board_button_ref.current.contains(e.target)
    ) {
      set_add_board_visibility("hidden");
    }
  };

  document.addEventListener("click", handleClickOutside);

  const added_board = (e) => {
    if (e.key === "Enter") {
      create_board({ name: e.target.value, choosen: false, favorite: false, board_lists:[], date: new Date()});
      Board.multiple_board_info.push({
        name: e.target.value,
        choosen: false,
      });
      load_board_data();
      add_board_ref.current.value = "";
      set_add_board_visibility("hidden");
    }
  };

  Board.multiple_board_info.sort((a, b) => {
    if (a.favorite && !b.favorite) {
      return -1;
    } else if (!a.favorite && b.favorite) {
      return 1;
    } else {
      return 0;
    }
  });

  if (
    Board.multiple_board_info.length === 0 ||
    Board.single_board_info.length === 0
  ) {
    return <div id="menu-overlay">Loading...</div>;
  }

  return (
    <div id="menu-overlay" style={{ visibility: Side_Menu_Visibility }}>
      <div id="menu-header">
        <div id="menu-board-name">{Board.single_board_info[0].name}</div>
        <button className={"btn btn--primary--solid btn--tiny"} id="close-menu-button" onClick={close_menu}>-</button>
      </div>
      <div id="home-button" onClick={go_to_home_page}>Home</div>
      <div id="menu-header2">
        <div id="your-boards">Your Boards</div>
        <button className={"btn btn--primary--solid btn--tiny"} id="add-board-button" onClick={add_board} ref={add_board_button_ref}>+</button>
      </div>
      <div id="boards-container">
        {Board.multiple_board_info.map((board, index) => (
          <Menu_Boards
            key={index}
            index={index}
            board_id={board._id}
            board_name={board.name}
            update_all_choosen_state={update_all_choosen_state}
            update_choosen_state={update_choosen_state}
            load_board_data={load_board_data}
          />
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
