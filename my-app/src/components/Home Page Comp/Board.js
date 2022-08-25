import { useNavigate } from "react-router-dom";
import { User_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";
import {useContext} from "react";

const Board = ({
  name,
  unique_id,
  update_all_choosen_state,
  update_choosen_state,
  load_board_data,
  set_boards
}) => {
  const User = useContext(User_Context);

  const navigate = useNavigate();

  const remove_board = async (body) => {
    try {
      const result = await fetch(
        "http://localhost:5000/Health-Website/remove_board",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      // eslint-disable-next-line no-unused-vars
      const data = result.json();
    } catch (err) {
      console.log(err);
    }
  };


  const onClick = async () => {
    navigate(`/user/${name}`);
    const update_info = {
      id: { user_id: User.user_id, "boards.board_id": unique_id },
      choosen: { $set: { "boards.$.choosen": true } },
    };
    const update_all_info = {
      id: {user_id: User.user_id},
      choosen: { $set: { "boards.$[].choosen": false } },
    };
    await update_all_choosen_state(update_all_info);
    await update_choosen_state(update_info);
    await load_board_data();
  };
  
  const delete_board = () => {
    console.log(unique_id);
    const boards_info = {
      id: { user_id: User.user_id},
      board: { $pull: {boards: {board_id: unique_id}} },
    }
    if (unique_id !== undefined) {
      remove_board(boards_info);
    }
    User.set_multiple_board_info(User.multiple_board_info.filter((board,index) => board.board_id !== unique_id));
    set_boards(User.multiple_board_info.filter((board,index) => board.board_id !== unique_id));
  }
  return (
    <div id="create-board-container">
      <button className="board-button" onClick={onClick}>
        {name}
      </button>
      <button id="delete-main-board-button" onClick={delete_board}>X</button>
    </div>
  );
};

export default Board;
