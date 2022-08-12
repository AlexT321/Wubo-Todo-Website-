import { useState, useEffect, useRef, useContext } from "react";
import Boards from "./Board";
import { Board_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";

const Create_Board_Button = ({
  create_board,
  update_all_choosen_state,
  update_choosen_state,
  load_board_data,
}) => {
  const Board = useContext(Board_Context);

  const ref = useRef(null);

  const [visibilityState_cb_btn, setVisibilityState] = useState("visible");
  const [visibilityState_cb_input, setVisibilityState_input] =
    useState("hidden");

  const onClick = () => {
    setVisibilityState(
      visibilityState_cb_btn === "visible" ? "hidden" : "visible"
    );
    setVisibilityState_input(
      visibilityState_cb_input === "hidden" ? "visible" : "hidden"
    );
  };

  const [board_name, setBoard_name] = useState("");

  const create_boards = () => {
    setVisibilityState_input("hidden");
    setVisibilityState("visible");

    create_board({
      name: board_name,
      choosen: false,
      favorite: false,
      board_lists: [],
      date: new Date(),
    });
    setBoard_name("");
    Board.set_multiple_board_info([
      ...Board.multiple_board_info,
      {
        name: board_name,
        choosen: false,
        favorite: false,
        board_lists: [],
        date: new Date(),
      },
    ]);
    load_board_data();
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

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setVisibilityState("visible");
      setVisibilityState_input("hidden");
    }
  };
  document.addEventListener("click", handleClickOutside);

  useEffect(() => {
    load_board_data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    Board.multiple_board_info.length === 0
  ) {
    return <div id="menu-overlay">Loading...</div>;
  }

  return (
    <>
      {Board.multiple_board_info.map((board, index) => {
        return (
          <Boards
            name={board.name}
            key={index}
            unique_id={board._id}
            update_all_choosen_state={update_all_choosen_state}
            update_choosen_state={update_choosen_state}
            load_board_data={load_board_data}
          />
        );
      })}
      <div ref={ref} id="create-board-container">
        <button
          id="create-board"
          onClick={onClick}
          style={{ visibility: visibilityState_cb_btn }}
        >
          + create board
        </button>
        <div
          id="create-board-overlay"
          style={{ visibility: visibilityState_cb_input }}
        >
          <input
            className="create-board"
            type="text"
            placeholder="Name"
            value={board_name}
            onChange={(e) => setBoard_name(e.target.value)}
          />
          <button id="create-board-button" onClick={create_boards}>
            Create
          </button>
        </div>
      </div>
    </>
  );
};

Create_Board_Button.defaultProps = {
  visibilityState: "visible",
};

export default Create_Board_Button;
