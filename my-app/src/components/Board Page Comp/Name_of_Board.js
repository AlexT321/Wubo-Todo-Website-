import {useContext, useEffect} from "react";
import {Board_Id_Context} from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";


const Name_of_Board = ({Board_Name_Info}) => {
  const board_id = useContext(Board_Id_Context);
  const data = Board_Name_Info(board_id);

  
  return (
    <div id="name-of-board">{data.name}</div>
  )
}

export default Name_of_Board