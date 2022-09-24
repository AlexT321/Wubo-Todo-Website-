/* eslint-disable react/jsx-pascal-case */
import { useNavigate } from "react-router-dom";
import Menu_Boards from "./Menu_Boards";
import { useContext, useState, useRef } from "react";
import { User_Context } from "../../App";
import BoardService from "../../services/boardService";
import UserService from "../../services/userService";

const Side_Menu = ({
  Side_Menu_Visibility,
  side_menu_animation,
  set_side_menu_animation,
  set_content_body_animation,
}) => {
  const User = useContext(User_Context);
  const navigate = useNavigate();

  const [add_board_visibility, set_add_board_visibility] = useState("hidden");
  
  const add_board_button_ref = useRef(null);
  const add_board_ref = useRef(null);

  
  //close menu button
  const close_menu = () => {
    set_side_menu_animation("close-side-menu 0.4s linear")
    set_add_board_visibility("hidden");
    
    set_content_body_animation("move-content-left 0.4s linear");
  }

  const menu_animation = () => {;
    set_side_menu_animation("none");
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
    if (e.key === "Enter" && User.single_user_info[0].boards_remaining > 0) {
      const reduce_remaining_boards = {
        user_id: {user_id: User.user_id},
        boards_remaining: {$inc: {boards_remaining: -1}}
      }
      UserService.reduce_remaining_boards(reduce_remaining_boards);
      User.set_single_user_info([
        {
          ...User.single_user_info[0],
          boards_remaining: User.single_user_info[0].boards_remaining - 1,
        },
      ]);
      const random_number = Math.floor(Math.random() * 100)
      const board_info = {
        id: { user_id: User.user_id },
        board_info: {
          $push: {
            boards: {
              board_id: "B" + random_number,
              name: e.target.value,
              board_background_img: `img${User.multiple_board_info.length + 1}`,
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
        board_background_img: `img${User.multiple_board_info.length + 1}`,
        choosen: false,
        favorite: false,
        board_lists: [],
        date: new Date(),
      });
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
    <div id="menu-overlay" style={{ visibility: Side_Menu_Visibility, animation: side_menu_animation }} onAnimationEnd={menu_animation}>
      <div id="menu-header">
        <div id="menu-board-name">{User.single_board_info[0].name}</div>
        <button className={"btn btn--primary--solid btn--tiny"} id="close-menu-button" onClick={close_menu} >-</button>
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
