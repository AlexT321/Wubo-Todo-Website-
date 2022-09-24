/* eslint-disable react/jsx-pascal-case */
import { useContext, useRef, useEffect, useState } from "react";
import { User_Context } from "../../App";
import BoardService from "../../services/boardService";

const Board_Header_2 = ({
  side_Menu_Visibility,
  move_content_to_right,
  set_side_menu_animation,
  content_body_animation,
  set_content_body_animation,
}) => {
  const User = useContext(User_Context);

  //Name of board
  const ref = useRef(null);
  const board_name = useRef(null);

  //favorite button
  const [is_active, set_is_active] = useState("rgba(255, 255, 255, 1)");
  const [run_once, set_run_once] = useState(true);

  //side menu button
  const open_side_menu = () => {
    if (side_Menu_Visibility === "hidden") {
      set_side_menu_animation("open-side-menu 0.4s linear");
      set_content_body_animation("move-content-right 0.4s linear");
    }
  };

  //Name of board
  const change_board_name = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (board_name.current.innerText !== User.single_board_info[0].name) {
        const update_name_of_board = {
          id: {
            user_id: User.user_id,
            "boards.board_id": User.single_board_info[0].board_id,
          },
          name: { $set: { "boards.$.name": board_name.current.innerText } },
        };
        BoardService.update_board_name(update_name_of_board);
        for (let i = 0; i < User.multiple_board_info.length; i++) {
          if (
            User.single_board_info[0].board_id ===
            User.multiple_board_info[i].board_id
          ) {
            User.multiple_board_info[i].name = board_name.current.innerText;
          }
        }
        User.set_single_board_info([
          {
            ...User.single_board_info[0],
            name: board_name.current.innerText,
          },
        ]);
        board_name.current.blur();
      }
    }
  };

  //favorite button
  const onClick = () => {
    set_run_once(false);
    if (is_active === "rgba(255, 255, 255, 1)") {
      const update_info = {
        id: {
          user_id: User.user_id,
          "boards.board_id": User.single_board_info[0].board_id,
        },
        favorite: { $set: { "boards.$.favorite": true } },
      };
      BoardService.update_favorite_state(update_info);
    } else {
      const update_info = {
        id: {
          user_id: User.user_id,
          "boards.board_id": User.single_board_info[0].board_id,
        },
        favorite: { $set: { "boards.$.favorite": false } },
      };
      BoardService.update_favorite_state(update_info);
    }
    set_is_active(
      is_active === "rgba(255, 196, 0, 1)"
        ? "rgba(255, 255, 255, 1)"
        : "rgba(255, 196, 0, 1)"
    );
    for (let i = 0; i < User.multiple_board_info.length; i++) {
      if (
        User.single_board_info[0].board_id ===
        User.multiple_board_info[i].board_id
      ) {
        User.multiple_board_info[i].favorite = User.multiple_board_info[i]
          .favorite
          ? false
          : true;
      }
    }
    User.set_single_board_info([
      {
        ...User.single_board_info[0],
        favorite: !User.single_board_info[0].favorite,
      },
    ]);
    User.multiple_board_info.sort((a, b) => {
      if (a.favorite && !b.favorite) {
        return -1;
      } else if (!a.favorite && b.favorite) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  //name of board
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      if (User.single_board_info.length > 0) {
        if (board_name.current.innerText !== User.single_board_info[0].name) {
          board_name.current.innerText = User.single_board_info[0].name;
        }
      }
    }
  };
  document.addEventListener("click", handleClickOutside);

  useEffect(() => {
    //favorite button
    if (User.single_board_info.length > 0 && run_once === true) {
      if (User.single_board_info[0].favorite) {
        set_is_active("rgba(255, 196, 0, 1)");
      } else {
        set_is_active("rgba(255, 255, 255, 1)");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User.single_board_info]);
  if (
    User.multiple_board_info.length === 0 ||
    User.single_board_info.length === 0
  ) {
    return <div id="name-of-board">Loading...</div>;
  }

  return (
    <div id="header-2" style={{ left: move_content_to_right, animation: content_body_animation }}>
      <button
        className={"btn btn--secondary--solid btn--small"}
        id="side-menu-button"
        onClick={open_side_menu}
      >
        -
      </button>
      <div id="name-of-board" ref={ref}>
        <span
          ref={board_name}
          id="span-of-name-of-board"
          contentEditable="true"
          suppressContentEditableWarning={true}
          onKeyDown={change_board_name}
          spellCheck={false}
        >
          {User.single_board_info[0].name}
        </span>
      </div>
      <button
        className={"btn btn--secondary--solid btn--small"}
        id="favorite-button"
        onClick={onClick}
        style={{ stroke: is_active, fill: is_active}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 73.357 73.357"
          xmlnsXlink="https://vecta.io/nano"
          id="favorite-logo"
        >
          <path d="M73.013 27.836c-.882-2.73-3.306-4.631-6.172-4.84l-17.188-1.28-6.47-15.898c-1.067-2.631-3.605-4.331-6.467-4.331-2.875 0-5.368 1.635-6.532 4.327l-6.473 15.901-17.256 1.286c-2.88.281-5.287 2.228-6.132 4.96S.32 33.529 2.505 35.36l13.11 11.113-4.068 16.676a6.89 6.89 0 0 0 1.227 5.98c1.331 1.717 3.407 2.741 5.553 2.741 1.309 0 2.603-.379 3.723-1.083l14.632-9.035 14.632 9.035c1.11.686 2.372 1.048 3.649 1.048 2.126 0 4.197-1.009 5.541-2.698 1.328-1.67 1.813-3.826 1.322-5.953l-4.077-16.71 13.1-11.103a6.99 6.99 0 0 0 2.164-7.535zm-6.031 2.948l-15.94 13.51 4.947 20.275c.026.116.108.47-.181.832-.324.408-.876.568-1.343.28L36.682 54.7 18.877 65.695c-.188.119-.368.176-.549.176a1.06 1.06 0 0 1-.813-.419c-.184-.237-.235-.503-.147-.846l4.956-20.312L6.371 30.773c-.419-.351-.404-.758-.317-1.038.079-.256.313-.696.915-.756l20.897-1.556 7.85-19.286c.244-.565.731-.649 1-.649.306 0 .71.102.909.589l7.874 19.347L66.4 28.981c.573.042.808.404.903.7.079.244.145.712-.321 1.103z" />
        </svg>
      </button>
    </div>
  );
};

export default Board_Header_2;
