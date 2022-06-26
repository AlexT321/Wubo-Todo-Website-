import { useState } from "react";
import { useEffect } from "react";
import Board from "./Board";

const Create_Board_Button = () => {
  const API = "http://localhost:5000";
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

  const update_info = async (update_Information) => {
    try {
      const result = await fetch(API + "/Health-Website", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(update_Information),
      });
      const data = result.json();
    } catch (err) {
      console.log(err);
    }
  };

  const get_Boards = async () => {
    const result = await fetch(API + "/Health-Website");
    const data = await result.json();
    setBoards([...boards, ...data]);
  };

  const create_boards = () => {
    setBoards([...boards, { name: board_name }]);
    setVisibilityState_input("hidden");
    setVisibilityState("visible");

    update_info({ name: board_name });
    setBoard_name("");
  };

  useEffect(() => {
    get_Boards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
