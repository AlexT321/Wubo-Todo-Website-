import { useNavigate } from "react-router-dom";
import { User_Context } from "../../App";
import {useContext} from "react";
import BoardService from "../../services/boardService";
import UserService from "../../services/userService";

const Board = ({
  name,
  unique_id,
  img
}) => {
  const User = useContext(User_Context);

  const navigate = useNavigate();

  const background_img = require(`../../assets/board_background_images/${img}.webp`)
  

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
    await User.load_board_data();
  };
  
  const delete_board = () => {
    const increase_remaining_boards =  {
      user_id: {user_id: User.user_id},
      boards_remaining: {$inc: {boards_remaining: 1} },
    }
    UserService.increase_remaining_boards(increase_remaining_boards);
    User.set_single_user_info([
      {
        ...User.single_user_info[0],
        boards_remaining: User.single_user_info[0].boards_remaining + 1,
      }
    ]);
    
    const boards_info = {
      id: { user_id: User.user_id},
      board: { $pull: {boards: {board_id: unique_id}} },
    }
    if (unique_id !== undefined) {
      BoardService.remove_board(boards_info);
    }
    User.set_multiple_board_info(User.multiple_board_info.filter((board) => board.board_id !== unique_id));
    User.set_boards(User.multiple_board_info.filter((board) => board.board_id !== unique_id));
  }
  return (
    <div id="create-board-container">
      <button className="content-buttons" id="board-button" loading="lazy" onClick={onClick} style={{ backgroundImage: `url(${background_img})`}}>
        {name}
      </button>
      <button className="content-buttons" id="delete-main-board-button" onClick={delete_board}>X</button>
    </div>
  );
};

export default Board;
