import { useContext, useState, useEffect } from "react";
import { Board_Id_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";

const Name_of_Board = () => {
  const board_id = useContext(Board_Id_Context);
  const [Name_of_Board, set_Board_Name] = useState("");

  useEffect(() => {
    if (board_id.single_board_info.length > 0) {
      set_Board_Name(board_id.single_board_info[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board_id]);

  if (
    board_id.multiple_board_info.length === 0 ||
    board_id.single_board_info.length === 0
  ) {
    return <div id="name-of-board">Loading...</div>;
  }

  return (
    <>
      <div id="name-of-board"><span contenteditable>{board_id.single_board_info[0].name}</span></div>
      <input
        type="text"
        id="name-of-board2"
        name="board_name"
        placeholder={board_id.single_board_info[0].name}
        value={Name_of_Board}
        onChange={(e) => {
          set_Board_Name(e.target.value);
        }}
      />
    </>
  );
};

export default Name_of_Board;
