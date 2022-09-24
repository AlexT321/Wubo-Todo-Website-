import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { User_Context } from "../../App";
import BoardService from "../../services/boardService";
import UserService from "../../services/userService";

const Menu_Boards = ({ board_id, board_name }) => {
  const User = useContext(User_Context);

  const [hover_state, set_hover_state] = useState(false);
  const [delete_button_vis, set_delete_button_vis] = useState("none");

  const navigate = useNavigate();

  const onClick = async () => {
    navigate(`/user/${board_name}`);
    const update_info = {
      id: { user_id: User.user_id, "boards.board_id": board_id },
      choosen: { $set: { "boards.$.choosen": true } },
    };
    const update_all_info = {
      id: { user_id: User.user_id },
      choosen: { $set: { "boards.$[].choosen": false } },
    };
    await BoardService.update_all_choosen_state(update_all_info);
    await BoardService.update_choosen_state(update_info);
    await User.load_board_data();
  };

  const toggleHover = () => {
    set_hover_state(hover_state ? false : true);
    set_delete_button_vis(hover_state ? "none" : "flex");
  };

  const delete_board = () => {
    const increase_remaining_boards = {
      user_id: { user_id: User.user_id },
      boards_remaining: { $inc: { boards_remaining: 1 } },
    };
    UserService.increase_remaining_boards(increase_remaining_boards);
    User.set_single_user_info([
      {
        ...User.single_user_info[0],
        boards_remaining: User.single_user_info[0].boards_remaining + 1,
      },
    ]);
    const boards_info = {
      id: { user_id: User.user_id },
      board: { $pull: { boards: { board_id: board_id } } },
    };
    if (board_id !== undefined) {
      BoardService.remove_board(boards_info);
    }

    User.set_multiple_board_info(
      User.multiple_board_info.filter((board) => board.board_id !== board_id)
    );
  };
  return (
    <div
      id="side-menu-boards-container"
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div id="board-1" onClick={onClick}>
        {board_name}
      </div>
      <button
        id="delete-board-button"
        style={{ display: delete_button_vis }}
        onClick={delete_board}
      >
        x
      </button>
    </div>
  );
};

export default Menu_Boards;
