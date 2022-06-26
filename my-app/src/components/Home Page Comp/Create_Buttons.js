import { useState } from "react";
import Board from "./Board";

const Create_Board_Button = () => {
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

  const [board_name, setBoard_name] = useState('')

  const create_boards = () => {
    setBoards([...boards, { name: board_name }]);
  };

  return (
    <>
      {boards.map((board, index) => {
        return <Board name={board.name} key={index} />;
      })}
      <div id="create-board-container">
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
          <input className="create-board" type="text" placeholder="Name" value={board_name} onChange={(e) => setBoard_name(e.target.value)} />
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
