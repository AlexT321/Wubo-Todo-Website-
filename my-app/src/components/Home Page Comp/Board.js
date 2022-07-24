import { useNavigate } from "react-router-dom";

const Board = ({ name, unique_id, update_all_choosen_state, update_choosen_state, load_board_data}) => {
  const navigate = useNavigate();
  const onClick = async () => {
    navigate(`/${name}`);
    const update_info = {
      id: {_id: unique_id},
      choosen: {$set: {choosen: true}}
    }
    const update_all_info = {
      id: {},
      choosen: {$set: {choosen: false}}
    }
    await update_all_choosen_state(update_all_info);
    await update_choosen_state(update_info);
    await load_board_data();

  };
  return (
    <div id="create-board-container">
      <button className="board-button" onClick={onClick}>
        {name}
      </button>
    </div>
  );
};

export default Board;
