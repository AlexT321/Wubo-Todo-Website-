import { useNavigate } from "react-router-dom";

const Menu_Boards = ({board_id, board_name, update_all_choosen_state, update_choosen_state, load_board_data}) => {
 
  const navigate = useNavigate();
  const onClick = async () => {
    console.log(board_id);
    navigate(`/${board_name}`);
    const update_info = {
      id: {_id: board_id},
      choosen: {$set: {choosen: true}}
    }
    const update_all_info = {
      id: {},
      choosen: {$set: {choosen: false}}
    }
    await update_all_choosen_state(update_all_info);
    await update_choosen_state(update_info);
    await load_board_data();
  }
  return (
    <div id="board-1" onClick={onClick}>{board_name}</div>
  )
}

export default Menu_Boards