import { useNavigate } from "react-router-dom";
import { User_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";
import {useContext} from "react";
import BoardService from "../../services/boardService";

const Board = ({
  name,
  unique_id,
  load_board_data,
  set_boards
}) => {
  const User = useContext(User_Context);

  const navigate = useNavigate();

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
    await BoardService.update_all_choosen_state(update_all_info);
    await BoardService.update_choosen_state(update_info);
    await load_board_data();
  };
  
  const delete_board = () => {
    const boards_info = {
      id: { user_id: User.user_id},
      board: { $pull: {boards: {board_id: unique_id}} },
    }
    if (unique_id !== undefined) {
      BoardService.remove_board(boards_info);
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
