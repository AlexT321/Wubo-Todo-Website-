import { useNavigate } from "react-router-dom";
import { useContext} from "react";
import { Board_Id_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";


const Menu_Boards = ({board_id, board_name, update_all_choosen_state, update_choosen_state, load_board_data}) => {
  const board_id1 = useContext(Board_Id_Context);
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/${board_name}`);
    const update_info = {
      id: {_id: board_id},
      choosen: {$set: {choosen: true}}
    }
    const update_all_info = {
      id: {},
      choosen: {$set: {choosen: false}}
    }
    update_all_choosen_state(update_all_info);
    update_choosen_state(update_info);
    load_board_data();
  }
  return (
    <div id="board-1" onClick={onClick}>{board_name}</div>
  )
}

export default Menu_Boards