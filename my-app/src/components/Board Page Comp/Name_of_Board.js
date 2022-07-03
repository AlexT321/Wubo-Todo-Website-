import {useContext} from "react";
import {Board_Id_Context} from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";


const Name_of_Board = () => {
  const board_id = useContext(Board_Id_Context);
  //{board_id.single_board_info[0].name}
  return (
    <div id="name-of-board" >hello</div>
  )
}

export default Name_of_Board;