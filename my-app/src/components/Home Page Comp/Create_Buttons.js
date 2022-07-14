import { useState, useEffect, useRef } from "react";
import Board from "./Board";

const Create_Board_Button = ({
  create_board,
  Get_Boards,
  update_all_choosen_state,
  update_choosen_state,
  load_board_data,
}) => {
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

  const [boards, setBoards] = useState([]);

  const [board_name, setBoard_name] = useState("");

  const create_boards = () => {
    setBoards([...boards, { name: board_name }]);
    setVisibilityState_input("hidden");
    setVisibilityState("visible");

    create_board({ name: board_name, choosen: false, favorite: false });
    setBoard_name("");
    console.log(boards);
  };

  boards.sort((a, b) => {
    if (a.favorite && !b.favorite) {
      return -1;
    } else if (!a.favorite && b.favorite) {
      return 1;
    } else {
      return 0;
    }
  });

  useEffect(() => {
    setBoards([...boards]);

    if (boards.length === 0) {
      Get_Boards(boards, setBoards);
    }

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setVisibilityState("visible");
        setVisibilityState_input("hidden");
      }
    };

    document.addEventListener("click", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {boards.map((board, index) => {
        return (
          <Board
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
