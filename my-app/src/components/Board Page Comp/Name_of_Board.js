import {useContext, useEffect} from "react";
import {Board_Id_Context} from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";


const Name_of_Board = () => {
  const board_id = useContext(Board_Id_Context);
  console.log(board_id)
  //{board_id.single_board_info[0].name}
  useEffect(() => {
   
  }, []);
  if (board_id.multiple_board_info.length === 0 || board_id.single_board_info.length === 0) {
    return <div id="name-of-board">Loading...</div>;
  }

  return (
    <div id="name-of-board">{board_id.single_board_info[0].name}</div>
  )
}

export default Name_of_Board;