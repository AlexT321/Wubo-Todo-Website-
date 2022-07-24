/* eslint-disable react/jsx-pascal-case */
import { useContext, useRef, useEffect, useState } from "react";
import { Board_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";

const Board_Header_2 = ({
  Set_Side_Menu_Visibility,
  move_content_to_right,
  set_move_content_to_right,
}) => {
  const Board = useContext(Board_Context);

  //Name of board
  const ref = useRef(null);
  const board_name = useRef(null);

  //favorite button
  const [is_active, set_is_active] = useState("rgba(255, 255, 255, 1)");

  //side menu button
  const open_side_menu = () => {
    Set_Side_Menu_Visibility("visible");
    set_move_content_to_right("28vh");
  };

  //Name of board
  const update_name = async (name) => {
    try {
      const result = await fetch(
        "http://localhost:5000/Health-Website/update_board_name",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(name),
        }
      );
      // eslint-disable-next-line no-unused-vars
      const data = result.json();
    } catch (err) {
      console.log(err);
    }
  };
  const change_board_name = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (board_name.current.innerText !== Board.single_board_info[0].name) {
        const update_name_of_board = {
          id: { _id: Board.single_board_info[0]._id },
          name: { $set: { name: board_name.current.innerText } },
        };
        update_name(update_name_of_board);
        for (let i = 0; i < Board.multiple_board_info.length; i++) {
          if (
            Board.single_board_info[0]._id ===
            Board.multiple_board_info[i]._id
          ) {
            Board.multiple_board_info[i].name = board_name.current.innerText;
          }
        }
        Board.set_single_board_info([
          {
            ...Board.single_board_info[0],
            name: board_name.current.innerText,
          },
        ]);
        board_name.current.blur();
      }
    }
  };

  //favorite button
  const update_favorite = async (board_info) => {
    try {
      const result = await fetch(
        "http://localhost:5000/Health-Website/update_favorite_state",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(board_info),
        }
      );
      // eslint-disable-next-line no-unused-vars
      const data = result.json();
    } catch (err) {
      console.log(err);
    }
  };
  const onClick = () => {
    if (is_active === "rgba(255, 255, 255, 1)") {
      update_favorite({
        id: { _id: Board.single_board_info[0]._id },
        favorite: { $set: { favorite: true } },
      });
    } else {
      update_favorite({
        id: { _id: Board.single_board_info[0]._id },
        favorite: { $set: { favorite: false } },
      });
    }
    set_is_active(
      is_active === "rgba(255, 196, 0, 1)"
        ? "rgba(255, 255, 255, 1)"
        : "rgba(255, 196, 0, 1)"
    );
    for (let i = 0; i < Board.multiple_board_info.length; i++) {
      if (
        Board.single_board_info[0]._id ===
        Board.multiple_board_info[i]._id
      ) {
        Board.multiple_board_info[i].favorite = Board.multiple_board_info[
          i
        ].favorite
          ? false
          : true;
      }
    }
    Board.set_single_board_info([
      {
        ...Board.single_board_info[0],
        favorite: !Board.single_board_info[0].favorite,
      },
    ]);
    Board.multiple_board_info.sort((a, b) => {
      if (a.favorite && !b.favorite) {
        return -1;
      } else if (!a.favorite && b.favorite) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  useEffect(() => {
    //name of board
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        if (Board.single_board_info.length > 0) {
          if (
            board_name.current.innerText !== Board.single_board_info[0].name
          ) {
            board_name.current.innerText = Board.single_board_info[0].name;
          }
        }
      }
    };
    document.addEventListener("click", handleClickOutside);

    //favorite button
    if (Board.single_board_info.length > 0) {
      if (Board.single_board_info[0].favorite) {
        set_is_active("rgba(255, 196, 0, 1)");
      } else {
        set_is_active("rgba(255, 255, 255, 1)");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Board]);
  if (
    Board.multiple_board_info.length === 0 ||
    Board.single_board_info.length === 0
  ) {
    return <div id="name-of-board">Loading...</div>;
  }

  return (
    <div id="header-2" style={{ left: move_content_to_right }}>
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
          {Board.single_board_info[0].name}
        </span>
      </div>
      <button
        className={"btn btn--secondary--solid btn--small"}
        id="favorite-button"
        onClick={onClick}
        style={{ color: is_active }}
      >
        F
      </button>
    </div>
  );
};

export default Board_Header_2;
