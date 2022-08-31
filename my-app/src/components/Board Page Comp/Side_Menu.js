/* eslint-disable react/jsx-pascal-case */
import { useNavigate } from "react-router-dom";
import Menu_Boards from "./Menu_Boards";
import { useContext, useState, useRef } from "react";
import { User_Context } from "../../App";
import BoardService from "../../services/boardService";

const Side_Menu = ({
  Side_Menu_Visibility,
  Set_Side_Menu_Visibility,
  set_move_content_to_right,
  load_board_data,
}) => {
  const User = useContext(User_Context);
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
      const random_number = Math.floor(Math.random() * 100)
      const board_info = {
        id: { user_id: User.user_id },
        board_info: {
          $push: {
            boards: {
              board_id: "B" + random_number,
              name: e.target.value,
              choosen: false,
              favorite: false,
              board_lists: [],
              date: new Date(),
            },
          },
        },
      };
      BoardService.create_board(board_info);
      User.multiple_board_info.push({
        board_id: "B" + random_number,
        name: e.target.value,
        choosen: false,
        favorite: false,
        board_lists: [],
        date: new Date(),
      });
      load_board_data();
      add_board_ref.current.value = "";
      set_add_board_visibility("hidden");
    }
  };

  User.multiple_board_info.sort((a, b) => {
    if (a.favorite && !b.favorite) {
      return -1;
    } else if (!a.favorite && b.favorite) {
      return 1;
    } else {
      return 0;
    }
  });

  if (
    User.multiple_board_info.length === 0 ||
    User.single_board_info.length === 0
  ) {
    return <div id="menu-overlay">Loading...</div>;
  }

  return (
    <div id="menu-overlay" style={{ visibility: Side_Menu_Visibility }}>
      <div id="menu-header">
        <div id="menu-board-name">{User.single_board_info[0].name}</div>
        <button className={"btn btn--primary--solid btn--tiny"} id="close-menu-button" onClick={close_menu}>-</button>
      </div>
      <div id="home-button" onClick={go_to_home_page}>Home</div>
      <div id="menu-header2">
        <div id="your-boards">Your Boards</div>
        <button className={"btn btn--primary--solid btn--tiny"} id="add-board-button" onClick={add_board} ref={add_board_button_ref}>+</button>
      </div>
      <div id="boards-container">
        {User.multiple_board_info.map((board, index) => (
          <Menu_Boards
            key={index}
            board_id={board.board_id}
            board_name={board.name}
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
