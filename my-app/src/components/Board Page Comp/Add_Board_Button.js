import {useContext, forwardRef } from "react";
import {Board_Id_Context} from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";


const Add_Board_Button = forwardRef(({ set_add_board_visibility, add_board_ref}, ref) => {
  const board_id = useContext(Board_Id_Context);

  const onClick = () => {
    set_add_board_visibility("visible");
    setTimeout(() => {
      add_board_ref.current.focus();
    }, 100);
  };


  return (
    <button id="add-board-button" onClick={onClick} ref={ref}>+</button>
  )
});

export default Add_Board_Button